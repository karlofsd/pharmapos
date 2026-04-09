export interface Receipt {
	saleId: string
	voucherType: "boleta" | "factura"
	items: {
		productName: string
		quantity: number
		subtotal: number
		finalPrice: number
		alterPrice: number | null
	}[]
	totalPrice: number
	cashReceived: number
	change: number
	paymentMethod: string
	clientName: string | null
	clientDocument: string | null
	cashierName: string
	date: string
}
