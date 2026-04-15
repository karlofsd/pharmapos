export type SunatStatus = "ACEPTADO" | "PENDIENTE" | "RECHAZADO" | "ANULADO" | "PENDING" | "ERROR"
export type VoucherType = "boleta" | "factura"
export type DocumentType = "RUC" | "DNI" | "CE"
export interface Receipt {
	id: string
	saleId: string
	voucherType: VoucherType
	ownerName: string
	ownerRUC: string
	ownerBussinesName?: string
	ownerAddress: string
	ownerPhone?: string
	items: {
		productName: string
		unitPrice: number //Precio Bruto
		alterPrice: number | null //Precio Bruto modificado
		quantity: number
		subtotal: number //Precio Neto sin IGV
		igv: number
		finalPrice: number //Cantidad por Precio Bruto
	}[]
	totalIGV: number
	totalPrice: number
	cashReceived: number
	change: number
	paymentMethod: string
	clientName: string | null
	clientDocumentType: DocumentType | null
	clientDocument: string | null
	clientAddress: string | null
	cashierName: string
	date: string
	hour: string
	serialCode: string
	hash: string
	qrString: string
	sunatStatus: SunatStatus
	sunatMessage: string
	xmlURL: string | null
	cdrURL: string | null
	pdfTicketURL: string | null
	pdfA4URL?: string
	isSynced: boolean
}
