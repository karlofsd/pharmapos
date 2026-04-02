import { Timestamp } from "firebase/firestore"
import { CreditBalance } from "./credit.type"
import { BaseUser } from "./user.type"

export type ClientGenre = "male" | "female" | "other"

export interface Client extends BaseUser, CreditBalance {
	address: string
	birthday: Timestamp
	genre: ClientGenre
	createdBy: string
	updatedBy: string
}
