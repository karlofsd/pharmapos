import { useState } from "react"
import { Search, Download, Filter, X } from "lucide-react"
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

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@renderer/components/ui/table"
import { useMovements } from "@renderer/hooks/useMovements"
import { ExportService } from "@renderer/services/exportService"

const TYPE_CONFIG: Record<string, { label: string; className: string }> = {
	entry: { label: "Entrada", className: "bg-green-100 text-green-700 border-green-200" },
	sale: { label: "Venta", className: "bg-blue-100 text-blue-700 border-blue-200" },
	adjustment: { label: "Ajuste", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	return: { label: "Devolución", className: "bg-purple-100 text-purple-700 border-purple-200" },
	sale_reversal: { label: "Reversión", className: "bg-red-100 text-red-700 border-red-200" },
	favor_credit: { label: "Crédito favor", className: "bg-teal-100 text-teal-700 border-teal-200" }
}

export default function MovementsPage(): React.ReactElement {
	const { movements, products, selected, isLoading, error, selectMovement, setFilters } =
		useMovements()

	const [dateFrom, setDateFrom] = useState("")
	const [dateTo, setDateTo] = useState("")
	const [typeFilter, setTypeFilter] = useState("all")
	const [productFilter, setProductFilter] = useState("all")
	const [search, setSearch] = useState("")

	const filtered = movements.filter((m) => {
		if (!search.trim()) return true
		const term = search.toLowerCase()
		return (
			(m.productName ?? "").toLowerCase().includes(term) ||
			m.reason?.toLowerCase().includes(term)
		)
	})

	function handleApplyFilters(): void {
		setFilters({
			dateFrom: dateFrom ? new Date(dateFrom) : undefined,
			dateTo: dateTo ? new Date(dateTo) : undefined,
			type: typeFilter !== "all" ? typeFilter : undefined,
			productId: productFilter !== "all" ? productFilter : undefined
		})
	}

	return (
		<div className="flex h-full">
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Movimientos</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} {filtered.length === 1 ? "movimiento" : "movimientos"}
						</p>
					</div>
					<Button
						variant="outline"
						onClick={() => ExportService.exportMovements(filtered)}
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
							placeholder="Buscar por producto o motivo..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="flex items-end gap-2 flex-wrap">
						<div className="flex flex-col gap-1">
							<label className="text-xs text-slate-500">Desde</label>
							<Input
								type="date"
								value={dateFrom}
								onChange={(e) => setDateFrom(e.target.value)}
								className="w-40"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-xs text-slate-500">Hasta</label>
							<Input
								type="date"
								value={dateTo}
								onChange={(e) => setDateTo(e.target.value)}
								className="w-40"
							/>
						</div>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Tipo..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								<SelectItem value="entry">Entrada</SelectItem>
								<SelectItem value="sale">Venta</SelectItem>
								<SelectItem value="adjustment">Ajuste</SelectItem>
								<SelectItem value="return">Devolución</SelectItem>
								<SelectItem value="sale_reversal">Reversión</SelectItem>
							</SelectContent>
						</Select>
						<Select value={productFilter} onValueChange={setProductFilter}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Producto..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos los productos</SelectItem>
								{products.map((p) => (
									<SelectItem key={p.id} value={p.id}>
										{p.brand}
									</SelectItem>
								))}
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
						<p className="text-slate-400">Cargando movimientos...</p>
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
									<TableHead>Fecha</TableHead>
									<TableHead>Tipo</TableHead>
									<TableHead>Producto</TableHead>
									<TableHead className="text-right">Cantidad</TableHead>
									<TableHead className="text-right">Stock ant.</TableHead>
									<TableHead className="text-right">Stock nuevo</TableHead>
									<TableHead>Motivo</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={7}
											className="text-center text-slate-400 py-12"
										>
											No se encontraron movimientos
										</TableCell>
									</TableRow>
								) : (
									filtered.map((movement) => {
										const typeConfig = TYPE_CONFIG[movement.type] ?? {
											label: movement.type,
											className: "bg-slate-100 text-slate-700"
										}
										const isNegative = movement.quantity < 0

										return (
											<TableRow
												key={movement.id}
												className="hover:bg-slate-50 cursor-pointer"
												onClick={() => selectMovement(movement)}
											>
												<TableCell className="text-sm text-slate-600">
													{movement.createdAt
														.toDate()
														.toLocaleDateString("es-PE")}{" "}
													<span className="text-slate-400">
														{movement.createdAt
															.toDate()
															.toLocaleTimeString("es-PE", {
																hour: "2-digit",
																minute: "2-digit"
															})}
													</span>
												</TableCell>
												<TableCell>
													<Badge
														variant="outline"
														className={`text-xs ${typeConfig.className}`}
													>
														{typeConfig.label}
													</Badge>
												</TableCell>
												<TableCell className="text-sm font-medium text-slate-800">
													{movement.productName}
												</TableCell>
												<TableCell
													className={`text-right font-bold text-sm
													${isNegative ? "text-red-600" : "text-green-600"}`}
												>
													{isNegative ? "" : "+"}
													{movement.quantity}
												</TableCell>
												<TableCell className="text-right text-sm text-slate-600">
													{movement.previousStock}
												</TableCell>
												<TableCell className="text-right text-sm text-slate-800 font-medium">
													{movement.newStock}
												</TableCell>
												<TableCell className="text-sm text-slate-500 max-w-xs truncate">
													{movement.reason}
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

			{/* Panel derecho — detalle del movimiento */}
			{selected && (
				<div className="w-80 shrink-0 border-l border-slate-200 bg-white p-4 flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h2 className="font-bold text-slate-800">Detalle</h2>
						<button
							onClick={() => selectMovement(selected)}
							className="text-slate-400 hover:text-slate-600"
						>
							<X size={18} />
						</button>
					</div>
					<div className="flex flex-col gap-3">
						{[
							{ label: "ID", value: selected.id.slice(-8).toUpperCase() },
							{
								label: "Tipo",
								value: TYPE_CONFIG[selected.type]?.label ?? selected.type
							},
							{ label: "Producto", value: selected.productName },
							{
								label: "Cantidad",
								value: `${selected.quantity > 0 ? "+" : ""}${selected.quantity}`
							},
							{ label: "Stock anterior", value: selected.previousStock },
							{ label: "Stock nuevo", value: selected.newStock },
							{ label: "Motivo", value: selected.reason },
							{ label: "Usuario", value: selected.userId }
						].map(({ label, value }) => (
							<div key={label} className="flex flex-col gap-0.5">
								<p className="text-xs text-slate-400 uppercase tracking-wide">
									{label}
								</p>
								<p className="text-sm text-slate-800 font-medium">{value}</p>
							</div>
						))}
						{selected.originalPrice !== null && (
							<div className="flex flex-col gap-0.5">
								<p className="text-xs text-slate-400 uppercase tracking-wide">
									Precio original
								</p>
								<p className="text-sm text-slate-800">
									S/. {selected.originalPrice?.toFixed(2)}
								</p>
							</div>
						)}
						{selected.alterPrice !== null && (
							<div className="flex flex-col gap-0.5">
								<p className="text-xs text-slate-400 uppercase tracking-wide">
									Precio modificado
								</p>
								<p className="text-sm text-blue-600 font-medium">
									S/. {selected.alterPrice?.toFixed(2)}
								</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
