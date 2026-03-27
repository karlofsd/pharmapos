import { Timestamp } from "firebase/firestore"
import { PhoneNumber } from "./user.type"
import { CreditBalance } from "./credit.type"

export type DocumentType = "dni" | "ruc" | "passport" | "ce"

export type PaymentCondition = "cash" | "credit"

export interface Supplier {
	id: string
	name: string
	documentType: DocumentType
	documentId: string
	businessName: string
	email: string | null
	phoneNumber: PhoneNumber
	creditDays: number
	paymentCondition: PaymentCondition
	address: string | null
	isActive: boolean
	createdAt: Timestamp
	updatedAt?: Timestamp
}

export type SupplierWithCredit = Supplier & CreditBalance
