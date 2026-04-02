import * as XLSX from "xlsx"
import { CashMovement, Movement, Order, Sale, TillBalance } from "@renderer/types"

const STATUS_LABELS: Record<string, string> = {
	completed: "Completada",
	cancelled: "Anulada",
	credit: "Crédito"
}

const MOVEMENT_LABELS: Record<string, string> = {
	entry: "Entrada",
	sale: "Venta",
	adjustment: "Ajuste",
	return: "Devolución",
	sale_reversal: "Reversión venta",
	credit_reversal: "Reversión crédito",
	favor_credit: "Crédito a favor"
}

const PAYMENT_LABELS: Record<string, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	credit: "Crédito",
	wallet: "Saldo favor",
	mixed: "Mixto"
}

export const ExportService = {
	exportSales(sales: Sale[], filename = "ventas") {
		const rows = sales.flatMap((sale) =>
			sale.items.map((item) => ({
				"ID Venta": sale.id.slice(-8).toUpperCase(),
				Fecha: sale.createdAt.toDate().toLocaleDateString("es-PE"),
				Hora: sale.createdAt.toDate().toLocaleTimeString("es-PE"),
				Estado: STATUS_LABELS[sale.status] ?? sale.status,
				Comprobante: sale.voucherType,
				Producto: item.productName,
				Cantidad: item.quantity,
				"P. Unitario": item.unitPrice.toFixed(2),
				"P. Final": item.finalPrice.toFixed(2),
				Subtotal: item.subtotal.toFixed(2),
				"Total Venta": sale.totalPrice.toFixed(2),
				"Método Pago": PAYMENT_LABELS[sale.paymentMethod] ?? sale.paymentMethod,
				Cajero: sale.cashierId
			}))
		)

		const ws = XLSX.utils.json_to_sheet(rows)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Ventas")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportMovements(movements: Movement[], filename = "movimientos") {
		const rows = movements.map((m) => ({
			ID: m.id.slice(-8).toUpperCase(),
			Fecha: m.createdAt.toDate().toLocaleDateString("es-PE"),
			Hora: m.createdAt.toDate().toLocaleTimeString("es-PE"),
			Tipo: MOVEMENT_LABELS[m.type] ?? m.type,
			"Producto ID": m.productId,
			"Lote ID": m.lotId,
			Cantidad: m.quantity,
			"Stock Anterior": m.previousStock,
			"Stock Nuevo": m.newStock,
			"P. Original": m.originalPrice?.toFixed(2) ?? "-",
			"P. Modificado": m.alterPrice?.toFixed(2) ?? "-",
			Motivo: m.reason,
			Usuario: m.userId
		}))

		const ws = XLSX.utils.json_to_sheet(rows)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Movimientos")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportTill(till: TillBalance, movements: CashMovement[], filename = "caja"): void {
		const DIRECTION_LABELS: Record<string, string> = {
			in: "Ingreso",
			out: "Retiro"
		}

		const TYPE_LABELS: Record<string, string> = {
			till_init: "Apertura",
			till_close: "Cierre",
			operating_expense: "Gasto operativo",
			bank_deposit: "Depósito banco",
			change_fund: "Fondo de cambio",
			adjustment: "Ajuste",
			other: "Otro"
		}

		const summaryRows = [
			{ Concepto: "Monto apertura", "Monto (S/.)": till.openingAmount.toFixed(2) },
			{ Concepto: "Total ventas", "Monto (S/.)": till.totalSales.toFixed(2) },
			{ Concepto: "Ventas efectivo", "Monto (S/.)": till.totalCash.toFixed(2) },
			{ Concepto: "Ventas tarjeta", "Monto (S/.)": till.totalCard.toFixed(2) },
			{ Concepto: "Ventas crédito", "Monto (S/.)": till.totalCredit.toFixed(2) },
			{ Concepto: "Ingresos manuales", "Monto (S/.)": till.totalDeposits.toFixed(2) },
			{ Concepto: "Retiros", "Monto (S/.)": till.totalWithdrawals.toFixed(2) },
			{ Concepto: "Monto cierre", "Monto (S/.)": till.closingAmount?.toFixed(2) ?? "-" },
			{ Concepto: "Diferencia", "Monto (S/.)": till.difference?.toFixed(2) ?? "-" }
		]

		const movementRows = movements.map((m) => ({
			Fecha: m.createdAt.toDate().toLocaleDateString("es-PE"),
			Hora: m.createdAt.toDate().toLocaleTimeString("es-PE"),
			Tipo: TYPE_LABELS[m.type] ?? m.type,
			Dirección: DIRECTION_LABELS[m.direction],
			"Monto (S/.)": m.amount.toFixed(2),
			Motivo: m.reason
		}))

		const wb = XLSX.utils.book_new()
		const wsSummary = XLSX.utils.json_to_sheet(summaryRows)
		const wsMovements = XLSX.utils.json_to_sheet(movementRows)
		XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen")
		XLSX.utils.book_append_sheet(wb, wsMovements, "Movimientos")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportOrders(orders: Order[], filename = "pedidos") {
		const rows = orders.flatMap((order) =>
			order.items.map((item) => ({
				"ID Pedido": order.id.slice(-8).toUpperCase(),
				Fecha: order.createdAt.toDate().toLocaleDateString("es-PE"),
				Proveedor: order.supplierId,
				Estado: order.status,
				Producto: item.productName ?? item.productId,
				"Cant. Pedida": item.orderedQuantity,
				"Cant. Recibida": item.receivedQuantity,
				"P. Compra": item.purchasePrice.toFixed(2),
				"P. Venta": item.sellPrice.toFixed(2),
				Subtotal: (item.orderedQuantity * item.purchasePrice).toFixed(2),
				"Total Pedido": order.totalAmount.toFixed(2),
				"Fecha esperada": order.expectedAt
					? order.expectedAt.toDate().toLocaleDateString("es-PE")
					: "-",
				Notas: order.notes ?? ""
			}))
		)

		const ws = XLSX.utils.json_to_sheet(rows)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Pedidos")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	}
}
