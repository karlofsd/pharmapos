import {
	collection,
	doc,
	getDocs,
	addDoc,
	updateDoc,
	query,
	where,
	orderBy,
	serverTimestamp,
	Timestamp,
	runTransaction
} from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { Order, OrderItem, OrderStatus } from "@renderer/types"

const COLLECTION = "orders"

export type CreateOrderDTO = {
	supplierId: string
	supplierName: string
	items: OrderItem[]
	notes: string | null
	expectedAt: Date | null
	createdBy: string
}

export type ReceiveOrderDTO = {
	orderId: string
	items: {
		productId: string
		lotNumber: string
		receivedQuantity: number
		expirationDate: Date
		purchasePrice: number
		sellPrice: number
	}[]
	userId: string
}

export const OrderService = {
	async getAll(): Promise<Order[]> {
		const q = query(collection(db!, COLLECTION), orderBy("createdAt", "desc"))
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order)
	},

	async getBySupplier(supplierId: string): Promise<Order[]> {
		const q = query(
			collection(db!, COLLECTION),
			where("supplierId", "==", supplierId),
			orderBy("createdAt", "desc")
		)
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order)
	},

	async create(data: CreateOrderDTO): Promise<Order> {
		const payload = {
			supplierId: data.supplierId,
			supplierName: data.supplierName,
			status: "pending" as OrderStatus,
			items: data.items.map((item) => ({
				...item,
				receivedQuantity: 0,
				lotNumber: null,
				expirationDate: null
			})),
			totalAmount: data.items.reduce(
				(sum, item) => sum + item.orderedQuantity * item.purchasePrice,
				0
			),
			notes: data.notes,
			paymentId: null,
			expectedAt: data.expectedAt ? Timestamp.fromDate(data.expectedAt) : null,
			receivedAt: null,
			createdBy: data.createdBy,
			createdAt: serverTimestamp()
		}
		const ref = await addDoc(collection(db!, COLLECTION), payload)
		return { id: ref.id, ...payload, createdAt: Timestamp.now() } as Order
	},

	async updateStatus(id: string, status: Order["status"]): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), {
			status,
			updatedAt: serverTimestamp()
		})
	},

	async receive(data: ReceiveOrderDTO): Promise<void> {
		await runTransaction(db!, async (transaction) => {
			const orderRef = doc(db!, COLLECTION, data.orderId)
			const orderSnap = await transaction.get(orderRef)
			if (!orderSnap.exists()) throw new Error("Pedido no encontrado")

			const order = { id: orderSnap.id, ...orderSnap.data() } as Order

			// Actualizar items recibidos en el pedido
			const updatedItems = order.items.map((item) => {
				const received = data.items.find((r) => r.productId === item.productId)
				if (!received) return item
				return {
					...item,
					receivedQuantity: received.receivedQuantity,
					lotNumber: received.lotNumber,
					expirationDate: Timestamp.fromDate(received.expirationDate),
					purchasePrice: received.purchasePrice,
					sellPrice: received.sellPrice
				}
			})

			transaction.update(orderRef, {
				status: "received",
				items: updatedItems,
				receivedAt: serverTimestamp(),
				receivedBy: data.userId,
				updatedAt: serverTimestamp()
			})

			// Crear lotes y movimientos por cada item recibido
			for (const item of data.items) {
				if (item.receivedQuantity <= 0) continue

				const orderItem = order.items.find((i) => i.productId === item.productId)
				if (!orderItem) continue

				const lotRef = doc(collection(db!, "lots"))
				transaction.set(lotRef, {
					productId: item.productId,
					brand: orderItem.productName ?? "",
					manufacturer: "",
					supplierId: order.supplierId,
					numberLot: item.lotNumber,
					initialStock: item.receivedQuantity,
					stock: item.receivedQuantity,
					purchasePrice: item.purchasePrice,
					sellPrice: item.sellPrice,
					expirationDate: Timestamp.fromDate(item.expirationDate),
					isActive: true,
					createdAt: serverTimestamp()
				})

				const movementRef = doc(collection(db!, "movements"))
				transaction.set(movementRef, {
					type: "entry",
					productId: item.productId,
					lotId: lotRef.id,
					quantity: item.receivedQuantity,
					previousQuantity: 0,
					newQuantity: item.receivedQuantity,
					saleId: null,
					referenceId: data.orderId,
					originalPrice: null,
					modifiedPrice: null,
					userId: data.userId,
					reason: `Recepción pedido #${data.orderId.slice(-8).toUpperCase()}`,
					createdAt: serverTimestamp()
				})
			}
		})
	}
}
