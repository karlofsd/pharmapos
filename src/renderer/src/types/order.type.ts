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
	orderedQuantity: number
	receivedQuantity: number
	lotNumber: string | null
	expirationDate: Timestamp
	purchasePrice: number
	sellPrice: number
}

export interface Order {
	id: string
	supplierId: string
	status: OrderStatus
	items: OrderItem[]
	totalAmount: number
	notes: string | null
	paymentId: string | null
	expectedAt: Timestamp | null
	receivedAt: Timestamp | null
	createdBy: string
	createdAt: Timestamp
	receivedBy?: string
	updatedAt?: Timestamp
}
