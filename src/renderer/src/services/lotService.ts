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
import { Lot } from "@renderer/types"

const LOTS = "lots"
const MOVEMENTS = "movements"

export type CreateLotDTO = Omit<Lot, "id" | "createdAt" | "updatedAt"> & { supplierId?: string }

export type StockAdjustDTO = {
	lotId: string
	productId: string
	quantity: number
	reason: string
	userId: string
}

export const LotService = {
	async getAll(): Promise<Lot[]> {
		const q = query(
			collection(db, LOTS),
			where("isActive", "==", true),
			orderBy("expirationDate", "asc")
		)
		console.log("Fetching lots with query:", q)
		const snapshot = await getDocs(q)
		console.log("Fetched lots:", snapshot)
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Lot)
	},

	async getByProduct(productId: string): Promise<Lot[]> {
		const q = query(
			collection(db, LOTS),
			where("productId", "==", productId),
			where("isActive", "==", true),
			orderBy("expirationDate", "asc")
		)
		const snapshot = await getDocs(q)
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Lot)
	},

	async create(data: CreateLotDTO, userId: string): Promise<Lot> {
		const lotPayload = {
			...data,
			isActive: true,
			createdAt: serverTimestamp()
		}

		const lotRef = await addDoc(collection(db, LOTS), lotPayload)

		// Registrar movimiento de entrada
		await addDoc(collection(db, MOVEMENTS), {
			type: "entry",
			productId: data.productId,
			lotId: lotRef.id,
			quantity: data.stock,
			previousQuantity: 0,
			newQuantity: data.stock,
			saleId: null,
			referenceId: null,
			originalPrice: null,
			modifiedPrice: null,
			userId,
			reason: "Ingreso de nuevo lote",
			createdAt: serverTimestamp()
		})

		return { id: lotRef.id, ...lotPayload, createdAt: Timestamp.now() } as Lot
	},

	async updatePrice(lotId: string, sellPrice: number): Promise<void> {
		await updateDoc(doc(db, LOTS, lotId), {
			sellPrice,
			updatedAt: serverTimestamp()
		})
	},

	async adjustStock(data: StockAdjustDTO): Promise<void> {
		const lotRef = doc(db, LOTS, data.lotId)

		await runTransaction(db, async (transaction) => {
			const lotSnap = await transaction.get(lotRef)
			if (!lotSnap.exists()) throw new Error("Lote no encontrado")

			const currentStock = lotSnap.data().stock as number
			const newStock = currentStock + data.quantity

			if (newStock < 0) throw new Error("Stock insuficiente")

			transaction.update(lotRef, {
				stock: newStock,
				updatedAt: serverTimestamp()
			})

			const movementRef = doc(collection(db, MOVEMENTS))
			transaction.set(movementRef, {
				type: "adjustment",
				productId: data.productId,
				lotId: data.lotId,
				quantity: data.quantity,
				previousQuantity: currentStock,
				newQuantity: newStock,
				saleId: null,
				referenceId: null,
				originalPrice: null,
				modifiedPrice: null,
				userId: data.userId,
				reason: data.reason,
				createdAt: serverTimestamp()
			})
		})
	},

	async deactivate(lotId: string): Promise<void> {
		await updateDoc(doc(db, LOTS, lotId), {
			isActive: false,
			updatedAt: serverTimestamp()
		})
	}
}
