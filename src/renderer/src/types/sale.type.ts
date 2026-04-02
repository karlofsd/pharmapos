import { Timestamp } from "firebase/firestore"
import { SaleItem } from "./saleItem.type"
import { PaymentMethod } from "./payment.type"

export type SaleStatus = "completed" | "cancelled" | "credit"
export type VoucherType = "boleta" | "factura"
export interface Cancellation {
	userId: string
	reason: string
	date: Timestamp
}

export interface PaymentDetails {
	cashAmount?: number
	cardAmount?: number
	creditAmount?: number
	walletAmount?: number
}

export interface Sale {
	id: string
	cashierId: string
	tillId: string
	items: SaleItem[]
	paymentMethod: PaymentMethod
	paymentDetails: PaymentDetails
	paymentId: string[]
	receivedAmount: number
	change: number
	totalPrice: number
	status: SaleStatus
	voucherType: VoucherType
	isSynced: boolean
	clientId?: string
	cancellation?: Cancellation
	createdAt: Timestamp
}
