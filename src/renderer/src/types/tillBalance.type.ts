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
