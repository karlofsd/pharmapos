import { Receipt } from "shared/types/receipt.type"
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { ApiService } from "./apiService"
import { ReceiptService } from "./receiptService"

type CreateInvoiceDTO = {
	documento: "factura" | "boleta"
	serie: string
	numero: number
	ruc_emisor: string
	razon_social_emisor: string
	direccion_emisor: string
	fecha_de_emision: string
	hora_de_emision: string //Opcional
	moneda: "PEN" | "USD"
	tipo_operacion: string
	cliente_tipo_de_documento: "1" | "6" | "4"
	cliente_numero_de_documento: string
	cliente_denominacion: string
	cliente_direccion: string
	items: {
		unidad_de_medida: "NIU" | "BX"
		descripcion: string
		cantidad: number
		valor_unitario: string //Se recomienda usar 6 decimales
		porcentaje_igv: string | null
		codigo_tipo_afectacion_igv: string
		nombre_tributo: "IGV" | "EXO"
	}[]
	total_gravadas: string
	total_exoneradas: string
	total_igv: string
	total: string
}

// ─── Config types ─────────────────────────────────────────────────────────────

interface BusinessConfig {
	ruc: string
	socialReason: string
	name: string
	address: string
	department: string
	province: string
	district: string
	phoneNumber: string
}

interface ReceiptConfig {
	apisunatToken: string
	apisunatUrl: string
	boletaSerie: string
	facturaSerie: string
	igv: string
	igvCode: string
}

