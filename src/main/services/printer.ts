import { ipcMain } from "electron"
import { IPC_CHANNELS } from "../../../shared/ipcChannels"
import { Receipt } from "../../../shared/types/receipt.type"
import { exec } from "child_process"
import { Buffer } from "node:buffer"

const TICKETERA_WIDTH = 48

function center(text: string): string {
	const padding = Math.max(0, Math.floor((TICKETERA_WIDTH - text.length) / 2))
	return " ".repeat(padding) + text
}

function columns(left: string, right: string): string {
	const space = TICKETERA_WIDTH - left.length - right.length
	return left + " ".repeat(Math.max(1, space)) + right
}

function divider(char = "-"): string {
	return char.repeat(TICKETERA_WIDTH)
}

function formatReceipt(data: Receipt): string[] {
	const lines: string[] = []
	const date = new Date(data.date)
	const dateStr = date.toLocaleDateString("es-PE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	})
	const timeStr = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })

	// 1. CABECERA
	lines.push(divider("*"))
	lines.push(center("      *** BOTICA ***      "))
	lines.push(center("  NUESTRA SEÑORA DEL VALLE  "))
	lines.push(divider("*"))
	lines.push(center("RUC: 10308401036"))
	lines.push(center("CALLE DEAN VALDIVIA 1106 - COCACHACRA,AREQUIPA"))
	lines.push(center("TEL: 934562252"))
	lines.push(divider("="))
	lines.push(
		center(
			data.voucherType === "factura" ? "FACTURA ELECTRÓNICA" : "BOLETA DE VENTA ELECTRÓNICA"
		)
	)
	lines.push(center(`N°: ${data.saleId.slice(-8).toUpperCase()}`))
	lines.push(divider("="))

	// 2. DATOS DEL CLIENTE Y VENTA
	lines.push(`FECHA EMISIÓN : ${dateStr} ${timeStr}`)
	lines.push(`CAJERO        : ${data.cashierName.toUpperCase()}`)

	if (data.clientName) {
		lines.push(`CLIENTE       : ${data.clientName.toUpperCase()}`)
		if (data.clientDocument) {
			const label = data.clientDocument.length === 11 ? "RUC" : "DNI/CE"
			lines.push(`${label.padEnd(14)}: ${data.clientDocument}`)
		}
	} else {
		lines.push(`CLIENTE       : VARIOS`)
	}
	lines.push(divider("-"))

	// 3. DETALLE DE PRODUCTOS
	lines.push(columns("CANT  DESCRIPCIÓN", "TOTAL"))
	lines.push(divider("-"))

	for (const item of data.items) {
		const qtyPrefix = `${item.quantity}`.padEnd(6)
		const name = item.productName.toUpperCase()
		const total = item.subtotal.toFixed(2)

		// Si el nombre es muy largo, lo ponemos en una línea y el precio en otra
		if (name.length > 30) {
			lines.push(qtyPrefix + name)
			lines.push(columns("", total))
		} else {
			lines.push(columns(qtyPrefix + name, total))
		}

		// Detalle de precio unitario si es más de 1 unidad
		if (item.quantity > 1) {
			lines.push(`       (${item.quantity} x S/. ${item.finalPrice.toFixed(2)})`)
		}
	}

	// 4. TOTALES
	lines.push(divider("-"))
	const subtotal = data.totalPrice / 1.18
	const igv = data.totalPrice - subtotal

	lines.push(columns("   OP. GRAVADA:  S/.", subtotal.toFixed(2)))
	lines.push(columns("   I.G.V. (18%): S/.", igv.toFixed(2)))
	lines.push(columns("   TOTAL A PAGAR:S/.", data.totalPrice.toFixed(2)))
	lines.push(divider("-"))

	// 5. PAGO
	const methodLabels: Record<string, string> = {
		cash: "EFECTIVO",
		card: "TARJETA",
		credit: "CRÉDITO",
		wallet: "YAPE/PLIN",
		mixed: "MIXTO"
	}
	lines.push(
		columns("PAGO CON:", methodLabels[data.paymentMethod] || data.paymentMethod.toUpperCase())
	)

	if (data.paymentMethod === "cash") {
		lines.push(columns("RECIBIDO:", `S/. ${data.cashReceived.toFixed(2)}`))
		lines.push(columns("CAMBIO:", `S/. ${data.change.toFixed(2)}`))
	}

	// 6. ADVERTENCIAS Y POLÍTICAS
	lines.push(divider("-"))
	lines.push(center("POLÍTICA DE DEVOLUCIONES:"))
	lines.push(center("Solo se aceptan cambios dentro de las 24h"))
	lines.push(center("con empaque sellado y comprobante."))
	lines.push(center("No se aceptan devoluciones de refrigerados."))

	// 7. CÓDIGO DE BARRAS / IDENTIFICADOR
	lines.push("")
	lines.push(center("ID DE VENTA PARA SEGUIMIENTO"))
	// Generamos una representación visual del ID de venta
	lines.push(center(`* ${data.saleId.toUpperCase()} *`))

	// 8. SECCIÓN FISAL OBLIGATORIA (Post-totales)
	// lines.push(divider("-"))
	// lines.push(`Hash: ${nubefact.codigo_hash}`)
	// lines.push("")

	// // Representación del QR en texto (Requerido si no hay imagen)
	// lines.push(center("Resumen para QR:"))
	// lines.push(center(nubefact.cadena_para_codigo_qr.slice(0, 48))) // Primera parte
	// if (nubefact.cadena_para_codigo_qr.length > 48) {
	// 	lines.push(center(nubefact.cadena_para_codigo_qr.slice(48, 96)))
	// }

	// 9. PIE DE PÁGINA
	lines.push(divider("="))
	lines.push(center("¡GRACIAS POR SU COMPRA!"))
	// lines.push(center("Representación impresa de la " + data.voucherType.toUpperCase()))
	// lines.push(center("Consulte su comprobante en:"))
	// lines.push(center("://farmacia.com.pe/consultas"))
	lines.push("")
	lines.push("")
	lines.push("") // Espacio para el corte físico

	return lines
}

export function registerPrinterHandlers(): void {
	const PRINTER_NAME = "TicketeraPOS"
	ipcMain.handle(IPC_CHANNELS.PRINT_RECEIPT, async (_event, data: Receipt) => {
		try {
			const lines = formatReceipt(data)
			// Unimos las líneas y añadimos el comando de corte ESC/POS (GS V 66 0)
			const textBuffer = Buffer.from(lines.join("\n"), "utf-8")
			const footerBuffer = Buffer.from("\n\n\n\x1dV\x42\x00")
			const finalBuffer = Buffer.concat([textBuffer, Buffer.from("\n"), footerBuffer])
			// Enviamos el texto directamente a la cola de impresión que ya probaste
			const child = exec(`lp -d ${PRINTER_NAME} -o raw`)
			child.stdin?.write(finalBuffer)
			child.stdin?.end()

			return { success: true }
		} catch (error) {
			console.error("Error de impresión:", error)
			return { success: false, error: String(error) }
		}
	})

	ipcMain.handle(IPC_CHANNELS.OPEN_DRAWER, async () => {
		try {
			const openDrawer = "\x1bp\x00\x19\xfa"

			const child = exec(`lp -d ${PRINTER_NAME} -o raw`)
			child.stdin?.write(openDrawer)
			child.stdin?.end()

			return { success: true }
		} catch (error) {
			console.error("Error al abrir cajón:", error)
			return { success: false, error: String(error) }
		}
	})
}
