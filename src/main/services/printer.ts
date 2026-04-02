import { ipcMain } from "electron"
import { IPC_CHANNELS } from "../../../shared/ipcChannels"
import { Receipt } from "../../../shared/types/receipt.type"

// Formatear línea centrada para 80mm (42 caracteres)
function center(text: string, width = 42): string {
	const padding = Math.max(0, Math.floor((width - text.length) / 2))
	return " ".repeat(padding) + text
}

// Formatear dos columnas
function columns(left: string, right: string, width = 42): string {
	const space = width - left.length - right.length
	return left + " ".repeat(Math.max(1, space)) + right
}

// Línea divisoria
function divider(char = "-", width = 42): string {
	return char.repeat(width)
}

function formatReceipt(data: Receipt): string[] {
	const lines: string[] = []
	const date = new Date(data.date)
	const dateStr = date.toLocaleDateString("es-PE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	})
	const timeStr = date.toLocaleTimeString("es-PE", {
		hour: "2-digit",
		minute: "2-digit"
	})

	const voucherLabel = data.voucherType === "boleta" ? "BOLETA DE VENTA" : "FACTURA"

	// Cabecera
	lines.push(center("FARMACIA"))
	lines.push(center("RUC: 20000000001"))
	lines.push(center("Av. Principal 123, Lima"))
	lines.push(center("Tel: 01-000-0000"))
	lines.push(divider())
	lines.push(center(voucherLabel))
	lines.push(center(`N° ${data.saleId.slice(-8).toUpperCase()}`))
	lines.push(divider())

	// Fecha y cajero
	lines.push(`Fecha : ${dateStr} ${timeStr}`)
	lines.push(`Cajero: ${data.cashierName}`)
	if (data.clientName) {
		lines.push(`Cliente: ${data.clientName}`)
	}
	lines.push(divider())

	// Items
	lines.push(columns("Producto", "Total"))
	lines.push(divider("-"))

	for (const item of data.items) {
		lines.push(item?.productName.slice(0, 42))
		lines.push(
			columns(
				`  ${item.quantity} x S/. ${item.finalPrice.toFixed(2)}`,
				`S/. ${item.subtotal.toFixed(2)}`
			)
		)
		if (item.alterPrice !== null) {
			lines.push(`  * Precio modificado`)
		}
	}

	lines.push(divider())

	// Totales
	lines.push(columns("TOTAL", `S/. ${data.totalPrice.toFixed(2)}`))

	const methodLabels: Record<string, string> = {
		cash: "Efectivo",
		card: "Tarjeta",
		credit: "Crédito",
		wallet: "Saldo favor",
		mixed: "Mixto"
	}
	lines.push(columns("Pago", methodLabels[data.paymentMethod] ?? data.paymentMethod))

	if (data.paymentMethod === "cash" && data.cashReceived > 0) {
		lines.push(columns("Recibido", `S/. ${data.cashReceived.toFixed(2)}`))
		lines.push(columns("Cambio", `S/. ${data.change.toFixed(2)}`))
	}

	lines.push(divider())
	lines.push(center("Gracias por su compra"))
	lines.push(center("Conserve su comprobante"))
	lines.push("")
	lines.push("")
	lines.push("")

	return lines
}

export function registerPrinterHandlers(): void {
	ipcMain.handle(IPC_CHANNELS.PRINT_RECEIPT, async (_event, data: Receipt) => {
		try {
			// Importación dinámica para evitar errores si no hay USB conectado
			const { default: USB } = await import("@node-escpos/usb-adapter")
			const { Printer } = await import("@node-escpos/core")

			const device = new USB()
			await device.open()

			const printer = new Printer(device, { encoding: "UTF-8" })
			const lines = formatReceipt(data)

			for (const line of lines) {
				await printer.text(line)
			}

			await printer.cut()
			await printer.close()

			return { success: true }
		} catch (error) {
			console.error("Print error:", error)
			return { success: false, error: String(error) }
		}
	})

	ipcMain.handle(IPC_CHANNELS.OPEN_DRAWER, async () => {
		try {
			const { default: USB } = await import("@node-escpos/usb-adapter")
			const { Printer } = await import("@node-escpos/core")

			const device = new USB()
			await device.open()
			const printer = new Printer(device, {})

			// Comando ESC/POS para abrir cajón
			await printer.cashdraw(2)
			await printer.close()

			return { success: true }
		} catch (error) {
			console.error("Drawer error:", error)
			return { success: false, error: String(error) }
		}
	})
}
