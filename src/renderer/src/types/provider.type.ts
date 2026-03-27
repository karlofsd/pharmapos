import { Timestamp } from "firebase/firestore"
import { PhoneNumber } from "./user.type"

export interface Provider {
	id: string
	name: string
	businessName?: string
	email: string
	phoneNumber: PhoneNumber
	address: string
	isActive: boolean
	debt: number
	credit: number
	createdAt: Timestamp
	updatedAt?: Timestamp
}
