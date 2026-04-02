import { X, Ban } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"
import { Sale } from "@renderer/types"

interface SaleDetailProps {
	sale: Sale
	onCancel: () => void
	onClose: () => void
	isAdmin: boolean
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	completed: { label: "Completada", className: "bg-green-100 text-green-700 border-green-200" },
	cancelled: { label: "Anulada", className: "bg-red-100 text-red-700 border-red-200" },
	credit: { label: "Crédito", className: "bg-yellow-100 text-yellow-700 border-yellow-200" }
}

const PAYMENT_LABELS: Record<string, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	credit: "Crédito",
	wallet: "Saldo a favor",
	mixed: "Mixto"
}

interface DetailRowProps {
	label: string
	value: React.ReactNode
}

function DetailRow({ label, value }: DetailRowProps): React.ReactElement {
	return (
		<div className="flex items-center justify-between">
			<p className="text-sm text-slate-500">{label}</p>
			<div className="text-sm font-medium text-slate-800">{value}</div>
		</div>
	)
}

export function SaleDetail({
	sale,
	onCancel,
	onClose,
	isAdmin
}: SaleDetailProps): React.ReactElement {
	const statusConfig = STATUS_CONFIG[sale.status] ?? STATUS_CONFIG.completed
	const canCancel = isAdmin && sale.status !== "cancelled"

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-start justify-between p-4 shrink-0">
				<div>
					<h2 className="font-bold text-slate-800">
						Venta #{sale.id.slice(-8).toUpperCase()}
					</h2>
					<p className="text-sm text-slate-500">
						{sale.createdAt.toDate().toLocaleDateString("es-PE", {
							day: "2-digit",
							month: "long",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit"
						})}
					</p>
				</div>
				<button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-2">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
				{/* Estado */}
				<div className="flex items-center justify-between">
					<Badge variant="outline" className={`text-xs ${statusConfig.className}`}>
						{statusConfig.label}
					</Badge>
					<Badge variant="outline" className="text-xs capitalize">
						{sale.voucherType}
					</Badge>
				</div>

				{/* Items */}
				<div className="flex flex-col gap-2">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Productos
					</p>
					{sale.items.map((item, i) => (
						<div
							key={i}
							className="flex items-start justify-between bg-slate-50 rounded-lg px-3 py-2"
						>
							<div className="min-w-0">
								<p className="text-sm font-medium text-slate-800 truncate">
									{item.productName}
								</p>
								<p className="text-xs text-slate-500">
									{item.quantity} x S/. {item.finalPrice.toFixed(2)}
								</p>
								{item.alterPrice !== null && (
									<p className="text-xs text-blue-500">
										Precio modificado (original: S/. {item.unitPrice.toFixed(2)}
										)
									</p>
								)}
							</div>
							<p className="text-sm font-bold text-slate-800 shrink-0 ml-2">
								S/. {item.subtotal.toFixed(2)}
							</p>
						</div>
					))}
				</div>

				<Separator />

				{/* Pago */}
				<div className="flex flex-col gap-2">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Pago
					</p>
					<DetailRow label="Método" value={PAYMENT_LABELS[sale.paymentMethod]} />
					<DetailRow
						label="Total"
						value={
							<span className="text-base font-bold">
								S/. {sale.totalPrice.toFixed(2)}
							</span>
						}
					/>
					{sale.paymentMethod === "cash" && (
						<>
							<DetailRow
								label="Recibido"
								value={`S/. ${sale.receivedAmount.toFixed(2)}`}
							/>
							<DetailRow label="Cambio" value={`S/. ${sale.change.toFixed(2)}`} />
						</>
					)}
				</div>

				{/* Anulación */}
				{sale.status === "cancelled" && sale.cancellation && (
					<>
						<Separator />
						<div className="flex flex-col gap-2">
							<p className="text-xs font-semibold text-red-400 uppercase tracking-wide">
								Anulación
							</p>
							<div className="bg-red-50 rounded-lg p-3 flex flex-col gap-1">
								<p className="text-xs text-red-600">
									Motivo: {sale.cancellation.reason}
								</p>
								<p className="text-xs text-red-400">
									Por: {sale.cancellation.userId}
								</p>
							</div>
						</div>
					</>
				)}
			</div>

			{canCancel && (
				<>
					<Separator />
					<div className="p-4 shrink-0">
						<Button variant="destructive" className="w-full" onClick={onCancel}>
							<Ban size={16} />
							Anular venta
						</Button>
					</div>
				</>
			)}
		</div>
	)
}
