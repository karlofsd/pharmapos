import { Timestamp } from "firebase/firestore"

export interface TillBalance {
	id: string
	tillId: string
	cashierId: string
	openedAt: Timestamp
	closedAt: Timestamp | null
	openingAmount: number
	closingAmount: number | null
	totalSales: number
	totalCash: number
	totalCard: number
	totalCredit: number
	totalFavorBalance: number
	totalDeposits: number
	totalWithdrawals: number
	difference: number | null
	isSynced: boolean
	createdAt: Timestamp
}

// const obj = {
// 	brand: "Amoxil",
// 	barcode: "1234567890123",
// 	altcode: ["AMX-500"],
// 	dci: [
// 		//default []
// 		{
// 			dciId: "dci123",
// 			name: "Amoxicillin",
// 			measurement: 500, //default 0
// 			unit: "mg", //default ""
// 			category: "antibiotic"
// 		}
// 	],
// 	presentation: "capsule", //default ''
// 	categories: ["antibiotic"], //default []
// 	minStock: 10, //default 10
// 	dataSource: "manual", //default manual
// 	isActive: true, //default true
// 	requiredPrescription: true //default false
// }
