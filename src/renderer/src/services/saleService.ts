import {
	collection,
	doc,
	runTransaction,
	serverTimestamp,
	query,
	orderBy,
	getDocs,
	getDoc,
	Timestamp,
	DocumentSnapshot,
	DocumentData,
	DocumentReference,
	where,
	limit
} from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { CartItem, VoucherType, CartPaymentMethod } from "@renderer/store/cartStore"
import { Sale } from "@renderer/types"
import { ReceiptService } from "./receiptService"
import { Receipt } from "shared/types/receipt.type"
import { ReceiptSunatService } from "./sunatService"

const COLLECTION = "sales"

export interface CreateSaleDTO {
	cashierId: string
	cashierName: string
	tillId: string
	items: CartItem[]
	paymentMethod: CartPaymentMethod
	voucherType: VoucherType
	clientId: string | null
	totalPrice: number
	receivedAmount: number
	change: number
	cashAmount: number
	cardAmount: number
	walletAmount: number
	creditAmount: number
}

export interface SalesFilters {
	dateFrom?: Date
	dateTo?: Date
	cashierId?: string
	status?: string
}

export const SaleService = {
	async create(data: CreateSaleDTO): Promise<string> {
		const saleId = await runTransaction(db!, async (transaction) => {
			const tillRef = doc(db!, "tills", data.tillId)
			const saleRef = doc(collection(db!, "sales"))
			const cashSnap = await transaction.get(tillRef)
			const itemsRef: Record<
				string,
				{
					lotRef: DocumentReference<DocumentData, DocumentData>
					lotSnap: DocumentSnapshot<DocumentData, DocumentData>
				}
			> = {}

			for (const i of data.items) {
				const lotRef = doc(db!, "lots", i.lotId)
				const lotSnap = await transaction.get(lotRef)
				itemsRef[i.lotId] = { lotRef, lotSnap }
			}

			console.log(`Actualizando caja para till ${data.tillId}...`, tillRef)

			//1. Verificar y descontar stock por cada item (FEFO ya ordenado)
			for (const item of data.items) {
				// const lotRef = doc(db!, "lots", item.lotId)
				const lotSnap = itemsRef[item.lotId].lotSnap
				const lotRef = itemsRef[item.lotId].lotRef
				if (!lotSnap.exists()) throw new Error(`Lote ${item.lotId} no encontrado`)
				const currentStock = lotSnap.data().stock as number
				if (currentStock < item.quantity) {
					throw new Error(`Stock insuficiente para ${item.productName}`)
				}
				console.log(
					`Descontando ${item.quantity} unidades del lote ${item.lotId} (Stock actual: ${currentStock})`
				)
				const newStock = currentStock - item.quantity
				transaction.update(lotRef, { stock: newStock })
				//2. Crear movimiento por cada item
				const movementRef = doc(collection(db!, "movements"))
				transaction.set(movementRef, {
					type: "sale",
					productId: item.productId,
					lotId: item.lotId,
					quantity: -item.quantity,
					previousQuantity: currentStock,
					newQuantity: newStock,
					saleId: null,
					referenceId: null,
					originalPrice: item.unitPrice,
					modifiedPrice: item.alterPrice,
					userId: data.cashierId,
					reason: "Venta",
					createdAt: serverTimestamp()
				})
				console.log(
					`Movimiento registrado para lote ${item.lotId}: -${item.quantity} unidades`
				)
			}

			// 3. Crear la venta
			transaction.set(saleRef, {
				cashierId: data.cashierId,
				cashierName: data.cashierName,
				tillId: data.tillId,
				items: data.items.map((item) => ({
					productId: item.productId,
					lotId: item.lotId,
					productName: item.productName,
					quantity: item.quantity,
					unitPrice: item.unitPrice,
					alterPrice: item.alterPrice,
					finalPrice: item.finalPrice,
					subtotal: item.subtotal,
					modification: item.modification
						? {
								...item.modification,
								date: Timestamp.now()
							}
						: null
				})),
				paymentMethod: data.paymentMethod,
				paymentDetails: {
					cashAmount: data.cashAmount,
					cardAmount: data.cardAmount,
					walletAmount: data.walletAmount,
					creditAmount: data.creditAmount
				},
				voucherType: data.voucherType,
				clientId: data.clientId,
				totalPrice: data.totalPrice,
				receivedAmount: data.receivedAmount,
				change: data.change,
				status: data.paymentMethod === "credit" ? "credit" : "completed",
				isSynced: true,
				createdAt: Timestamp.now()
			})

			console.log(`Venta creada con ID: ${saleRef.id}`)

			// 4. Actualizar caja
			console.log(`Datos actuales de la caja para till ${data.tillId}:`, cashSnap.exists())

			if (cashSnap.exists()) {
				const current = cashSnap.data()
				const updates: Record<string, number> = {
					totalSales: (current.totalSales ?? 0) + data.totalPrice
				}
				if (data.paymentMethod === "cash") {
					updates.totalCash = (current.totalCash ?? 0) + data.totalPrice
				} else if (data.paymentMethod === "card") {
					updates.totalCard = (current.totalCard ?? 0) + data.totalPrice
				} else if (data.paymentMethod === "credit") {
					updates.totalCredit = (current.totalCredit ?? 0) + data.totalPrice
				} else if (data.paymentMethod === "wallet") {
					updates.totalFavorBalance = (current.totalFavorBalance ?? 0) + data.totalPrice
				} else if (data.paymentMethod === "mixed") {
					updates.totalCash = (current.totalCash ?? 0) + data.cashAmount
					updates.totalCard = (current.totalCard ?? 0) + data.cardAmount
					updates.totalFavorBalance = (current.totalFavorBalance ?? 0) + data.walletAmount
					updates.totalCredit = (current.totalCredit ?? 0) + data.creditAmount
				}
				transaction.update(tillRef, updates)
			}
			console.log(`Caja actualizada para till ${data.tillId}:`, cashSnap.data())
			return saleRef.id
		})

		return saleId
	},

	async getAll(filters: SalesFilters = {}): Promise<Sale[]> {
		const q = query(collection(db!, COLLECTION), orderBy("createdAt", "desc"))

		const snapshot = await getDocs(q)
		let sales = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Sale)

		// Filtros locales
		if (filters.dateFrom) {
			sales = sales.filter((s) => s.createdAt.toDate() >= filters.dateFrom!)
		}
		if (filters.dateTo) {
			const to = new Date(filters.dateTo)
			to.setHours(23, 59, 59)
			sales = sales.filter((s) => s.createdAt.toDate() <= to)
		}
		if (filters.cashierId) {
			sales = sales.filter((s) => s.cashierId === filters.cashierId)
		}
		if (filters.status) {
			sales = sales.filter((s) => s.status === filters.status)
		}

		return sales
	},

	async getById(id: string): Promise<Sale | null> {
		const snapshot = await getDoc(doc(db!, COLLECTION, id))
		if (!snapshot.exists()) return null
		return { id: snapshot.id, ...snapshot.data() } as Sale
	},

	async cancel(saleId: string, userId: string, reason: string): Promise<void> {
		await runTransaction(db!, async (transaction) => {
			const saleRef = doc(db!, COLLECTION, saleId)
			const saleSnap = await transaction.get(saleRef)

			if (!saleSnap.exists()) throw new Error("Venta no encontrada")

			const sale = { id: saleSnap.id, ...saleSnap.data() } as Sale
			const tillRef = doc(db!, "tills", sale.tillId)
			const tillSnap = await transaction.get(tillRef)
			if (sale.status === "cancelled") throw new Error("La venta ya fue anulada")

			const reversedMovements: string[] = []

			const itemsRef: Record<
				string,
				{
					lotRef: DocumentReference<DocumentData, DocumentData>
					lotSnap: DocumentSnapshot<DocumentData, DocumentData>
				}
			> = {}

			for (const i of sale.items) {
				const lotRef = doc(db!, "lots", i.lotId)
				const lotSnap = await transaction.get(lotRef)
				itemsRef[i.lotId] = { lotRef, lotSnap }
			}

			// Revertir stock por cada item
			for (const item of sale.items) {
				const lotSnap = itemsRef[item.lotId].lotSnap
				const lotRef = itemsRef[item.lotId].lotRef

				if (!lotSnap.exists()) continue

				const currentStock = lotSnap.data().stock as number
				const newStock = currentStock + item.quantity

				transaction.update(lotRef, { stock: newStock })

				// Crear movimiento de reversión
				const movementRef = doc(collection(db!, "movements"))
				transaction.set(movementRef, {
					type: "sale_reversal",
					productId: item.productId,
					lotId: item.lotId,
					quantity: item.quantity,
					previousQuantity: currentStock,
					newQuantity: newStock,
					saleId,
					referenceId: null,
					originalPrice: item.unitPrice,
					modifiedPrice: null,
					userId,
					reason: `Anulación: ${reason}`,
					createdAt: serverTimestamp()
				})

				reversedMovements.push(movementRef.id)
			}

			// Actualizar venta
			transaction.update(saleRef, {
				status: "cancelled",
				cancellation: {
					userId,
					reason,
					date: serverTimestamp(),
					reversedMovements
				}
			})

			// Revertir totales en caja

			if (tillSnap.exists()) {
				const till = tillSnap.data()
				const updates: Record<string, number> = {
					totalSales: Math.max(0, (till.totalSales ?? 0) - sale.totalPrice)
				}
				if (sale.paymentMethod === "cash") {
					updates.totalCash = Math.max(0, (till.totalCash ?? 0) - sale.totalPrice)
				} else if (sale.paymentMethod === "card") {
					updates.totalCard = Math.max(0, (till.totalCard ?? 0) - sale.totalPrice)
				}
				transaction.update(tillRef, updates)
			}
		})

		const receiptRef = query(
			collection(db!, "receipts"),
			where("saleId", "==", saleId),
			limit(1)
		)
		const receiptSnap = await getDocs(receiptRef)

		if (!receiptSnap.empty) {
			const receipt = receiptSnap.docs[0].data() as Receipt
			await ReceiptSunatService.cancel(
				receiptSnap.docs[0].id,
				receipt.voucherType,
				receipt.serialCode
			)
		}
	},

	async initPrinterDrawer(
		data: Receipt | undefined,
		canOpenDrawer: boolean,
		canEmitReceipt: boolean
	): Promise<void> {
		if (data && canEmitReceipt) ReceiptService.print(data)

		if (canOpenDrawer) await ReceiptService.openDrawer()
	}
}
