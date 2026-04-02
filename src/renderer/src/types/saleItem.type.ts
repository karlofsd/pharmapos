import { Timestamp } from "firebase/firestore"

export interface Modification {
	userId: string
	reason: string
	date: Timestamp
}

export interface SaleItem {
	productId: string
	productName: string
	lotId: string
	quantity: number
	unitPrice: number
	alterPrice: number | null
	finalPrice: number
	subtotal: number
	modification?: Modification
}

export const SaleItemUtils = {
	getFinalPrice({ unitPrice, alterPrice }: SaleItem): number {
		return alterPrice != null ? alterPrice : unitPrice
	},
	calculateSubtotal({ quantity, finalPrice }: SaleItem): number {
		return quantity * finalPrice
	}
} as const
