import React, { useEffect, useState } from "react"
import {
	Filter, RefreshCw, ArrowUpDown,
	ArrowUp, ArrowDown, Eye, RotateCw
} from "lucide-react"
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
import { useReceipts, SortField, SortOrder } from "@renderer/hooks/useReceipts"
import { useUIStore } from "@renderer/store/uiStore"
import { Receipt, SunatStatus } from "shared/types/receipt.type"
import { ReceiptPreview } from "./components/ReceiptPreview"
import { cn } from "@renderer/lib/utils"
import { VoucherType } from "@renderer/types"

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	ACEPTADO: { label: "Aceptado", className: "bg-green-100 text-green-700 border-green-200" },
	PENDIENTE: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	RECHAZADO: { label: "Rechazado", className: "bg-red-100 text-red-700 border-red-200" },
	ANULADO: { label: "Anulado", className: "bg-slate-100 text-slate-500 border-slate-200" },
	PENDING: { label: "Por enviar", className: "bg-orange-100 text-orange-700 border-orange-200" },
	ERROR: { label: "Error", className: "bg-red-100 text-red-700 border-red-200" }
}

const VOUCHER_CONFIG: Record<string, { label: string; className: string }> = {
	boleta: { label: "Boleta", className: "bg-blue-100 text-blue-700 border-blue-200" },
	factura: { label: "Factura", className: "bg-purple-100 text-purple-700 border-purple-200" }
}

function SortIcon({ field, current, order }: {
	field: SortField
	current: SortField
	order: "asc" | "desc"
}): React.ReactElement {
	if (field !== current) return <ArrowUpDown size={12} className="text-slate-300" />
	return order === "asc"
		? <ArrowUp size={12} className="text-slate-600" />
		: <ArrowDown size={12} className="text-slate-600" />
}

function SortableHead({ field, sortField, order, label, onSort }: { field: SortField; sortField: SortField, order: SortOrder, label: string, onSort: (field: SortField) => void }): React.ReactElement {
	return (
		<TableHead
			className="cursor-pointer select-none hover:text-slate-800 transition-colors"
			onClick={() => onSort(field)}
		>
			<div className="flex items-center gap-1">
				{label}
				<SortIcon field={field} current={sortField} order={order} />
			</div>
		</TableHead>
	)
}

