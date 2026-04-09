import {
	collection,
	doc,
	getDocs,
	getDoc,
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
import { TillBalance, CashMovement, CashMovementType } from "@renderer/types"

const TILLS = "tills"
const MOVEMENTS = "cashMovements"

export interface CreateCashMovementDTO {
	tillId: string
	type: CashMovementType
	direction: "in" | "out"
	amount: number
	reason: string
	userId: string
}

export const TillService = {
	async getActive(cashierId: string): Promise<TillBalance | null> {
		const q = query(
			collection(db!, TILLS),
			where("cashierId", "==", cashierId),
			where("closedAt", "==", null)
		)
		const snapshot = await getDocs(q)
		if (snapshot.empty) return null
		const d = snapshot.docs[0]
		return { id: d.id, ...d.data() } as TillBalance
	},

	async getAll(): Promise<TillBalance[]> {
		const q = query(collection(db!, TILLS), orderBy("createdAt", "desc"))
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as TillBalance)
	},

	async getMovements(tillId: string): Promise<CashMovement[]> {
		const q = query(
			collection(db!, MOVEMENTS),
			where("tillId", "==", tillId),
			orderBy("createdAt", "asc")
		)
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as CashMovement)
	},

	async open(cashierId: string, openingAmount: number): Promise<TillBalance> {
		const payload = {
			cashierId,
			openedAt: serverTimestamp(),
			closedAt: null,
			openingAmount,
			closingAmount: null,
			totalSales: 0,
			totalCash: 0,
			totalCard: 0,
			totalCredit: 0,
			totalFavorBalance: 0,
			totalDeposits: 0,
			totalWithdrawals: 0,
			difference: null,
			isSynced: false,
			createdAt: serverTimestamp()
		}

		const ref = await addDoc(collection(db!, TILLS), payload)

		await addDoc(collection(db!, MOVEMENTS), {
			tillId: ref.id,
			type: "till_init",
			direction: "in",
			amount: openingAmount,
			reason: "Apertura de caja",
			userId: cashierId,
			isSynced: false,
			createdAt: serverTimestamp()
		})

		return {
			id: ref.id,
			...payload,
			openedAt: Timestamp.now(),
			createdAt: Timestamp.now()
		} as TillBalance
	},

	async addMovement(data: CreateCashMovementDTO): Promise<CashMovement> {
		await runTransaction(db!, async (transaction) => {
			const tillRef = doc(db!, TILLS, data.tillId)
			const tillSnap = await transaction.get(tillRef)
			if (!tillSnap.exists()) throw new Error("Caja no encontrada")

			const till = tillSnap.data()
			const field = data.direction === "in" ? "totalDeposits" : "totalWithdrawals"
			const current = till[field] ?? 0

			// Verificar fondos suficientes para retiro
			if (data.direction === "out") {
				const availableCash =
					till.openingAmount + till.totalCash + till.totalDeposits - till.totalWithdrawals
				if (data.amount > availableCash) {
					throw new Error("Fondos insuficientes en caja")
				}
			}

			transaction.update(tillRef, { [field]: current + data.amount })

			const movRef = doc(collection(db!, MOVEMENTS))
			transaction.set(movRef, {
				tillId: data.tillId,
				type: data.type,
				direction: data.direction,
				amount: data.amount,
				reason: data.reason,
				userId: data.userId,
				isSynced: false,
				createdAt: serverTimestamp()
			})
		})

		const mov = await addDoc(collection(db!, MOVEMENTS), {})
		return { id: mov.id, ...data, createdAt: Timestamp.now() } as CashMovement
	},

	async close(tillId: string, closingAmount: number, userId: string): Promise<number> {
		const tillRef = doc(db!, TILLS, tillId)
		const tillSnap = await getDoc(tillRef)
		if (!tillSnap.exists()) throw new Error("Caja no encontrada")

		const till = tillSnap.data() as TillBalance
		const expectedCash =
			till.openingAmount + till.totalCash + till.totalDeposits - till.totalWithdrawals

		const difference = closingAmount - expectedCash

		await updateDoc(tillRef, {
			closedAt: serverTimestamp(),
			closingAmount,
			difference,
			isSynced: false
		})

		await addDoc(collection(db!, MOVEMENTS), {
			tillId,
			type: "till_close",
			direction: "out",
			amount: closingAmount,
			reason: `Cierre de caja. Diferencia: S/. ${difference.toFixed(2)}`,
			userId,
			isSynced: false,
			createdAt: serverTimestamp()
		})

		return difference
	},

	async exportReport(till: TillBalance, movements: CashMovement[]): Promise<void> {
		const { ExportService } = await import("./exportService")
		ExportService.exportTill(till, movements)
	}
}
