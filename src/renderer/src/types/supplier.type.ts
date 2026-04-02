import { BaseUser } from "./user.type"
import { CreditBalance } from "./credit.type"

export type PaymentCondition = "cash" | "credit"

export interface Supplier extends BaseUser, CreditBalance {
	id: string
	businessName: string
	creditDays: number
	paymentCondition: PaymentCondition
	address: string | null
}
