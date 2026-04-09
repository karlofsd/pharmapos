import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import {
	Sale,
	Lot,
	Product,
	Credit,
	Movement,
	ReportsFilters,
	SalesReportRow,
	KardexRow,
	InventoryRow,
	CreditReportRow,
	ProfitabilityRow
} from "@renderer/types"

export const ReportService = {
	async getSalesReport(filters: ReportsFilters = {}): Promise<SalesReportRow[]> {
		const q = query(collection(db!, "sales"), orderBy("createdAt", "desc"))
		const snapshot = await getDocs(q)

		let sales = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Sale)

		if (filters.dateFrom) {
			sales = sales.filter((s) => s.createdAt.toDate() >= filters.dateFrom!)
		}
		if (filters.dateTo) {
			const to = new Date(filters.dateTo)
			to.setHours(23, 59, 59)
			sales = sales.filter((s) => s.createdAt.toDate() <= to)
		}
		if (filters.cashierId) {
			sales = sales.filter((s) => s.cashierId === filters.cashierId)
		}

		return sales.map((s) => ({
			date: s.createdAt.toDate().toLocaleDateString("es-PE"),
			saleId: s.id.slice(-8).toUpperCase(),
			cashierId: s.cashierId,
			paymentMethod: s.paymentMethod,
			voucherType: s.voucherType,
			items: s.items.length,
			total: s.totalPrice,
			status: s.status
		}))
	},

	async getSalesByPayment(filters: ReportsFilters = {}): Promise<Record<string, number>> {
		const snapshot = await getDocs(
			query(collection(db!, "sales"), orderBy("createdAt", "desc"))
		)
		let sales = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Sale)

		if (filters.dateFrom) {
			sales = sales.filter((s) => s.createdAt.toDate() >= filters.dateFrom!)
		}
		if (filters.dateTo) {
			const to = new Date(filters.dateTo)
			to.setHours(23, 59, 59)
			sales = sales.filter((s) => s.createdAt.toDate() <= to)
		}
		sales = sales.filter((s) => s.status !== "cancelled")

		const result: Record<string, number> = {
			cash: 0,
			card: 0,
			credit: 0,
			wallet: 0,
			mixed: 0
		}
		sales.forEach((s) => {
			result[s.paymentMethod] = (result[s.paymentMethod] ?? 0) + s.totalPrice
		})
		return result
	},

	async getSalesByCashier(
		filters: ReportsFilters = {}
	): Promise<Record<string, { total: number; transactions: number }>> {
		const snapshot = await getDocs(
			query(collection(db!, "sales"), orderBy("createdAt", "desc"))
		)
		let sales = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Sale)

		if (filters.dateFrom) {
			sales = sales.filter((s) => s.createdAt.toDate() >= filters.dateFrom!)
		}
		if (filters.dateTo) {
			const to = new Date(filters.dateTo)
			to.setHours(23, 59, 59)
			sales = sales.filter((s) => s.createdAt.toDate() <= to)
		}
		sales = sales.filter((s) => s.status !== "cancelled")

		const result: Record<string, { total: number; transactions: number }> = {}
		sales.forEach((s) => {
			if (!result[s.cashierId]) {
				result[s.cashierId] = { total: 0, transactions: 0 }
			}
			result[s.cashierId].total += s.totalPrice
			result[s.cashierId].transactions += 1
		})
		return result
	},

	async getKardex(filters: ReportsFilters = {}): Promise<KardexRow[]> {
		const q = query(collection(db!, "movements"), orderBy("createdAt", "desc"))
		const snapshot = await getDocs(q)

		let movements = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Movement)

		if (filters.dateFrom) {
			movements = movements.filter((m) => m.createdAt.toDate() >= filters.dateFrom!)
		}
		if (filters.dateTo) {
			const to = new Date(filters.dateTo)
			to.setHours(23, 59, 59)
			movements = movements.filter((m) => m.createdAt.toDate() <= to)
		}
		if (filters.productId) {
			movements = movements.filter((m) => m.productId === filters.productId)
		}

		// Enriquecer con nombres de productos y lotes
		const [productsSnap, lotsSnap] = await Promise.all([
			getDocs(collection(db!, "products")),
			getDocs(collection(db!, "lots"))
		])

		const productMap = new Map(productsSnap.docs.map((d) => [d.id, d.data().brand as string]))
		const lotMap = new Map(lotsSnap.docs.map((d) => [d.id, d.data().numberLot as string]))

		return movements.map<KardexRow>((m) => ({
			date:
				m.createdAt.toDate().toLocaleDateString("es-PE") +
				" " +
				m.createdAt
					.toDate()
					.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
			type: m.type,
			productName: productMap.get(m.productId) ?? "Desconocido",
			lotNumber: lotMap.get(m.lotId) ?? "Desconocido",
			quantity: m.quantity,
			previousStock: m.previousStock,
			newStock: m.newStock,
			reason: m.reason ?? "",
			userId: m.userId
		}))
	},

	async getInventoryReport(): Promise<InventoryRow[]> {
		const [lotsSnap, productsSnap] = await Promise.all([
			getDocs(query(collection(db!, "lots"), where("isActive", "==", true))),
			getDocs(collection(db!, "products"))
		])

		const productMap = new Map(
			productsSnap.docs
				.map((d) => ({ id: d.id, ...d.data() }) as Product)
				.map((p) => [p.id, p])
		)

		const now = new Date()
		const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

		return lotsSnap.docs
			.map((d) => {
				const lot = { id: d.id, ...d.data() } as Lot
				const product = productMap.get(lot.productId)
				const expDate = lot.expirationDate.toDate()
				const daysUntilExpiry = Math.ceil(
					(expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
				)

				let status = "ok"
				if (expDate < now) status = "vencido"
				else if (expDate <= in30Days) status = "por vencer"
				else if (lot.stock === 0) status = "agotado"
				else if (product && lot.stock <= product.minStock) status = "stock bajo"

				return {
					productName: product?.brand ?? "Desconocido",
					manufacturer: lot.manufacturer,
					lotNumber: lot.numberLot,
					stock: lot.stock,
					minStock: product?.minStock ?? 0,
					purchasePrice: lot.purchasePrice,
					sellPrice: lot.sellPrice,
					expirationDate: expDate.toLocaleDateString("es-PE"),
					status,
					daysUntilExpiry: daysUntilExpiry > 0 ? daysUntilExpiry : null
				}
			})
			.sort((a, b) => a.productName.localeCompare(b.productName))
	},

	async getExpiringReport(days = 30): Promise<InventoryRow[]> {
		const all = await ReportService.getInventoryReport()
		return all
			.filter((r) => {
				return r.daysUntilExpiry !== null && r.daysUntilExpiry <= days
			})
			.sort((a, b) => (a.daysUntilExpiry ?? 0) - (b.daysUntilExpiry ?? 0))
	},

	async getLowStockReport(): Promise<InventoryRow[]> {
		const all = await ReportService.getInventoryReport()
		return all.filter((r) => r.stock <= r.minStock).sort((a, b) => a.stock - b.stock)
	},

	async getProfitabilityReport(): Promise<ProfitabilityRow[]> {
		const inventory = await ReportService.getInventoryReport()
		return inventory
			.map((r) => {
				const margin = r.sellPrice - r.purchasePrice
				const marginPercent = r.purchasePrice > 0 ? (margin / r.purchasePrice) * 100 : 0
				const potentialProfit = margin * r.stock
				return {
					productName: r.productName,
					manufacturer: r.manufacturer,
					lotNumber: r.lotNumber,
					stock: r.stock,
					purchasePrice: r.purchasePrice,
					sellPrice: r.sellPrice,
					margin,
					marginPercent,
					potentialProfit
				}
			})
			.sort((a, b) => b.marginPercent - a.marginPercent)
	},

	async getCreditsReport(): Promise<CreditReportRow[]> {
		const snapshot = await getDocs(query(collection(db!, "credits"), orderBy("dueDate", "asc")))

		const now = new Date()

		return snapshot.docs.map((d) => {
			const credit = { id: d.id, ...d.data() } as Credit
			const dueDate = credit.dueDate.toDate()
			const daysOverdue =
				credit.status === "overdue"
					? Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
					: null

			return {
				clientName: credit.clientName,
				documentNumber: credit.clientId,
				type: credit.type,
				totalAmount: credit.totalAmount,
				paidAmount: credit.paidAmount,
				balance: credit.balance,
				status: credit.status,
				dueDate: dueDate.toLocaleDateString("es-PE"),
				daysOverdue
			}
		})
	}
}
