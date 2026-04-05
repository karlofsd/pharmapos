import { useState } from "react"
import { Download, Filter, RefreshCw } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Badge } from "@renderer/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@renderer/components/ui/tabs"
import { ReportTable, Column } from "./components/ReportsTable"
import { ReportService } from "@renderer/services/reportService"
import {
	SalesReportRow,
	KardexRow,
	InventoryRow,
	ProfitabilityRow,
	CreditReportRow
} from "@renderer/types"
import { ExportService } from "@renderer/services/exportService"
import { useProducts } from "@renderer/hooks/useProducts"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { cn } from "@renderer/lib/utils"

const PAYMENT_LABELS: Record<string, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	credit: "Crédito",
	wallet: "Saldo favor",
	mixed: "Mixto"
}

const TYPE_LABELS: Record<string, string> = {
	entry: "Entrada",
	sale: "Venta",
	adjustment: "Ajuste",
	return: "Devolución",
	sale_reversal: "Reversión",
	favor_credit: "Crédito favor"
}

const STATUS_COLORS: Record<string, string> = {
	ok: "bg-green-100 text-green-700 border-green-200",
	"stock bajo": "bg-yellow-100 text-yellow-700 border-yellow-200",
	agotado: "bg-red-100 text-red-700 border-red-200",
	"por vencer": "bg-orange-100 text-orange-700 border-orange-200",
	vencido: "bg-red-100 text-red-700 border-red-200"
}

