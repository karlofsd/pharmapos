import { Timestamp } from "firebase/firestore"

export type OrderStatus =
	| "pending"
	| "started"
	| "in_transit"
	| "refunded"
	| "cancelled"
	| "received"

export interface OrderItem {
	productId: string
	quantity: number
	lotNumber: string | null
	initialStock: number
	expirationDate: Timestamp
	purchasePrice: number
	sellPrice: number
}

export interface Order {
	id: string
	userId: string
	providerId: string
	receivedBy?: string
	status: OrderStatus
	items: OrderItem[]
	totalAmount: number
	createdAt: Timestamp
	receivedAt?: Timestamp
	updatedAt?: Timestamp
}
