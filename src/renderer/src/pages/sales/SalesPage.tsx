import { useState } from "react"
import { Search, Download, Filter } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Badge } from "@renderer/components/ui/badge"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@renderer/components/ui/table"
import { useSales } from "@renderer/hooks/useSales"
import { useAuth } from "@renderer/hooks/useAuth"
import { useUIStore } from "@renderer/store/uiStore"
import { ExportService } from "@renderer/services/exportService"
import { SaleDetail } from "./components/SaleDetail"
import { CancellationForm } from "./components/CancellationForm"
import { Sale } from "@renderer/types"

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	completed: { label: "Completada", className: "bg-green-100 text-green-700 border-green-200" },
	cancelled: { label: "Anulada", className: "bg-red-100 text-red-700 border-red-200" },
	credit: { label: "Crédito", className: "bg-yellow-100 text-yellow-700 border-yellow-200" }
}

const PAYMENT_LABELS: Record<string, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	credit: "Crédito",
	wallet: "Saldo favor",
	mixed: "Mixto"
}

export default function SalesPage(): React.ReactElement {
	const { user } = useAuth()
	const { sales, selected, isLoading, error, selectSale, setFilters, cancelSale } = useSales()
	const { setSidebarCollapsed } = useUIStore()

	const [showCancellation, setShowCancellation] = useState(false)
	const [dateFrom, setDateFrom] = useState("")
	const [dateTo, setDateTo] = useState("")
	const [statusFilter, setStatusFilter] = useState("all")
	const [search, setSearch] = useState("")

	const isAdmin = user?.role === "admin"

	const filtered = sales.filter((s) => {
		if (!search.trim()) return true
		const term = search.toLowerCase()
		return (
			s.id.toLowerCase().includes(term) ||
			s.items.some((i) => i.productName.toLowerCase().includes(term))
		)
	})

	function handleSelectSale(sale: Sale): void {
		selectSale(sale)
		setSidebarCollapsed(true)
	}

	function handleCloseSale(): void {
		selectSale(null)
		setSidebarCollapsed(false)
	}

	function handleApplyFilters(): void {
		setFilters({
			dateFrom: dateFrom ? new Date(dateFrom) : undefined,
			dateTo: dateTo ? new Date(dateTo) : undefined,
			status: statusFilter !== "all" ? statusFilter : undefined
		})
	}

	async function handleConfirmCancel(reason: string): Promise<void> {
		if (!selected) return
		await cancelSale(selected.id, reason)
		setShowCancellation(false)
	}

	return (
		<div className="flex h-full">
			{/* Lista */}
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Ventas</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} {filtered.length === 1 ? "venta" : "ventas"}
						</p>
					</div>
					<Button
						variant="outline"
						onClick={() => ExportService.exportSales(filtered)}
						disabled={filtered.length === 0}
					>
						<Download size={16} />
						Exportar Excel
					</Button>
				</div>

				{/* Filtros */}
				<div className="flex flex-wrap items-end gap-3">
					<div className="relative flex-1 min-w-48">
						<Search
							size={16}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
						/>
						<Input
							placeholder="Buscar por ID o producto..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="flex items-end gap-2">
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
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-36">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								<SelectItem value="completed">Completadas</SelectItem>
								<SelectItem value="cancelled">Anuladas</SelectItem>
								<SelectItem value="credit">Crédito</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" onClick={handleApplyFilters}>
							<Filter size={16} />
							Filtrar
						</Button>
					</div>
				</div>

				{/* Tabla */}
				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando ventas...</p>
					</div>
				) : error ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : (
					<div className="flex-1 overflow-auto rounded-lg border border-slate-200">
						<Table>
							<TableHeader>
								<TableRow className="bg-slate-50">
									<TableHead>ID</TableHead>
									<TableHead>Fecha</TableHead>
									<TableHead>Productos</TableHead>
									<TableHead>Comprobante</TableHead>
									<TableHead>Método</TableHead>
									<TableHead className="text-right">Total</TableHead>
									<TableHead>Estado</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={7}
											className="text-center text-slate-400 py-12"
										>
											No se encontraron ventas
										</TableCell>
									</TableRow>
								) : (
									filtered.map((sale) => {
										const statusConfig =
											STATUS_CONFIG[sale.status] ?? STATUS_CONFIG.completed
										return (
											<TableRow
												key={sale.id}
												className="hover:bg-slate-50 cursor-pointer"
												onClick={() => handleSelectSale(sale)}
											>
												<TableCell className="font-mono text-sm font-medium">
													#{sale.id.slice(-8).toUpperCase()}
												</TableCell>
												<TableCell className="text-sm text-slate-600">
													{sale.createdAt
														.toDate()
														.toLocaleDateString("es-PE")}{" "}
													<span className="text-slate-400">
														{sale.createdAt
															.toDate()
															.toLocaleTimeString("es-PE", {
																hour: "2-digit",
																minute: "2-digit"
															})}
													</span>
												</TableCell>
												<TableCell className="text-sm text-slate-600">
													{sale.items.length}{" "}
													{sale.items.length === 1 ? "ítem" : "ítems"}
												</TableCell>
												<TableCell className="text-sm capitalize text-slate-600">
													{sale.voucherType}
												</TableCell>
												<TableCell className="text-sm text-slate-600">
													{PAYMENT_LABELS[sale.paymentMethod]}
												</TableCell>
												<TableCell className="text-right font-bold text-slate-800">
													S/. {sale.totalPrice.toFixed(2)}
												</TableCell>
												<TableCell>
													<Badge
														variant="outline"
														className={`text-xs ${statusConfig.className}`}
													>
														{statusConfig.label}
													</Badge>
												</TableCell>
											</TableRow>
										)
									})
								)}
							</TableBody>
						</Table>
					</div>
				)}
			</div>

			{/* Panel derecho */}
			{selected && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					<SaleDetail
						sale={selected}
						isAdmin={isAdmin}
						onCancel={() => setShowCancellation(true)}
						onClose={handleCloseSale}
					/>
				</div>
			)}

			{/* Dialog anulación */}
			<Dialog
				open={showCancellation}
				onOpenChange={(open) => !open && setShowCancellation(false)}
			>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Anular venta</DialogTitle>
					</DialogHeader>
					{selected && (
						<CancellationForm
							sale={selected}
							onConfirm={handleConfirmCancel}
							onCancel={() => setShowCancellation(false)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
