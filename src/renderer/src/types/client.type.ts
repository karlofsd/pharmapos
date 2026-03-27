import { Timestamp } from "firebase/firestore"
import { CreditBalance } from "./credit.type"
import { PhoneNumber } from "./user.type"

export interface Client {
	id: string
	name: string
	documentId: string
	email: string
	phoneNumber: PhoneNumber
	address: string
	isActive: boolean
	createdAt: Timestamp
	updatedAt?: Timestamp
}

export type ClientWithCredit = Client & CreditBalance
