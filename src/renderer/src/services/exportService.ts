import * as XLSX from "xlsx"
import {
	CashMovement,
	CreditReportRow,
	InventoryRow,
	KardexRow,
	Movement,
	Order,
	ProfitabilityRow,
	Sale,
	SalesReportRow,
	TillBalance
} from "@renderer/types"

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
	},

	exportSalesReport(rows: SalesReportRow[], filename = "reporte_ventas") {
		const PAYMENT_LABELS: Record<string, string> = {
			cash: "Efectivo",
			card: "Tarjeta",
			credit: "Crédito",
			wallet: "Saldo favor",
			mixed: "Mixto"
		}
		const STATUS_LABELS: Record<string, string> = {
			completed: "Completada",
			cancelled: "Anulada",
			credit: "Crédito"
		}
		const data = rows.map((r) => ({
			Fecha: r.date,
			"ID Venta": r.saleId,
			Cajero: r.cashierId,
			"Método Pago": PAYMENT_LABELS[r.paymentMethod] ?? r.paymentMethod,
			Comprobante: r.voucherType,
			Ítems: r.items,
			"Total (S/.)": r.total.toFixed(2),
			Estado: STATUS_LABELS[r.status] ?? r.status
		}))
		const ws = XLSX.utils.json_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Ventas")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportKardex(rows: KardexRow[], filename = "kardex") {
		const TYPE_LABELS: Record<string, string> = {
			entry: "Entrada",
			sale: "Venta",
			adjustment: "Ajuste",
			return: "Devolución",
			sale_reversal: "Reversión"
		}
		const data = rows.map((r) => ({
			Fecha: r.date,
			Tipo: TYPE_LABELS[r.type] ?? r.type,
			Producto: r.productName,
			Lote: r.lotNumber,
			Cantidad: r.quantity,
			"Stock Anterior": r.previousStock,
			"Stock Nuevo": r.newStock,
			Motivo: r.reason,
			Usuario: r.userId
		}))
		const ws = XLSX.utils.json_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Kárdex")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportInventory(rows: InventoryRow[], filename = "inventario") {
		const data = rows.map((r) => ({
			Producto: r.productName,
			Laboratorio: r.manufacturer,
			Lote: r.lotNumber,
			Stock: r.stock,
			"Stock Mínimo": r.minStock,
			"P. Compra (S/.)": r.purchasePrice.toFixed(2),
			"P. Venta (S/.)": r.sellPrice.toFixed(2),
			Vencimiento: r.expirationDate,
			"Días hasta vencer": r.daysUntilExpiry ?? "Vencido",
			Estado: r.status
		}))
		const ws = XLSX.utils.json_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Inventario")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportProfitability(rows: ProfitabilityRow[], filename = "rentabilidad") {
		const data = rows.map((r) => ({
			Producto: r.productName,
			Laboratorio: r.manufacturer,
			Lote: r.lotNumber,
			Stock: r.stock,
			"P. Compra (S/.)": r.purchasePrice.toFixed(2),
			"P. Venta (S/.)": r.sellPrice.toFixed(2),
			"Margen (S/.)": r.margin.toFixed(2),
			"Margen (%)": r.marginPercent.toFixed(1) + "%",
			"Ganancia potencial (S/.)": r.potentialProfit.toFixed(2)
		}))
		const ws = XLSX.utils.json_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Rentabilidad")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	},

	exportCredits(rows: CreditReportRow[], filename = "creditos") {
		const data = rows.map((r) => ({
			Cliente: r.clientName,
			Documento: r.documentNumber,
			Tipo: r.type === "debt" ? "Deuda" : "Favor",
			"Total (S/.)": r.totalAmount.toFixed(2),
			"Pagado (S/.)": r.paidAmount.toFixed(2),
			"Saldo (S/.)": r.balance.toFixed(2),
			Estado: r.status,
			"Fecha límite": r.dueDate,
			"Días vencido": r.daysOverdue ?? "-"
		}))
		const ws = XLSX.utils.json_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "Créditos")
		XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`)
	}
}
