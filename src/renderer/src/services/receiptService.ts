import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where
} from "firebase/firestore"
import { IPC_CHANNELS } from "../../../../shared/ipcChannels"
import { Receipt } from "shared/types/receipt.type"
import { db } from "./firebase"

// ─── Config types ─────────────────────────────────────────────────────────────

export interface BusinessConfig {
	ruc: string
	socialReason: string
	name: string
	address: string
	department: string
	province: string
	district: string
	phoneNumber: string
}

export interface ReceiptConfig {
	apisunatToken: string
	apisunatUrl: string
	boletaSerie: string
	facturaSerie: string
	igv: string
	igvCode: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function getBusinessConfig(): Promise<BusinessConfig> {
	const snap = await getDoc(doc(db!, "settings", "businessConfig"))
	if (!snap.exists()) throw new Error("Configuración del negocio no encontrada")
	return snap.data() as BusinessConfig
}

export async function getReceiptConfig(): Promise<ReceiptConfig> {
	const snap = await getDoc(doc(db!, "settings", "receiptConfig"))
	if (!snap.exists()) throw new Error("Configuración de comprobantes no encontrada")
	return snap.data() as ReceiptConfig
}

/**
 * Obtiene el siguiente número correlativo para una serie dada.
 * Busca el último comprobante emitido con esa serie y suma 1.
 * Si no existe ninguno, retorna 1.
 */
export async function getNextSerialNumber(serie: string): Promise<number> {
	const q = query(
		collection(db!, "receipts"),
		where("serial", "==", serie),
		orderBy("serialNumber", "desc"),
		limit(1)
	)
	const snap = await getDocs(q)
	if (snap.empty) return 1
	const last = snap.docs[0].data().serialNumber as number
	return last + 1
}

export function formatDate(dateStr: string): string {
	// Ensures YYYY-MM-DD format
	return dateStr.slice(0, 10)
}

export function formatHour(hourStr: string): string {
	// Ensures HH:MM:SS format
	return hourStr.slice(0, 8)
}

export type CreateReceiptDTO = {
	cashierName: string
	cashReceived: number
	change: number
	clientName: string | null
	clientAddress: string | null
	clientDocumentType: "RUC" | "DNI" | "CE" | null
	clientDocument: string | null
	paymentMethod: string
	saleId: string
	totalPrice: number
	voucherType: "factura" | "boleta"
	items: {
		productName: string
		quantity: number
		unitPrice: number
		alterPrice: number | null
		finalPrice: number
	}[]
}

export async function buildReceiptPayload(
	params: CreateReceiptDTO
): Promise<{ payload: Receipt; business: BusinessConfig; config: ReceiptConfig }> {
	// 1. Cargar configuración en paralelo
	const [business, config] = await Promise.all([getBusinessConfig(), getReceiptConfig()])

	// 2. Determinar serie según tipo de comprobante
	const serie =
		params.voucherType === "boleta"
			? config.boletaSerie
			: params.voucherType == "factura"
				? config.facturaSerie
				: "T001"

	// 3. Obtener correlativo
	const numero = await getNextSerialNumber(serie)

	const datetime = new Date(Date.now()).toISOString()
	const parts = datetime.split("T")
	const receipt = {
		...params,
		serialCode: `${serie}-${numero}`,
		serial: serie,
		serialNumber: numero,
		ownerName: business.socialReason,
		ownerRUC: business.ruc,
		ownerBussinesName: business.name,
		ownerPhone: business.phoneNumber,
		ownerAddress: business.address,
		items: params.items.map((i) => {
			const subtotal = (i.alterPrice ?? i.unitPrice) / (Number(config.igv) / 100 + 1)
			return {
				...i,
				subtotal: subtotal,
				igv: (i.alterPrice ?? i.unitPrice) - subtotal,
				finalPrice: (i.alterPrice ?? i.unitPrice) * i.quantity
			}
		}),
		date: formatDate(parts[0]),
		hour: formatHour(parts[1])
	} as Receipt

	receipt["totalIGV"] = receipt.items.reduce((acc, i) => acc + i.igv, 0)

	return { payload: receipt, business, config }
}

export const ReceiptService = {
	async getAll(): Promise<Receipt[]> {
		const result = await getDocs(collection(db!, "receipts"))
		const receipts = result.docs.map<Receipt>(
			(doc) => ({ id: doc.id, ...doc.data() }) as Receipt
		)
		return receipts
	},

	async create(data: Receipt): Promise<Receipt> {
		const ref = await addDoc(collection(db!, "receipts"), {
			...data,
			createdAt: serverTimestamp()
		})
		return { ...data, id: ref.id }
	},

	async update(id: string, data: Partial<Receipt>): Promise<void> {
		const receiptRef = doc(db!, "receipts", id)
		await updateDoc(receiptRef, data)
	},

	async print(data: Receipt): Promise<void> {
		// Envía los datos al proceso principal via IPC
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.PRINT_RECEIPT, data)
	},

	async openDrawer(): Promise<void> {
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.OPEN_DRAWER)
	}
}
