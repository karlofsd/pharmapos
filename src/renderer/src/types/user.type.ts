import { Timestamp } from "firebase/firestore"

export type Role = "admin" | "cashier" | "supervisor"
export type PermissionLevel = 1 | 2 | 3

export type PhoneNumber = {
	code: string
	number: string
}

export type DocumentType = "dni" | "ruc" | "passport" | "ce"

type Document = Record<DocumentType, string>
export interface BaseUser {
	id: string
	name: string
	lastname: string
	document: Document
	email: string | null
	phoneNumber: PhoneNumber
	isActive: boolean
	createdAt: Timestamp
	updatedAt?: Timestamp
}

export interface User extends BaseUser {
	username: string
	role: Role
	level: PermissionLevel
}

export const UserUtils = {
	getFullname: ({ name, lastname }: BaseUser) => `${name} ${lastname}`
}
