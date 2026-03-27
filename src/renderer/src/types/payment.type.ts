import { Timestamp } from "firebase/firestore"

export type PaymentMethod = "cash" | "card" | "credit" | "wallet" | "mixed"

export type PaymentStatus = "pending" | "completed" | "failed"

export interface Payment {
	id: string
	paymentMethod: PaymentMethod
	amount: number
	paymentStatus: PaymentStatus
	createdAt: Timestamp
	updatedAt?: Timestamp
}
