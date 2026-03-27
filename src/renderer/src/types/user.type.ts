import { Timestamp } from "firebase/firestore"

export type Role = "admin" | "cashier"

export type PhoneNumber = {
	code: string
	number: string
}

export type UserGenre = "male" | "female" | "other"

export interface User {
	id: string
	documentId: string
	fullName: string
	phoneNumber: PhoneNumber
	genre: UserGenre
	birthDate: Timestamp
	role: Role
	isActive: boolean
	createdAt: Timestamp
	updatedAt?: Timestamp
}