export default function ReportsPage(): React.ReactElement {
	const { products } = useProducts()
	const [isLoading, setIsLoading] = useState(false)
	const [dateFrom, setDateFrom] = useState("")
	const [dateTo, setDateTo] = useState("")
	const [productFilter, setProductFilter] = useState("all")
	const [expiringDays, setExpiringDays] = useState("30")

	// Data states
	const [salesData, setSalesData] = useState<SalesReportRow[]>([])
	const [paymentData, setPaymentData] = useState<Record<string, number>>({})
	const [cashierData, setCashierData] = useState<
		Record<string, { total: number; transactions: number }>
	>({})
	const [kardexData, setKardexData] = useState<KardexRow[]>([])
	const [inventoryData, setInventoryData] = useState<InventoryRow[]>([])
	const [expiringData, setExpiringData] = useState<InventoryRow[]>([])
	const [lowStockData, setLowStockData] = useState<InventoryRow[]>([])
	const [profitData, setProfitData] = useState<ProfitabilityRow[]>([])
	const [creditsData, setCreditsData] = useState<CreditReportRow[]>([])
	const [activeTab, setActiveTab] = useState("sales")

	const filters = {
		dateFrom: dateFrom ? new Date(dateFrom) : undefined,
		dateTo: dateTo ? new Date(dateTo) : undefined,
		productId: productFilter !== "all" ? productFilter : undefined
	}

	async function loadReport(tab: string): Promise<void> {
		setIsLoading(true)
		try {
			switch (tab) {
				case "sales":
					setSalesData(await ReportService.getSalesReport(filters))
					break
				case "payment":
					setPaymentData(await ReportService.getSalesByPayment(filters))
					break
				case "cashier":
					setCashierData(await ReportService.getSalesByCashier(filters))
					break
				case "kardex":
					setKardexData(await ReportService.getKardex(filters))
					break
				case "inventory":
					setInventoryData(await ReportService.getInventoryReport())
					break
				case "expiring":
					setExpiringData(await ReportService.getExpiringReport(parseInt(expiringDays)))
					break
				case "lowstock":
					setLowStockData(await ReportService.getLowStockReport())
					break
				case "profitability":
					setProfitData(await ReportService.getProfitabilityReport())
					break
				case "credits":
					setCreditsData(await ReportService.getCreditsReport())
					break
			}
		} finally {
			setIsLoading(false)
		}
	}

	function handleTabChange(tab: string): void {
		setActiveTab(tab)
		loadReport(tab)
	}

	// Columnas por reporte
	const salesColumns: Column<SalesReportRow>[] = [
		{ key: "date", label: "Fecha" },
		{
			key: "saleId",
			label: "ID",
			render: (r) => <span className="font-mono">#{r.saleId}</span>
		},
		{ key: "cashierId", label: "Cajero" },
		{
			key: "paymentMethod",
			label: "Método",
			render: (r) => PAYMENT_LABELS[r.paymentMethod] ?? r.paymentMethod
		},
		{
			key: "voucherType",
			label: "Comprobante",
			render: (r) => <span className="capitalize">{r.voucherType}</span>
		},
		{ key: "items", label: "Ítems", align: "right" },
		{
			key: "total",
			label: "Total",
			align: "right",
			render: (r) => `S/. ${r.total.toFixed(2)}`
		},
		{
			key: "status",
			label: "Estado",
			render: (r) => (
				<Badge
					variant="outline"
					className={`text-xs ${r.status === "cancelled" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}
				>
					{r.status === "completed"
						? "Completada"
						: r.status === "cancelled"
							? "Anulada"
							: "Crédito"}
				</Badge>
			)
		}
	]

	const kardexColumns: Column<KardexRow>[] = [
		{ key: "date", label: "Fecha/Hora" },
		{
			key: "type",
			label: "Tipo",
			render: (r) => (
				<Badge variant="outline" className="text-xs">
					{TYPE_LABELS[r.type] ?? r.type}
				</Badge>
			)
		},
		{ key: "productName", label: "Producto" },
		{ key: "lotNumber", label: "Lote" },
		{
			key: "quantity",
			label: "Cantidad",
			align: "right",
			render: (r) => (
				<span
					className={
						r.quantity < 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"
					}
				>
					{r.quantity > 0 ? "+" : ""}
					{r.quantity}
				</span>
			)
		},
		{ key: "previousStock", label: "Stock ant.", align: "right" },
		{ key: "newStock", label: "Stock nuevo", align: "right" },
		{ key: "reason", label: "Motivo" }
	]

	const inventoryColumns: Column<InventoryRow>[] = [
		{ key: "productName", label: "Producto" },
		{ key: "manufacturer", label: "Laboratorio" },
		{ key: "lotNumber", label: "Lote" },
		{ key: "stock", label: "Stock", align: "right" },
		{ key: "minStock", label: "Mín.", align: "right" },
		{
			key: "purchasePrice",
			label: "P. Compra",
			align: "right",
			render: (r) => `S/. ${r.purchasePrice.toFixed(2)}`
		},
		{
			key: "sellPrice",
			label: "P. Venta",
			align: "right",
			render: (r) => `S/. ${r.sellPrice.toFixed(2)}`
		},
		{ key: "expirationDate", label: "Vencimiento" },
		{
			key: "status",
			label: "Estado",
			render: (r) => (
				<Badge variant="outline" className={`text-xs ${STATUS_COLORS[r.status] ?? ""}`}>
					{r.status}
				</Badge>
			)
		}
	]

	const expiringColumns: Column<InventoryRow>[] = [
		{ key: "productName", label: "Producto" },
		{ key: "lotNumber", label: "Lote" },
		{ key: "stock", label: "Stock", align: "right" },
		{ key: "expirationDate", label: "Vencimiento" },
		{
			key: "daysUntilExpiry",
			label: "Días restantes",
			align: "right",
			render: (r) => (
				<span
					className={`font-bold ${(r.daysUntilExpiry ?? 0) <= 7 ? "text-red-600" : "text-orange-600"}`}
				>
					{r.daysUntilExpiry ?? "Vencido"}
				</span>
			)
		}
	]

	const profitColumns: Column<ProfitabilityRow>[] = [
		{ key: "productName", label: "Producto" },
		{ key: "manufacturer", label: "Laboratorio" },
		{ key: "stock", label: "Stock", align: "right" },
		{
			key: "purchasePrice",
			label: "P. Compra",
			align: "right",
			render: (r) => `S/. ${r.purchasePrice.toFixed(2)}`
		},
		{
			key: "sellPrice",
			label: "P. Venta",
			align: "right",
			render: (r) => `S/. ${r.sellPrice.toFixed(2)}`
		},
		{
			key: "margin",
			label: "Margen",
			align: "right",
			render: (r) => (
				<span
					className={
						r.margin >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
					}
				>
					S/. {r.margin.toFixed(2)}
				</span>
			)
		},
		{
			key: "marginPercent",
			label: "%",
			align: "right",
			render: (r) => `${r.marginPercent.toFixed(1)}%`
		},
		{
			key: "potentialProfit",
			label: "Gan. potencial",
			align: "right",
			render: (r) => (
				<span className="font-bold text-green-700">S/. {r.potentialProfit.toFixed(2)}</span>
			)
		}
	]

	const creditsColumns: Column<CreditReportRow>[] = [
		{ key: "clientName", label: "Cliente" },
		{ key: "type", label: "Tipo", render: (r) => (r.type === "debt" ? "Deuda" : "Favor") },
		{
			key: "totalAmount",
			label: "Total",
			align: "right",
			render: (r) => `S/. ${r.totalAmount.toFixed(2)}`
		},
		{
			key: "paidAmount",
			label: "Pagado",
			align: "right",
			render: (r) => `S/. ${r.paidAmount.toFixed(2)}`
		},
		{
			key: "balance",
			label: "Saldo",
			align: "right",
			render: (r) => (
				<span className="font-bold text-red-600">S/. {r.balance.toFixed(2)}</span>
			)
		},
		{ key: "dueDate", label: "Fecha límite" },
		{
			key: "daysOverdue",
			label: "Días vencido",
			align: "right",
			render: (r) =>
				r.daysOverdue ? (
					<span className="text-red-600 font-medium">{r.daysOverdue}d</span>
				) : (
					"-"
				)
		},
		{
			key: "status",
			label: "Estado",
			render: (r) => (
				<Badge
					variant="outline"
					className={`text-xs ${r.status === "overdue" ? "bg-red-50 text-red-600" : r.status === "paid" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
				>
					{r.status === "pending"
						? "Pendiente"
						: r.status === "paid"
							? "Pagado"
							: "Vencido"}
				</Badge>
			)
		}
	]

	// Filtros comunes
	function DateFilters(): React.ReactElement {
		return (
			<div className="flex items-end gap-3 flex-wrap">
				<div className="flex flex-col gap-1">
					<label className="text-xs text-slate-500">Desde</label>
					<Input
						type="date"
						value={dateFrom}
						onChange={(e) => setDateFrom(e.target.value)}
						className="w-36"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs text-slate-500">Hasta</label>
					<Input
						type="date"
						value={dateTo}
						onChange={(e) => setDateTo(e.target.value)}
						className="w-36"
					/>
				</div>
				<Button
					variant="outline"
					onClick={() => loadReport(activeTab)}
					disabled={isLoading}
				>
					<Filter size={14} />
					Aplicar
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => loadReport(activeTab)}
					disabled={isLoading}
				>
					<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
				</Button>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full p-6 gap-4">
			<div>
				<h1 className="text-xl font-bold text-slate-800">Reportes</h1>
				<p className="text-sm text-slate-500">Consulta y exporta información del sistema</p>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={handleTabChange}
				className="flex-1 flex flex-col"
			>
				<TabsList className="flex flex-wrap h-auto gap-1 justify-start bg-slate-100 p-1">
					<TabsTrigger value="sales">Ventas</TabsTrigger>
					<TabsTrigger value="payment">Por método pago</TabsTrigger>
					<TabsTrigger value="cashier">Por cajero</TabsTrigger>
					<TabsTrigger value="kardex">Kárdex</TabsTrigger>
					<TabsTrigger value="inventory">Inventario</TabsTrigger>
					<TabsTrigger value="expiring">Por vencer</TabsTrigger>
					<TabsTrigger value="lowstock">Stock bajo</TabsTrigger>
					<TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
					<TabsTrigger value="credits">Créditos</TabsTrigger>
				</TabsList>

				{/* Ventas por período */}
				<TabsContent
					value="sales"
					className={cn("flex-1 flex-col gap-4", activeTab == "sales" && "flex")}
				>
					<div className="flex items-center justify-between flex-wrap gap-3">
						<DateFilters />
						<Button
							variant="outline"
							onClick={() => ExportService.exportSalesReport(salesData)}
							disabled={salesData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					{salesData.length > 0 && (
						<div className="flex gap-4 flex-wrap">
							<div className="bg-green-50 rounded-lg px-4 py-2">
								<p className="text-xs text-green-600">Total</p>
								<p className="font-bold text-green-800">
									S/.{" "}
									{salesData
										.filter((r) => r.status !== "cancelled")
										.reduce((s, r) => s + r.total, 0)
										.toFixed(2)}
								</p>
							</div>
							<div className="bg-slate-50 rounded-lg px-4 py-2">
								<p className="text-xs text-slate-500">Transacciones</p>
								<p className="font-bold text-slate-800">{salesData.length}</p>
							</div>
						</div>
					)}
					<ReportTable
						columns={salesColumns}
						data={salesData}
						emptyMessage="Aplica filtros y haz click en Aplicar"
					/>
				</TabsContent>

				{/* Ventas por método de pago */}
				<TabsContent
					value="payment"
					className={cn("flex-1 flex-col gap-4", activeTab == "payment" && "flex")}
				>
					<div className="flex items-center justify-between flex-wrap gap-3">
						<DateFilters />
					</div>
					{Object.keys(paymentData).length > 0 ? (
						<div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
							{Object.entries(paymentData).map(([method, total]) => (
								<div
									key={method}
									className="bg-white rounded-xl border border-slate-200 p-4"
								>
									<p className="text-sm text-slate-500">
										{PAYMENT_LABELS[method]}
									</p>
									<p className="text-xl font-bold text-slate-800 mt-1">
										S/. {total.toFixed(2)}
									</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-slate-400 text-center py-12">
							Aplica filtros y haz click en Aplicar
						</p>
					)}
				</TabsContent>

				{/* Ventas por cajero */}
				<TabsContent
					value="cashier"
					className={cn("flex-1 flex-col gap-4", activeTab == "cashier" && "flex")}
				>
					<div className="flex items-center justify-between flex-wrap gap-3">
						<DateFilters />
					</div>
					{Object.keys(cashierData).length > 0 ? (
						<div className="overflow-auto rounded-lg border border-slate-200">
							<table className="w-full text-sm">
								<thead className="bg-slate-50">
									<tr>
										<th className="text-left px-4 py-3 text-slate-600 font-medium">
											Cajero
										</th>
										<th className="text-right px-4 py-3 text-slate-600 font-medium">
											Transacciones
										</th>
										<th className="text-right px-4 py-3 text-slate-600 font-medium">
											Total
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100">
									{Object.entries(cashierData)
										.sort(([, a], [, b]) => b.total - a.total)
										.map(([cashierId, data]) => (
											<tr key={cashierId} className="hover:bg-slate-50">
												<td className="px-4 py-3 font-medium text-slate-800">
													{cashierId}
												</td>
												<td className="px-4 py-3 text-right text-slate-600">
													{data.transactions}
												</td>
												<td className="px-4 py-3 text-right font-bold text-slate-800">
													S/. {data.total.toFixed(2)}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="text-slate-400 text-center py-12">
							Aplica filtros y haz click en Aplicar
						</p>
					)}
				</TabsContent>

				{/* Kárdex */}
				<TabsContent
					value="kardex"
					className={cn("flex-1 flex-col gap-4", activeTab == "kardex" && "flex")}
				>
					<div className="flex items-center justify-between flex-wrap gap-3">
						<div className="flex items-end gap-3 flex-wrap">
							<DateFilters />
							<div className="flex flex-col gap-1">
								<label className="text-xs text-slate-500">Producto</label>
								<Select value={productFilter} onValueChange={setProductFilter}>
									<SelectTrigger className="w-48">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Todos</SelectItem>
										{products.map((p) => (
											<SelectItem key={p.id} value={p.id}>
												{p.brand}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<Button
							variant="outline"
							onClick={() => ExportService.exportKardex(kardexData)}
							disabled={kardexData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					<ReportTable
						columns={kardexColumns}
						data={kardexData}
						emptyMessage="Aplica filtros y haz click en Aplicar"
					/>
				</TabsContent>

				{/* Inventario actual */}
				<TabsContent
					value="inventory"
					className={cn("flex-1 flex-col gap-4", activeTab == "inventory" && "flex")}
				>
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							onClick={() => loadReport("inventory")}
							disabled={isLoading}
						>
							<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
							Actualizar
						</Button>
						<Button
							variant="outline"
							onClick={() => ExportService.exportInventory(inventoryData)}
							disabled={inventoryData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					<ReportTable
						columns={inventoryColumns}
						data={inventoryData}
						emptyMessage="Haz click en Actualizar"
					/>
				</TabsContent>

				{/* Por vencer */}
				<TabsContent
					value="expiring"
					className={cn("flex-1 flex-col gap-4", activeTab == "expiring" && "flex")}
				>
					<div className="flex items-center justify-between flex-wrap gap-3">
						<div className="flex items-end gap-3">
							<div className="flex flex-col gap-1">
								<label className="text-xs text-slate-500">Próximos (días)</label>
								<Select value={expiringDays} onValueChange={setExpiringDays}>
									<SelectTrigger className="w-28">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="7">7 días</SelectItem>
										<SelectItem value="15">15 días</SelectItem>
										<SelectItem value="30">30 días</SelectItem>
										<SelectItem value="60">60 días</SelectItem>
										<SelectItem value="90">90 días</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button
								variant="outline"
								onClick={() => loadReport("expiring")}
								disabled={isLoading}
							>
								<Filter size={14} />
								Aplicar
							</Button>
						</div>
						<Button
							variant="outline"
							onClick={() =>
								ExportService.exportInventory(expiringData, "por_vencer")
							}
							disabled={expiringData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					<ReportTable
						columns={expiringColumns}
						data={expiringData}
						emptyMessage="Haz click en Aplicar"
					/>
				</TabsContent>

				{/* Stock bajo */}
				<TabsContent
					value="lowstock"
					className={cn("flex-1 flex-col gap-4", activeTab == "lowstock" && "flex")}
				>
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							onClick={() => loadReport("lowstock")}
							disabled={isLoading}
						>
							<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
							Actualizar
						</Button>
						<Button
							variant="outline"
							onClick={() =>
								ExportService.exportInventory(lowStockData, "stock_bajo")
							}
							disabled={lowStockData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					<ReportTable
						columns={inventoryColumns.filter((c) => c.key !== "status")}
						data={lowStockData}
						emptyMessage="Haz click en Actualizar"
					/>
				</TabsContent>

				{/* Rentabilidad */}
				<TabsContent
					value="profitability"
					className={cn("flex-1 flex-col gap-4", activeTab == "profitability" && "flex")}
				>
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							onClick={() => loadReport("profitability")}
							disabled={isLoading}
						>
							<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
							Actualizar
						</Button>
						<Button
							variant="outline"
							onClick={() => ExportService.exportProfitability(profitData)}
							disabled={profitData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					{profitData.length > 0 && (
						<div className="flex gap-4 flex-wrap">
							<div className="bg-green-50 rounded-lg px-4 py-2">
								<p className="text-xs text-green-600">Ganancia potencial total</p>
								<p className="font-bold text-green-800">
									S/.{" "}
									{profitData
										.reduce((s, r) => s + r.potentialProfit, 0)
										.toFixed(2)}
								</p>
							</div>
							<div className="bg-slate-50 rounded-lg px-4 py-2">
								<p className="text-xs text-slate-500">Margen promedio</p>
								<p className="font-bold text-slate-800">
									{(
										profitData.reduce((s, r) => s + r.marginPercent, 0) /
										profitData.length
									).toFixed(1)}
									%
								</p>
							</div>
						</div>
					)}
					<ReportTable
						columns={profitColumns}
						data={profitData}
						emptyMessage="Haz click en Actualizar"
					/>
				</TabsContent>

				{/* Créditos */}
				<TabsContent
					value="credits"
					className={cn("flex-1 flex-col gap-4", activeTab == "credits" && "flex")}
				>
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							onClick={() => loadReport("credits")}
							disabled={isLoading}
						>
							<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
							Actualizar
						</Button>
						<Button
							variant="outline"
							onClick={() => ExportService.exportCredits(creditsData)}
							disabled={creditsData.length === 0}
						>
							<Download size={14} />
							Exportar Excel
						</Button>
					</div>
					{creditsData.length > 0 && (
						<div className="flex gap-4 flex-wrap">
							<div className="bg-red-50 rounded-lg px-4 py-2">
								<p className="text-xs text-red-600">Total por cobrar</p>
								<p className="font-bold text-red-800">
									S/.{" "}
									{creditsData
										.filter((r) => r.type === "debt")
										.reduce((s, r) => s + r.balance, 0)
										.toFixed(2)}
								</p>
							</div>
							<div className="bg-green-50 rounded-lg px-4 py-2">
								<p className="text-xs text-green-600">Total a favor clientes</p>
								<p className="font-bold text-green-800">
									S/.{" "}
									{creditsData
										.filter((r) => r.type === "favor")
										.reduce((s, r) => s + r.balance, 0)
										.toFixed(2)}
								</p>
							</div>
						</div>
					)}
					<ReportTable
						columns={creditsColumns}
						data={creditsData}
						emptyMessage="Haz click en Actualizar"
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
