import { Timestamp } from "firebase/firestore"

export type CreditStatus = "pending" | "paid" | "overdue"

export type CreditType = "debt" | "favor"

export interface CreditPayment {
	amount: number
	paymentMethod: string
	cashierId: string
	createdAt: Timestamp
}

export interface Credit {
	id: string
	type: CreditType
	clientId: string
	clientName: string
	saleId: string
	totalAmount: number
	paidAmount: number
	balance: number
	status: CreditStatus
	dueDate: Timestamp
	payments: CreditPayment[]
	createdAt: Timestamp
}

export interface CreditBalance {
	hasCredit: boolean
	creditLimit: number
	debtBalance: number
	favorBalance: number
}