interface ApisunatResponse {
	success: boolean
	message: string
	payload?: {
		estado: "ACEPTADO" | "PENDIENTE" | "RECHAZADO"
		hash: string
		xml: string
		cdr: string
		pdf: {
			ticket: string
			a4: string
		}
	}
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getBusinessConfig(): Promise<BusinessConfig> {
	const snap = await getDoc(doc(db!, "settings", "businessConfig"))
	if (!snap.exists()) throw new Error("Configuración del negocio no encontrada")
	return snap.data() as BusinessConfig
}

async function getReceiptConfig(): Promise<ReceiptConfig> {
	const snap = await getDoc(doc(db!, "settings", "receiptConfig"))
	if (!snap.exists()) throw new Error("Configuración de comprobantes no encontrada")
	return snap.data() as ReceiptConfig
}

/**
 * Obtiene el siguiente número correlativo para una serie dada.
 * Busca el último comprobante emitido con esa serie y suma 1.
 * Si no existe ninguno, retorna 1.
 */
async function getNextSerialNumber(serie: string): Promise<number> {
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

function formatDate(dateStr: string): string {
	// Ensures YYYY-MM-DD format
	return dateStr.slice(0, 10)
}

function formatHour(hourStr: string): string {
	// Ensures HH:MM:SS format
	return hourStr.slice(0, 8)
}

// ─── Payload builder ──────────────────────────────────────────────────────────

interface BuildPayloadParams {
	receipt: Receipt
	serie: string
	numero: number
	business: BusinessConfig
	config: ReceiptConfig
}

function buildApisunatPayload(params: BuildPayloadParams): CreateInvoiceDTO {
	const { receipt, serie, numero, business, config } = params

	return {
		documento: receipt.voucherType,
		serie,
		numero,
		fecha_de_emision: receipt.date,
		hora_de_emision: receipt.hour,
		moneda: "PEN",
		tipo_operacion: "0101",

		// Emisor
		ruc_emisor: business.ruc,
		razon_social_emisor: business.socialReason,
		direccion_emisor: `${business.address}, ${business.district}, ${business.province}, ${business.department}`,

		// Cliente
		cliente_tipo_de_documento:
			receipt.clientDocumentType === "RUC"
				? "6"
				: receipt.clientDocumentType === "DNI"
					? "1"
					: receipt.clientDocumentType === "CE"
						? "4"
						: "1",
		cliente_numero_de_documento: receipt.clientDocument ?? "99999999",
		cliente_denominacion: receipt.clientName ?? "CLIENTE VARIOS",
		cliente_direccion: receipt.clientAddress ?? "-",

		// Items
		items: receipt.items.map((item) => ({
			unidad_de_medida: "NIU",
			descripcion: item.productName,
			cantidad: item.quantity,
			valor_unitario: item.subtotal.toFixed(2),
			porcentaje_igv: config.igv,
			codigo_tipo_afectacion_igv: config.igvCode,
			nombre_tributo: config.igvCode === "20" ? "EXO" : "IGV"
		})),

		total_gravadas:
			config.igvCode === "10" ? (receipt.totalPrice - receipt.totalIGV).toFixed(2) : "0.00",
		total_exoneradas: config.igvCode === "20" ? receipt.totalPrice.toFixed(2) : "0.00",
		total_igv: receipt.totalIGV.toFixed(2),
		total: receipt.totalPrice.toFixed(2)
	}
}

// ─── Main service ─────────────────────────────────────────────────────────────

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
export interface EmitReceiptResult {
	success: boolean
	receipt: Receipt
	pdfUrl?: string
	error?: string
}

export const ReceiptSunatService = {
	/**
	 * Emite un comprobante electrónico a SUNAT via apisunat.pe
	 * y lo persiste en la colección `receipts`.
	 */
	async emit(params: CreateReceiptDTO): Promise<EmitReceiptResult> {
		// 1. Cargar configuración en paralelo
		const [business, config] = await Promise.all([getBusinessConfig(), getReceiptConfig()])

		// 2. Determinar serie según tipo de comprobante
		const serie = params.voucherType === "boleta" ? config.boletaSerie : config.facturaSerie

		// 3. Obtener correlativo
		const numero = await getNextSerialNumber(serie)

		const datetime = new Date(Date.now()).toISOString()
		const parts = datetime.split("T")
		const receipt = {
			...params,
			serialCode: `${serie}-${numero}`,
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

		try {
			// 4. Construir payload
			const payload = buildApisunatPayload({
				receipt,
				serie,
				numero,
				business,
				config
			})

			// 5. Enviar a apisunat
			const response = await ApiService.post(
				`${config.apisunatUrl}/documents`,
				payload,
				config.apisunatToken
			)

			const data: ApisunatResponse = response

			const doc: Receipt = {
				...receipt,
				hash: data.payload?.hash ?? "",
				qrString: data.payload?.hash ?? "",
				sunatStatus: data.payload?.estado ?? "ERROR",
				sunatMessage: data.message,
				xmlURL: data.payload?.xml ?? null,
				cdrURL: data.payload?.cdr ?? null,
				pdfTicketURL: data.payload?.pdf?.ticket ?? null,
				pdfA4URL: data.payload?.pdf?.a4,
				isSynced: true
			}
			// 6. Persistir en Firestore independientemente del estado SUNAT
			await ReceiptService.create({ ...doc, serial: serie, serialNumber: numero })

			if (data.payload?.estado === "RECHAZADO") {
				return {
					success: false,
					receipt: doc,
					error: data.message
				}
			}

			return {
				success: true,
				receipt: doc,
				pdfUrl: data.payload?.pdf.ticket
			}
		} catch (error) {
			// Si hay error de red, guardar como pendiente para reintento
			try {
				await ReceiptService.create({
					...receipt,
					serial: serie,
					serialNumber: numero,
					hash: "",
					sunatStatus: "PENDING",
					sunatMessage: String(error),
					xmlURL: null,
					cdrURL: null,
					pdfTicketURL: null,
					isSynced: false
				})
			} catch {
				// Si falla el fallback, no bloqueamos la venta
				console.error("Error guardando comprobante pendiente:", error)
			}

			return {
				success: false,
				receipt,
				error: String(error)
			}
		}
	},

	async cancel(
		receiptId: string,
		type: "factura" | "boleta",
		serialCode: string
	): Promise<{ success: boolean; message: string }> {
		try {
			const parts = serialCode.split("-")
			const config = await getReceiptConfig()
			const boletaPayload = {
				documento: "resumen_diario",
				documentos_afectados: [
					{
						accion_resumen: "anular",
						documento: "boleta",
						serie: parts[0],
						numero: parts[1]
					}
				]
			}
			const facturaPayload = {
				documento: "comunicacion_baja",
				motivo: "ANULACION DE OPERACION",
				documento_afectado: {
					documento: "factura",
					serie: parts[0],
					numero: parts[1]
				}
			}
			const result = await ApiService.post(
				`${config.apisunatUrl}/${type === "boleta" ? "daily-summary" : "voided"}`,
				type === "factura" ? facturaPayload : boletaPayload,
				config.apisunatToken
			)

			if (result.success) {
				await ReceiptService.update(receiptId, {
					sunatStatus: "ANULADO"
				})
			}

			return result
		} catch (error) {
			console.log(error)
			return { success: false, message: "Error al cancelar documento" }
		}
	},

	async status(type: "factura" | "boleta", serialCode: string): Promise<ApisunatResponse> {
		try {
			const config = await getReceiptConfig()
			const parts = serialCode.split("-")
			const payload = {
				documento: type,
				serie: parts[0],
				numero: parts[1]
			}
			const response = await ApiService.post(
				`${config.apisunatUrl}/status`,
				payload,
				config.apisunatToken
			)
			return response
		} catch (error) {
			console.error("Error invoice status", error)
			return { success: false, message: String(error) }
		}
	},

	/**
	 * Reintenta emitir comprobantes que quedaron con estado PENDING
	 * (sin conexión al momento de la venta)
	 */
	async retryPending(): Promise<void> {
		const q = query(
			collection(db!, "receipts"),
			where("sunatStatus", "==", "PENDING"),
			orderBy("createdAt", "asc"),
			limit(10)
		)
		const snap = await getDocs(q)
		if (snap.empty) return

		const config = await getReceiptConfig()

		for (const docSnap of snap.docs) {
			const data = docSnap.data() as Receipt & {
				serial: string
				serialNumber: number
				sunatStatus: string
			}

			try {
				const { payload, message } = await ApiService.post(
					`${config.apisunatUrl}/documents`,
					buildApisunatPayload({
						receipt: data,
						serie: data.serial,
						numero: data.serialNumber,
						business: await getBusinessConfig(),
						config
					}),
					config.apisunatToken
				)

				if (payload?.estado === "ACEPTADO") {
					await ReceiptService.update(docSnap.id, {
						sunatStatus: "ACEPTADO",
						sunatMessage: message,
						hash: payload.hash,
						qrString: payload.hash,
						xmlURL: payload.xml,
						cdrURL: payload.cdr,
						pdfTicketURL: payload.pdf.ticket,
						pdfA4URL: payload.pdf.a4,
						isSynced: true
					})
				}
			} catch {
				// Continúa con el siguiente pendiente
				continue
			}
		}
	}
}
