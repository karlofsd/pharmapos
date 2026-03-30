import { Timestamp } from "firebase/firestore"

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

export type ProductCategory = string

export type DataSource = "manual" | "external"
export type DCIUnit = "mg" | "ml" | "g"

export interface DCI {
	id: string
	name: string
	categories: ProductCategory[]
}

export interface ProductDCI {
	dciId: string
	name: string
	measurement: number
	unit: string
	category: string
}

export interface Product {
	id: string
	manufacturer: string
	brand: string
	barcode: string
	altcode: string[]
	dci: ProductDCI[]
	presentation: ProductPresentation
	categories: ProductCategory[]
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
