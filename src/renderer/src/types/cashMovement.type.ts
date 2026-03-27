import { Timestamp } from "firebase/firestore"

export type CashMovementType =
	| "operating_expense"
	| "bank_deposit"
	| "change_fund"
	| "adjustment"
	| "till_init"
	| "till_close"
	| "other"

export interface CashMovement {
	id: string
	tillId: string
	type: CashMovementType
	direction: "in" | "out"
	amount: number
	reason: string
	userId: string
	isSynced: boolean
	createdAt: Timestamp
}
