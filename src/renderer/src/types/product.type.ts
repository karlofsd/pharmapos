import { Timestamp } from "firebase/firestore"
import { DCI } from "./dci.type"

export type ProductPresentation =
	| "tablet"
	| "capsule"
	| "syrup"
	| "injection"
	| "ointment"
	| "cream"
	| "gel"
	| "powder"
	| "other"

export type DataSource = "manual" | "external"

export interface Product {
	id: string
	manufacturer: string
	brand: string
	barcode: string
	altcode: string[]
	dci: DCI[]
	presentation: ProductPresentation
	minStock: number
	dataSource: DataSource
	isActive: boolean
	requiredPrescription: boolean
	createdAt: Timestamp
	updatedAt?: Timestamp
}

export const ProductUtils = {
	getDescription({ dci }: Product): string {
		return dci.map(({ name, measurement, unit }) => `${name} ${measurement}${unit}`).join(" + ")
	}
} as const
