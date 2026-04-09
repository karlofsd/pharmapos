import { X, PackageCheck, Ban } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"
import { Order } from "@renderer/types"

interface OrderDetailProps {
	order: Order
	onReceive: () => void
	onCancel: () => void
	onClose: () => void
	isAdmin: boolean
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	started: { label: "Iniciado", className: "bg-blue-100 text-blue-700 border-blue-200" },
	in_transit: {
		label: "En tránsito",
		className: "bg-purple-100 text-purple-700 border-purple-200"
	},
	received: { label: "Recibido", className: "bg-green-100 text-green-700 border-green-200" },
	cancelled: { label: "Cancelado", className: "bg-red-100 text-red-700 border-red-200" },
	refunded: { label: "Devuelto", className: "bg-orange-100 text-orange-700 border-orange-200" }
}

export function OrderDetail({
	order,
	onReceive,
	onCancel,
	onClose,
	isAdmin
}: OrderDetailProps): React.ReactElement {
	const statusConfig = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending
	const canReceive = isAdmin && !["received", "cancelled"].includes(order.status)
	const canCancel = isAdmin && !["received", "cancelled"].includes(order.status)

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-start justify-between p-4 shrink-0">
				<div>
					<h2 className="font-bold text-slate-800">
						Pedido #{order.id.slice(-8).toUpperCase()}
					</h2>
					<p className="text-sm text-slate-500">
						{order.createdAt.toDate().toLocaleDateString("es-PE", {
							day: "2-digit",
							month: "long",
							year: "numeric"
						})}
					</p>
				</div>
				<button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-2">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
				{/* Estado y proveedor */}
				<div className="flex flex-col gap-2">
					<Badge variant="outline" className={`text-xs w-fit ${statusConfig.className}`}>
						{statusConfig.label}
					</Badge>
					<p className="text-sm font-medium text-slate-800">{order.supplierName}</p>
					{order.expectedAt && (
						<p className="text-xs text-slate-500">
							Esperado: {order.expectedAt.toDate().toLocaleDateString("es-PE")}
						</p>
					)}
					{order.notes && <p className="text-xs text-slate-500 italic">{order.notes}</p>}
				</div>

				<Separator />

				{/* Items */}
				<div className="flex flex-col gap-2">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Productos
					</p>
					{order.items.map((item, i) => (
						<div
							key={i}
							className="bg-slate-50 rounded-lg px-3 py-2 flex flex-col gap-1"
						>
							<div className="flex justify-between items-start">
								<p className="text-sm font-medium text-slate-800">
									{item.productName}
								</p>
								<p className="text-sm font-bold text-slate-800 shrink-0 ml-2">
									S/. {(item.orderedQuantity * item.purchasePrice).toFixed(2)}
								</p>
							</div>
							<div className="flex items-center gap-3 text-xs text-slate-500">
								<span>Pedido: {item.orderedQuantity}</span>
								{(item.receivedQuantity ?? 0) > 0 && (
									<span className="text-green-600 font-medium">
										Recibido: {item.receivedQuantity}
									</span>
								)}
								<span>P. compra: S/. {item.purchasePrice.toFixed(2)}</span>
							</div>
							{item.lotNumber && (
								<p className="text-xs text-slate-400">Lote: {item.lotNumber}</p>
							)}
						</div>
					))}
				</div>

				<div className="bg-slate-800 text-white rounded-lg p-3 flex justify-between">
					<span className="text-sm">Total</span>
					<span className="font-bold">S/. {order.totalAmount.toFixed(2)}</span>
				</div>
			</div>

			{(canReceive || canCancel) && (
				<>
					<Separator />
					<div className="flex gap-2 p-4 shrink-0">
						{canReceive && (
							<Button onClick={onReceive} className="flex-1">
								<PackageCheck size={16} />
								Recibir pedido
							</Button>
						)}
						{canCancel && (
							<Button variant="destructive" size="icon" onClick={onCancel}>
								<Ban size={16} />
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	)
}
