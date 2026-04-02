import { Timestamp } from "firebase/firestore"

export interface Lot {
	id: string
	productId: string
	manufacturer: string
	brand: string
	numberLot: string
	initialStock: number
	stock: number
	sellPrice: number
	purchasePrice: number
	expirationDate: Timestamp
	isActive: boolean
	supplierId?: string
	createdAt: Timestamp
	updatedAt?: Timestamp
}

export const LotUtils = {
	isExpired({ expirationDate }: Lot): boolean {
		const now = new Date()
		return expirationDate.toDate() < now
	}
}
