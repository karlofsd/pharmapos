import { Timestamp } from "firebase/firestore"

export type MovementType =
	| "entry"
	| "sale"
	| "adjustment"
	| "return"
	| "sale_reversal"
	| "credit_reversal"
	| "favor_reversal"
	| "favor_credit"

export interface Movement {
	id: string
	lotId: string
	productId: string
	productName?: string
	type: MovementType
	quantity: number
	previousStock: number
	newStock: number
	saleId: string | null
	originalPrice: number | null
	alterPrice: number | null
	referenceId?: string
	reason?: string
	userId: string
	createdAt: Timestamp
}
