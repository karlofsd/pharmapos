import { Timestamp } from "firebase/firestore"
import { SaleItem } from "./saleItem.type"

export type SaleStatus = "completed" | "cancelled" | "credit"
export type PaymentMethod = "cash" | "card" | "credit" | "wallet" | "mixed"

export interface Anullation {
	userId: string
	reason: string
	date: Timestamp
}

export interface PaymentDetails {
	cashAmount?: number
	cardAmount?: number
	creditAmount?: number
	walletAmount?: number
}

export interface Sale {
	id: string
	cashierId: string
	tillId: string
	items: SaleItem[]
	paymentMethod: PaymentMethod
	paymentDetails: PaymentDetails
	receivedAmount: number
	change: number
	totalPrice: number
	status: SaleStatus
	isSynced: boolean
	clientId?: string
	anullation?: Anullation
	createdAt: Timestamp
}