export default function DocumentsPage(): React.ReactElement {
	const {
		receipts,
		isLoading,
		error,
		page,
		totalPages,
		sortField,
		sortOrder,
		filters,
		updatingId,
		load,
		updateStatus,
		setSort,
		setPage,
		setFilters
	} = useReceipts()

	const { setSidebarCollapsed } = useUIStore()
	const [selected, setSelected] = useState<Receipt | null>(null)
	const [dateFrom, setDateFrom] = useState("")
	const [dateTo, setDateTo] = useState("")
	const [voucherType, setVoucherType] = useState("all")
	const [sunatStatus, setSunatStatus] = useState("all")

	useEffect(() => {
		load()
	}, [load])

	function handleSelect(receipt: Receipt): void {
		setSelected(receipt)
		setSidebarCollapsed(true)
	}

	function handleClose(): void {
		setSelected(null)
		setSidebarCollapsed(false)
	}

	function handleApplyFilters(): void {
		setFilters({
			dateFrom: dateFrom ? new Date(dateFrom) : undefined,
			dateTo: dateTo ? new Date(dateTo) : undefined,
			voucherType: voucherType as VoucherType | "all",
			sunatStatus: sunatStatus as SunatStatus | "all"
		})
	}

	return (
		<div className="flex h-full">
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Documentos</h1>
						<p className="text-sm text-slate-500">Boletas y facturas electrónicas</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => load(filters, sortField, sortOrder, page)}
						disabled={isLoading}
					>
						<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
						Actualizar
					</Button>
				</div>

				{/* Filtros */}
				<div className="flex flex-wrap items-end gap-3">
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
					<Select value={voucherType} onValueChange={setVoucherType}>
						<SelectTrigger className="w-40">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos los tipos</SelectItem>
							<SelectItem value="boleta">Boleta</SelectItem>
							<SelectItem value="factura">Factura</SelectItem>
						</SelectContent>
					</Select>
					<Select value={sunatStatus} onValueChange={setSunatStatus}>
						<SelectTrigger className="w-40">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos los estados</SelectItem>
							<SelectItem value="ACEPTADO">Aceptado</SelectItem>
							<SelectItem value="PENDIENTE">Pendiente</SelectItem>
							<SelectItem value="RECHAZADO">Rechazado</SelectItem>
							<SelectItem value="ANULADO">Anulado</SelectItem>
							<SelectItem value="PENDING">Por enviar</SelectItem>
							<SelectItem value="ERROR">Error</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" onClick={handleApplyFilters}>
						<Filter size={14} />
						Filtrar
					</Button>
				</div>

				{/* Tabla */}
				{error ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : (
					<div className="flex-1 flex flex-col gap-3 overflow-hidden">
						<div className="flex-1 overflow-auto rounded-lg border border-slate-200">
							<Table>
								<TableHeader>
									<TableRow className="bg-slate-50">
										<SortableHead field="date" label="Nº Serie / Fecha" sortField={sortField} order={sortOrder} onSort={setSort} />
										<SortableHead field="voucherType" label="Tipo" sortField={sortField} order={sortOrder} onSort={setSort} />
										<TableHead>Cliente</TableHead>
										<SortableHead field="totalPrice" label="Total" sortField={sortField} order={sortOrder} onSort={setSort} />
										<SortableHead field="sunatStatus" label="Estado SUNAT" sortField={sortField} order={sortOrder} onSort={setSort} />
										<TableHead className="text-right">Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{isLoading ? (
										<TableRow>
											<TableCell colSpan={6} className="text-center text-slate-400 py-12">
												<div className="flex items-center justify-center gap-2">
													<RefreshCw size={14} className="animate-spin" />
													Cargando...
												</div>
											</TableCell>
										</TableRow>
									) : receipts.length === 0 ? (
										<TableRow>
											<TableCell colSpan={6} className="text-center text-slate-400 py-12">
												No se encontraron comprobantes
											</TableCell>
										</TableRow>
									) : (
										receipts.map((receipt) => {
											const statusConfig = STATUS_CONFIG[receipt.sunatStatus] ?? STATUS_CONFIG.PENDING
											const voucherConfig = VOUCHER_CONFIG[receipt.voucherType]
											const isUpdating = updatingId === receipt.id

											return (
												<TableRow
													key={receipt.id}
													className={cn(
														"hover:bg-slate-50 cursor-pointer",
														selected?.id === receipt.id && "bg-blue-50"
													)}
													onClick={() => handleSelect(receipt)}
												>
													<TableCell>
														<p className="font-mono text-sm font-medium text-slate-800">
															{receipt.serialCode}
														</p>
														<p className="text-xs text-slate-400">
															{receipt.date} {receipt.hour?.slice(0, 5)}
														</p>
													</TableCell>
													<TableCell>
														<Badge
															variant="outline"
															className={`text-xs ${voucherConfig?.className ?? ""} capitalize`}
														>
															{voucherConfig?.label ?? receipt.voucherType}
														</Badge>
													</TableCell>
													<TableCell>
														<p className="text-sm text-slate-800 truncate max-w-36">
															{receipt.clientName}
														</p>
														{receipt.clientDocument && (
															<p className="text-xs text-slate-400">
																{receipt.clientDocumentType}: {receipt.clientDocument}
															</p>
														)}
													</TableCell>
													<TableCell className="font-bold text-slate-800">
														S/. {receipt.totalPrice.toFixed(2)}
													</TableCell>
													<TableCell>
														<Badge
															variant="outline"
															className={`text-xs ${statusConfig.className}`}
														>
															{statusConfig.label}
														</Badge>
													</TableCell>
													<TableCell>
														<div
															className="flex items-center justify-end gap-1"
															onClick={(e) => e.stopPropagation()}
														>
															{/* Actualizar estado */}
															<Button
																size="icon"
																variant="ghost"
																className="h-7 w-7"
																title="Actualizar estado SUNAT"
																disabled={isUpdating}
																onClick={() => updateStatus(receipt)}
															>
																<RotateCw
																	size={13}
																	className={isUpdating ? "animate-spin" : ""}
																/>
															</Button>
															{/* Preview */}
															<Button
																size="icon"
																variant="ghost"
																className="h-7 w-7"
																title="Ver comprobante"
																onClick={() => handleSelect(receipt)}
															>
																<Eye size={13} />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											)
										})
									)}
								</TableBody>
							</Table>
						</div>

						{/* Paginación */}
						{totalPages > 1 && (
							<div className="flex items-center justify-between shrink-0">
								<p className="text-xs text-slate-400">
									Página {page} de {totalPages}
								</p>
								<div className="flex items-center gap-1">
									<Button
										size="sm"
										variant="outline"
										onClick={() => setPage(page - 1)}
										disabled={page === 1}
									>
										Anterior
									</Button>
									{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
										const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
										return (
											<Button
												key={p}
												size="sm"
												variant={p === page ? "default" : "outline"}
												onClick={() => setPage(p)}
												className="w-8"
											>
												{p}
											</Button>
										)
									})}
									<Button
										size="sm"
										variant="outline"
										onClick={() => setPage(page + 1)}
										disabled={page === totalPages}
									>
										Siguiente
									</Button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Panel derecho */}
			{selected && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					<ReceiptPreview receipt={selected} onClose={handleClose} />
				</div>
			)}
		</div>
	)
}