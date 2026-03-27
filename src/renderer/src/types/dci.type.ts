export type DCICategory =
	| "antibiotic"
	| "analgesic"
	| "antipyretic"
	| "antiseptic"
	| "antidepressant"
	| "antihypertensive"
	| "antidiabetic"
	| "other"

export type DCIUnit = "mg" | "ml" | "g"

export interface DCI {
	name: string
	measurement: number
	unit: DCIUnit
	category: DCICategory
}
