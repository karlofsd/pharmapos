import { useState } from "react"
import { Plus, Download } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
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
import { useOrders } from "@renderer/hooks/useOrders"
import { useAuth } from "@renderer/hooks/useAuth"
import { useUIStore } from "@renderer/store/uiStore"
import { ExportService } from "@renderer/services/exportService"
import { Order } from "@renderer/types"
import { OrderDetail } from "./components/OrderDetail"
import { OrderForm } from "./components/OrderForm"
import { ReceiveOrderForm } from "./components/ReceiveOrderForm"
import { CreateOrderDTO, ReceiveOrderDTO } from "@renderer/services/orderService"

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

export default function OrdersPage(): React.ReactElement {
	const { user } = useAuth()
	const {
		filtered,
		selected,
		isLoading,
		error,
		statusFilter,
		setStatusFilter,
		selectOrder,
		createOrder,
		cancelOrder,
		receiveOrder
	} = useOrders()

	const { setSidebarCollapsed } = useUIStore()
	const [showForm, setShowForm] = useState(false)
	const [showReceive, setShowReceive] = useState(false)

	const hasPermission = (user?.level ?? 0) >= 2

	function handleSelectOrder(order: Order): void {
		selectOrder(order)
		setShowForm(false)
		setShowReceive(false)
		setSidebarCollapsed(true)
	}

	function handleClose(): void {
		selectOrder(null)
		setShowForm(false)
		setShowReceive(false)
		setSidebarCollapsed(false)
	}

	async function handleCreate(data: Omit<CreateOrderDTO, "createdBy">): Promise<void> {
		await createOrder(data)
		setShowForm(false)
		setSidebarCollapsed(false)
	}

	async function handleReceive(data: Omit<ReceiveOrderDTO, "userId">): Promise<void> {
		await receiveOrder(data)
		setShowReceive(false)
	}

	return (
		<div className="flex h-full">
			{/* Lista */}
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Pedidos</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} {filtered.length === 1 ? "pedido" : "pedidos"}
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							onClick={() => ExportService.exportOrders(filtered)}
							disabled={filtered.length === 0}
						>
							<Download size={16} />
							Exportar
						</Button>
						{hasPermission && (
							<Button
								onClick={() => {
									setShowForm(true)
									setSidebarCollapsed(true)
								}}
							>
								<Plus size={16} />
								Nuevo pedido
							</Button>
						)}
					</div>
				</div>

				{/* Filtro de estado */}
				<div className="flex items-center gap-3">
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-44">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="pending">Pendientes</SelectItem>
							<SelectItem value="in_transit">En tránsito</SelectItem>
							<SelectItem value="received">Recibidos</SelectItem>
							<SelectItem value="cancelled">Cancelados</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Tabla */}
				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando pedidos...</p>
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
									<TableHead>Proveedor</TableHead>
									<TableHead>Productos</TableHead>
									<TableHead>Esperado</TableHead>
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
											No se encontraron pedidos
										</TableCell>
									</TableRow>
								) : (
									filtered.map((order) => {
										const statusConfig =
											STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending
										return (
											<TableRow
												key={order.id}
												className="hover:bg-slate-50 cursor-pointer"
												onClick={() => handleSelectOrder(order)}
											>
												<TableCell className="font-mono text-sm font-medium">
													#{order.id.slice(-8).toUpperCase()}
												</TableCell>
												<TableCell className="text-sm text-slate-600">
													{order.createdAt
														.toDate()
														.toLocaleDateString("es-PE")}
												</TableCell>
												<TableCell className="text-sm text-slate-800 font-medium">
													{order.supplierName}
												</TableCell>
												<TableCell className="text-sm text-slate-600">
													{order.items.length} ítem
													{order.items.length !== 1 ? "s" : ""}
												</TableCell>
												<TableCell className="text-sm text-slate-600">
													{order.expectedAt
														? order.expectedAt
																.toDate()
																.toLocaleDateString("es-PE")
														: "-"}
												</TableCell>
												<TableCell className="text-right font-bold text-slate-800">
													S/. {order.totalAmount.toFixed(2)}
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
			{(selected || showForm) && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					{showForm ? (
						<OrderForm onSubmit={handleCreate} onCancel={handleClose} />
					) : selected ? (
						<OrderDetail
							order={selected}
							hasPermission={hasPermission}
							onReceive={() => setShowReceive(true)}
							onCancel={() => cancelOrder(selected.id)}
							onClose={handleClose}
						/>
					) : null}
				</div>
			)}

			{/* Dialog recibir pedido */}
			<Dialog open={showReceive} onOpenChange={(open) => !open && setShowReceive(false)}>
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>Recibir pedido</DialogTitle>
					</DialogHeader>
					{selected && (
						<ReceiveOrderForm
							order={selected}
							onSubmit={handleReceive}
							onCancel={() => setShowReceive(false)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
