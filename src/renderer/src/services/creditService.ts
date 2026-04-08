import {
	collection,
	doc,
	getDocs,
	addDoc,
	updateDoc,
	query,
	where,
	orderBy,
	runTransaction,
	serverTimestamp,
	Timestamp
} from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { Credit, CreditPayment } from "@renderer/types"

const COLLECTION = "credits"

export interface CreateCreditDTO {
	type: "debt" | "favor"
	clientId: string
	clientName: string
	saleId: string
	totalAmount: number
	dueDate: Date
}

export interface PaymentDTO {
	creditId: string
	clientId: string
	amount: number
	paymentMethod: "cash" | "wallet"
	cashierId: string
}

export const CreditService = {
	async getAll(): Promise<Credit[]> {
		const q = query(
			collection(db, COLLECTION),
			where("status", "in", ["pending", "overdue"]),
			orderBy("dueDate", "asc")
		)
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Credit)
	},

	async getByClient(clientId: string): Promise<Credit[]> {
		const q = query(
			collection(db, COLLECTION),
			where("clientId", "==", clientId),
			orderBy("createdAt", "desc")
		)
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Credit)
	},

	async create(data: CreateCreditDTO): Promise<Credit> {
		const payload = {
			type: data.type,
			clientId: data.clientId,
			clientName: data.clientName,
			saleId: data.saleId,
			totalAmount: data.totalAmount,
			paidAmount: 0,
			balance: data.totalAmount,
			status: "pending",
			dueDate: Timestamp.fromDate(data.dueDate),
			payments: [],
			createdAt: serverTimestamp()
		}
		const ref = await addDoc(collection(db, COLLECTION), payload)
		return { id: ref.id, ...payload, createdAt: Timestamp.now() } as Credit
	},

	async createFavor(
		clientId: string,
		clientName: string,
		amount: number,
		cashierId: string
	): Promise<void> {
		await runTransaction(db, async (transaction) => {
			const clientRef = doc(db, "clients", clientId)
			const creditRef = doc(collection(db, COLLECTION))
			// Actualizar saldoFavor del cliente
			const clientSnap = await transaction.get(clientRef)
			if (clientSnap.exists()) {
				const current = clientSnap.data().favorBalance ?? 0
				transaction.update(clientRef, { favorBalance: current + amount })
			}
			// Crear crédito a favor
			const dueDate = new Date()
			dueDate.setFullYear(dueDate.getFullYear() + 2)

			transaction.set(creditRef, {
				type: "favor",
				clientId,
				clientName,
				saleId: "manual",
				totalAmount: amount,
				paidAmount: 0,
				balance: amount,
				status: "pending",
				dueDate: Timestamp.fromDate(dueDate),
				payments: [],
				createdBy: cashierId,
				createdAt: serverTimestamp()
			})
		})
	},

	async registerPayment(data: PaymentDTO): Promise<void> {
		await runTransaction(db, async (transaction) => {
			const creditRef = doc(db, COLLECTION, data.creditId)
			const creditSnap = await transaction.get(creditRef)
			if (!creditSnap.exists()) throw new Error("Crédito no encontrado")

			const credit = { id: creditSnap.id, ...creditSnap.data() } as Credit

			if (data.amount > credit.balance) throw new Error("El monto excede el saldo")

			const newPaidAmount = credit.paidAmount + data.amount
			const newBalance = credit.balance - data.amount
			const newStatus = newBalance <= 0 ? "paid" : "pending"

			const payment: CreditPayment = {
				amount: data.amount,
				paymentMethod: data.paymentMethod,
				cashierId: data.cashierId,
				createdAt: Timestamp.now()
			}

			transaction.update(creditRef, {
				paidAmount: newPaidAmount,
				balance: newBalance,
				status: newStatus,
				payments: [...credit.payments, payment]
			})

			// Actualizar saldo del cliente
			const clientRef = doc(db, "clients", data.clientId)
			const clientSnap = await transaction.get(clientRef)
			if (clientSnap.exists()) {
				const clientData = clientSnap.data()
				if (credit.type === "debt") {
					const currentDebt = clientData.debtBalance ?? 0
					transaction.update(clientRef, {
						debtBalance: Math.max(0, currentDebt - data.amount)
					})
				}
				// Si pagó con saldo a favor, descontarlo
				if (data.paymentMethod === "wallet") {
					const currentFavor = clientData.favorBalance ?? 0
					transaction.update(clientRef, {
						favorBalance: Math.max(0, currentFavor - data.amount)
					})
				}
			}
		})
	},

	async checkAndUpdateOverdue(): Promise<void> {
		const q = query(
			collection(db, COLLECTION),
			where("status", "==", "pending"),
			where("dueDate", "<", Timestamp.now())
		)
		const snapshot = await getDocs(q)

		await Promise.all(
			snapshot.docs.map((d) => updateDoc(doc(db, COLLECTION, d.id), { status: "overdue" }))
		)
	}
}
