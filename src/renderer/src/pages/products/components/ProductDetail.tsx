import { Lot, Product } from "@renderer/types"
import { Badge } from "@renderer/components/ui/badge"
import { Button } from "@renderer/components/ui/button"
import { Separator } from "@renderer/components/ui/separator"
import { X, Pencil, Trash2 } from "lucide-react"
import { DetailRow } from "@renderer/components/ui/DetailRow"
import { useEffect, useState } from "react"
import { LotService } from "@renderer/services/lotService"

interface ProductDetailProps {
	product: Product
	onEdit?: () => void
	onDeactivate?: () => void
	onClose: () => void
}

export default function ProductDetail({
	product,
	onEdit,
	onDeactivate,
	onClose
}: ProductDetailProps): React.ReactElement {
	const [lots, setLots] = useState<Lot[]>([])
	const [lotsLoading, setLotsLoading] = useState(false)

	useEffect(() => {
		setLotsLoading(true)
		LotService.getByProduct(product.id)
			.then(setLots)
			.finally(() => setLotsLoading(false))
	}, [product.id])

	const now = new Date()
	const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-start justify-between p-4 shrink-0">
				<div className="min-w-0">
					<h2 className="font-bold text-slate-800 truncate">{product.brand}</h2>
					<p className="text-sm text-slate-500">{product.manufacturer}</p>
				</div>
				<button
					onClick={onClose}
					className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 ml-2"
				>
					<X size={18} />
				</button>
			</div>

			<Separator />

			{/* Contenido */}
			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
				{/* Identificación */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Identificación
					</p>
					<DetailRow label="Código de barras" value={product.barcode} />
					{product.altcode.length > 0 && (
						<DetailRow
							label="Códigos alternos"
							value={
								<div className="flex flex-wrap gap-1">
									{product.altcode.map((code) => (
										<Badge key={code} variant="outline" className="text-xs">
											{code}
										</Badge>
									))}
								</div>
							}
						/>
					)}
				</div>

				<Separator />

				{/* Presentación */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Presentación
					</p>
					<DetailRow label="Presentación" value={product.presentation} />
					<DetailRow label="Stock mínimo" value={`${product.minStock} unidades`} />
					<DetailRow
						label="Requiere receta"
						value={
							<Badge
								variant={product.requiredPrescription ? "destructive" : "secondary"}
							>
								{product.requiredPrescription ? "Sí" : "No"}
							</Badge>
						}
					/>
				</div>

				<Separator />

				{/* DCI */}
				{product.dci.length > 0 && (
					<>
						<div className="flex flex-col gap-3">
							<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
								Principios activos (DCI)
							</p>
							<div className="flex flex-col gap-2">
								{product.dci.map((dci, index) => (
									<div
										key={index}
										className="flex items-center justify-between bg-slate-50 rounded-md px-3 py-2"
									>
										<div>
											<p className="text-sm font-medium text-slate-800">
												{dci.name}
											</p>
											<p className="text-xs text-slate-500">{dci.category}</p>
										</div>
										<Badge variant="outline" className="text-xs">
											{dci.measurement}
											{dci.unit}
										</Badge>
									</div>
								))}
							</div>
						</div>
						<Separator />
					</>
				)}

				{/* Fuente de datos */}
				<DetailRow
					label="Fuente de datos"
					value={
						<Badge variant="secondary" className="text-xs">
							{product.dataSource === "manual" ? "Registro manual" : "Fuente externa"}
						</Badge>
					}
				/>

				<Separator />

				{/* Lotes */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Lotes en inventario
					</p>
					{lotsLoading ? (
						<p className="text-xs text-slate-400">Cargando lotes...</p>
					) : lots.length === 0 ? (
						<p className="text-xs text-slate-400">Sin lotes registrados</p>
					) : (
						<div className="flex flex-col gap-2">
							{lots.map((lot) => {
								const expDate = lot.expirationDate.toDate()
								const isExpired = expDate < now
								const isExpiring = expDate <= in30Days && !isExpired
								const isEmpty = lot.stock === 0

								return (
									<div
										key={lot.id}
										className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
									>
										<div>
											<p className="text-xs font-medium text-slate-700">
												{lot.numberLot}
											</p>
											<p className="text-xs text-slate-400">
												Vence:{" "}
												{expDate.toLocaleDateString("es-PE", {
													day: "2-digit",
													month: "short",
													year: "numeric"
												})}
											</p>
										</div>
										<div className="flex flex-col items-end gap-1">
											<span
												className={`text-xs font-bold ${isEmpty
													? "text-red-500"
													: lot.stock <= product.minStock
														? "text-yellow-600"
														: "text-slate-700"
													}`}
											>
												{lot.stock} u.
											</span>
											{isExpired && (
												<Badge
													variant="outline"
													className="text-xs bg-red-50 text-red-600 border-red-200 py-0"
												>
													Vencido
												</Badge>
											)}
											{isExpiring && !isExpired && (
												<Badge
													variant="outline"
													className="text-xs bg-orange-50 text-orange-600 border-orange-200 py-0"
												>
													Por vencer
												</Badge>
											)}
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>

			{/* Acciones */}
			{(onEdit || onDeactivate) && (
				<>
					<Separator />
					<div className="flex items-center gap-2 p-4 shrink-0">
						{onEdit && (
							<Button onClick={onEdit} className="flex-1">
								<Pencil size={16} />
								Editar
							</Button>
						)}
						{onDeactivate && (
							<Button variant="destructive" size="icon" onClick={onDeactivate}>
								<Trash2 size={16} />
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	)
}
