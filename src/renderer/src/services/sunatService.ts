import { Receipt, VoucherType } from "@shared/types/receipt.type"
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { ApiService } from "./apiService"
import {
	buildReceiptPayload,
	BusinessConfig,
	CreateReceiptDTO,
	getBusinessConfig,
	getReceiptConfig,
	ReceiptConfig,
	ReceiptService
} from "./receiptService"

type CreateInvoiceDTO = {
	documento: VoucherType
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

// ─── Payload builder ──────────────────────────────────────────────────────────

interface BuildPayloadParams {
	receipt: Receipt
	business: BusinessConfig
	config: ReceiptConfig
}

function buildApisunatPayload(params: BuildPayloadParams): CreateInvoiceDTO {
	const { receipt, business, config } = params

	return {
		documento: receipt.voucherType,
		serie: receipt.serial,
		numero: receipt.serialNumber,
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
		const { payload, business, config } = await buildReceiptPayload(params)

		try {
			// Persistir en Firestore independientemente del estado SUNAT
			const receipt = await ReceiptService.create({
				...payload
			})
			// Construir payload
			const payloadApi = buildApisunatPayload({
				receipt: payload,
				business,
				config
			})

			// 5. Enviar a apisunat
			const response = await ApiService.post(
				`${config.apisunatUrl}/documents`,
				payloadApi,
				config.apisunatToken
			)

			const data: ApisunatResponse = response

			const doc: Partial<Receipt> = {
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
			await ReceiptService.update(doc.id!, doc)

			if (data.payload?.estado === "RECHAZADO") {
				return {
					success: false,
					receipt: { ...receipt, ...doc },
					error: data.message
				}
			}

			return {
				success: true,
				receipt: { ...receipt, ...doc },
				pdfUrl: data.payload?.pdf.ticket
			}
		} catch (error) {
			let receipt = payload
			// Si hay error de red, guardar como pendiente para reintento
			try {
				receipt = await ReceiptService.create({
					...payload,
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
		type: VoucherType,
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

	async status(type: VoucherType, serialCode: string): Promise<ApisunatResponse> {
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
			const data = docSnap.data() as Receipt

			try {
				const { payload, message } = await ApiService.post(
					`${config.apisunatUrl}/documents`,
					buildApisunatPayload({
						receipt: data,
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
