import { useState } from "react"
import { Search, Plus, Pencil, SlidersHorizontal, Trash2, PackageMinus } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Badge } from "@renderer/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
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
import { useLots, LotWithProduct, getLotStatus } from "@renderer/hooks/useLots"
import { useAuth } from "@renderer/hooks/useAuth"
import { LotForm } from "./components/LotForm"
import { StockAdjustForm } from "./components/StockAdjustForm"
import { CreateLotDTO } from "@renderer/services/lotService"

type DialogType = "newLot" | "editPrice" | "adjust" | "none"

const STATUS_CONFIG = {
	ok: { label: "Ok", className: "bg-green-100 text-green-700 border-green-200" },
	low: { label: "Stock bajo", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	empty: { label: "Agotado", className: "bg-red-100 text-red-700 border-red-200" },
	expired: { label: "Vencido", className: "bg-red-100 text-red-700 border-red-200" },
	expiring: { label: "Por vencer", className: "bg-orange-100 text-orange-700 border-orange-200" }
}

export default function InventoryPage(): React.ReactElement {
	const { user } = useAuth()
	const {
		filtered,
		isLoading,
		error,
		searchTerm,
		statusFilter,
		setSearchTerm,
		setStatusFilter,
		createLot,
		updatePrice,
		adjustStock,
		deactivateLot
	} = useLots()

	const [dialog, setDialog] = useState<DialogType>("none")
	const [selectedLot, setSelectedLot] = useState<LotWithProduct | null>(null)
	const [editPrice, setEditPrice] = useState("")

	const isAdmin = user?.role === "admin"

	function openAdjust(lot: LotWithProduct): void {
		setSelectedLot(lot)
		setDialog("adjust")
	}

	function openEditPrice(lot: LotWithProduct): void {
		setSelectedLot(lot)
		setEditPrice(lot.sellPrice.toString())
		setDialog("editPrice")
	}

	function closeDialog(): void {
		setDialog("none")
		setSelectedLot(null)
		setEditPrice("")
	}

	async function handleCreateLot(data: CreateLotDTO): Promise<void> {
		await createLot(data)
		closeDialog()
	}

	async function handleUpdatePrice(): Promise<void> {
		if (!selectedLot) return
		const price = parseFloat(editPrice)
		if (isNaN(price) || price < 0) return
		await updatePrice(selectedLot.id, price)
		closeDialog()
	}

	async function handleAdjust(quantity: number, reason: string): Promise<void> {
		if (!selectedLot) return
		await adjustStock(selectedLot.id, quantity, reason)
		closeDialog()
	}

	return (
		<div className="flex flex-col h-full p-6 gap-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-bold text-slate-800">Inventario</h1>
					<p className="text-sm text-slate-500">
						{filtered.length}{" "}
						{filtered.length === 1 ? "lote encontrado" : "lotes encontrados"}
					</p>
				</div>
				{isAdmin && (
					<Button onClick={() => setDialog("newLot")}>
						<Plus size={16} />
						Nuevo lote
					</Button>
				)}
			</div>

			{/* Filtros */}
			<div className="flex items-center gap-3">
				<div className="relative flex-1 max-w-sm">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
					/>
					<Input
						placeholder="Buscar producto, lote..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-9"
					/>
				</div>
				<div className="flex items-center gap-2">
					<SlidersHorizontal size={16} className="text-slate-400" />
					<Select
						value={statusFilter}
						onValueChange={(val) => setStatusFilter(val as typeof statusFilter)}
					>
						<SelectTrigger className="w-40">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="ok">Ok</SelectItem>
							<SelectItem value="low">Stock bajo</SelectItem>
							<SelectItem value="empty">Agotado</SelectItem>
							<SelectItem value="expiring">Por vencer</SelectItem>
							<SelectItem value="expired">Vencido</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Tabla */}
			{isLoading ? (
				<div className="flex-1 flex items-center justify-center">
					<p className="text-slate-400">Cargando inventario...</p>
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
								<TableHead>Producto</TableHead>
								<TableHead>Lote</TableHead>
								<TableHead className="text-right">Stock</TableHead>
								<TableHead className="text-right">P. Compra</TableHead>
								<TableHead className="text-right">P. Venta</TableHead>
								<TableHead>Vencimiento</TableHead>
								<TableHead>Estado</TableHead>
								{isAdmin && <TableHead className="text-right">Acciones</TableHead>}
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={isAdmin ? 8 : 7}
										className="text-center text-slate-400 py-12"
									>
										No se encontraron lotes
									</TableCell>
								</TableRow>
							) : (
								filtered.map((lot) => {
									const status = getLotStatus(lot, lot.product)
									const statusConfig = STATUS_CONFIG[status]
									const expDate = lot.expirationDate.toDate()

									return (
										<TableRow key={lot.id} className="hover:bg-slate-50">
											<TableCell>
												<p className="font-medium text-slate-800 text-sm">
													{lot.product.brand}
												</p>
												<p className="text-xs text-slate-400">
													{lot.manufacturer}
												</p>
											</TableCell>
											<TableCell className="text-sm text-slate-600">
												{lot.numberLot}
											</TableCell>
											<TableCell className="text-right">
												<span
													className={`text-sm font-medium
													${
														lot.stock === 0
															? "text-red-500"
															: lot.stock <= lot.product.minStock
																? "text-yellow-600"
																: "text-slate-800"
													}`}
												>
													{lot.stock}
												</span>
											</TableCell>
											<TableCell className="text-right text-sm text-slate-600">
												S/. {lot.purchasePrice.toFixed(2)}
											</TableCell>
											<TableCell className="text-right text-sm text-slate-800 font-medium">
												S/. {lot.sellPrice.toFixed(2)}
											</TableCell>
											<TableCell className="text-sm text-slate-600">
												{expDate.toLocaleDateString("es-PE", {
													day: "2-digit",
													month: "short",
													year: "numeric"
												})}
											</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className={`text-xs ${statusConfig.className}`}
												>
													{statusConfig.label}
												</Badge>
											</TableCell>
											{isAdmin && (
												<TableCell>
													<div className="flex items-center justify-end gap-1">
														<Button
															size="icon"
															variant="ghost"
															className="h-7 w-7"
															onClick={() => openEditPrice(lot)}
															title="Editar precio"
														>
															<Pencil size={13} />
														</Button>
														<Button
															size="icon"
															variant="ghost"
															className="h-7 w-7"
															onClick={() => openAdjust(lot)}
															title="Ajustar stock"
														>
															<PackageMinus size={13} />
														</Button>
														<Button
															size="icon"
															variant="ghost"
															className="h-7 w-7 text-red-400 hover:text-red-600"
															onClick={() => deactivateLot(lot.id)}
															title="Desactivar lote"
														>
															<Trash2 size={13} />
														</Button>
													</div>
												</TableCell>
											)}
										</TableRow>
									)
								})
							)}
						</TableBody>
					</Table>
				</div>
			)}

			{/* Dialog nuevo lote */}
			<Dialog open={dialog === "newLot"} onOpenChange={(open) => !open && closeDialog()}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Nuevo lote</DialogTitle>
					</DialogHeader>
					<LotForm onSubmit={handleCreateLot} onCancel={closeDialog} />
				</DialogContent>
			</Dialog>

			{/* Dialog editar precio */}
			<Dialog open={dialog === "editPrice"} onOpenChange={(open) => !open && closeDialog()}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Editar precio de venta</DialogTitle>
					</DialogHeader>
					{selectedLot && (
						<div className="flex flex-col gap-4">
							<div className="bg-slate-50 rounded-lg p-3">
								<p className="text-sm font-medium">{selectedLot.product.brand}</p>
								<p className="text-xs text-slate-500">
									Lote: {selectedLot.numberLot}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<label className="text-sm font-medium">
									Nuevo precio de venta (S/.)
								</label>
								<Input
									type="number"
									min={0}
									step={0.01}
									value={editPrice}
									onChange={(e) => setEditPrice(e.target.value)}
								/>
							</div>
							<div className="flex gap-2">
								<Button onClick={handleUpdatePrice} className="flex-1">
									Guardar precio
								</Button>
								<Button variant="outline" onClick={closeDialog}>
									Cancelar
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* Dialog ajuste de stock */}
			<Dialog open={dialog === "adjust"} onOpenChange={(open) => !open && closeDialog()}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Ajuste de stock</DialogTitle>
					</DialogHeader>
					{selectedLot && (
						<StockAdjustForm
							lot={selectedLot}
							onSubmit={handleAdjust}
							onCancel={closeDialog}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
