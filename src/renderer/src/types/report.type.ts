export interface SalesReportRow {
	date: string
	saleId: string
	cashierId: string
	paymentMethod: string
	voucherType: string
	items: number
	total: number
	status: string
}

export interface KardexRow {
	date: string
	type: string
	productName: string
	lotNumber: string
	quantity: number
	previousStock: number
	newStock: number
	reason: string
	userId: string
}

export interface InventoryRow {
	productName: string
	manufacturer: string
	lotNumber: string
	stock: number
	minStock: number
	purchasePrice: number
	sellPrice: number
	expirationDate: string
	status: string
	daysUntilExpiry: number | null
}

export interface ProfitabilityRow {
	productName: string
	manufacturer: string
	lotNumber: string
	stock: number
	purchasePrice: number
	sellPrice: number
	margin: number
	marginPercent: number
	potentialProfit: number
}

export interface CreditReportRow {
	clientName: string
	documentNumber: string
	type: string
	totalAmount: number
	paidAmount: number
	balance: number
	status: string
	dueDate: string
	daysOverdue: number | null
}

export interface ReportsFilters {
	dateFrom?: Date
	dateTo?: Date
	productId?: string
	cashierId?: string
}
