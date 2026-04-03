import { RefreshCw, TrendingUp, AlertTriangle, ShoppingCart, CreditCard } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { DashboardData } from "@renderer/hooks/useDashboard"
import { useNavigate } from "react-router-dom"
import { StatCard } from "./components/StatCard"
import { AlertRow } from "./components/AlertRow"

type AdminDashboardProps = {
	data: DashboardData
	reload: () => Promise<void>
}

export function AdminDashboard({ data, reload }: AdminDashboardProps): React.ReactElement {
	const navigate = useNavigate()

	const hasAlerts =
		data.lowStockLots.length > 0 ||
		data.expiringLots.length > 0 ||
		data.pendingCredits > 0 ||
		data.pendingOrders > 0

	return (
		<div className="flex flex-col h-full overflow-y-auto p-6 gap-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
					<p className="text-sm text-slate-500">
						{new Date().toLocaleDateString("es-PE", {
							weekday: "long",
							day: "numeric",
							month: "long",
							year: "numeric"
						})}
					</p>
				</div>
				<Button variant="outline" size="sm" onClick={reload}>
					<RefreshCw size={14} />
					Actualizar
				</Button>
			</div>

			{/* Ventas del día */}
			<div className="flex flex-col gap-3">
				<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
					Ventas del día
				</p>
				<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
					<StatCard
						label="Total ventas"
						value={`S/. ${data.todaySales.toFixed(2)}`}
						sub={`${data.todayTransactions} transacciones`}
						icon={TrendingUp}
						color="text-green-600"
					/>
					<StatCard
						label="Efectivo"
						value={`S/. ${data.todayCash.toFixed(2)}`}
						icon={ShoppingCart}
					/>
					<StatCard
						label="Tarjeta"
						value={`S/. ${data.todayCard.toFixed(2)}`}
						icon={CreditCard}
					/>
					<StatCard
						label="Crédito"
						value={`S/. ${data.todayCredit.toFixed(2)}`}
						icon={CreditCard}
						color={data.todayCredit > 0 ? "text-yellow-600" : "text-slate-800"}
					/>
				</div>
			</div>

			{/* Caja activa */}
			{data.activeTill && (
				<div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
							<p className="text-sm font-medium text-green-800">Caja abierta</p>
						</div>
						<p className="text-xs text-green-600">
							Desde:{" "}
							{data.activeTill.openedAt.toDate().toLocaleTimeString("es-PE", {
								hour: "2-digit",
								minute: "2-digit"
							})}
						</p>
					</div>
					<div className="text-right">
						<p className="text-xs text-green-600">Total ventas</p>
						<p className="text-lg font-bold text-green-800">
							S/. {data.activeTill.totalSales.toFixed(2)}
						</p>
					</div>
				</div>
			)}

			{/* Alertas */}
			{hasAlerts && (
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<AlertTriangle size={14} className="text-yellow-500" />
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
							Alertas
						</p>
					</div>
					<div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-1">
						{data.lowStockLots.length > 0 && (
							<AlertRow
								label="Productos con stock bajo"
								value={data.lowStockLots.length}
								urgent
								onClick={() => navigate("/inventory")}
							/>
						)}
						{data.expiringLots.length > 0 && (
							<AlertRow
								label="Productos por vencer (30 días)"
								value={data.expiringLots.length}
								urgent
								onClick={() => navigate("/inventory")}
							/>
						)}
						{data.pendingCredits > 0 && (
							<AlertRow
								label="Créditos pendientes"
								value={data.pendingCredits}
								onClick={() => navigate("/credits")}
							/>
						)}
						{data.pendingOrders > 0 && (
							<AlertRow
								label="Pedidos sin recibir"
								value={data.pendingOrders}
								onClick={() => navigate("/orders")}
							/>
						)}
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{/* Stock bajo */}
				{data.lowStockLots.length > 0 && (
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
							Stock bajo
						</p>
						<div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
							{data.lowStockLots.map(({ lot, product }) => (
								<div
									key={lot.id}
									className="flex items-center justify-between px-4 py-3"
								>
									<div className="min-w-0">
										<p className="text-sm font-medium text-slate-800 truncate">
											{product.brand}
										</p>
										<p className="text-xs text-slate-400">
											Lote: {lot.numberLot}
										</p>
									</div>
									<Badge
										variant="outline"
										className={`shrink-0 ml-2 ${
											lot.stock === 0
												? "bg-red-50 text-red-600 border-red-200"
												: "bg-yellow-50 text-yellow-700 border-yellow-200"
										}`}
									>
										{lot.stock} u.
									</Badge>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Por vencer */}
				{data.expiringLots.length > 0 && (
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
							Por vencer
						</p>
						<div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
							{data.expiringLots.map(({ lot, product, daysLeft }) => (
								<div
									key={lot.id}
									className="flex items-center justify-between px-4 py-3"
								>
									<div className="min-w-0">
										<p className="text-sm font-medium text-slate-800 truncate">
											{product.brand}
										</p>
										<p className="text-xs text-slate-400">
											{lot.expirationDate
												.toDate()
												.toLocaleDateString("es-PE")}
										</p>
									</div>
									<Badge
										variant="outline"
										className={`shrink-0 ml-2 ${
											daysLeft <= 7
												? "bg-red-50 text-red-600 border-red-200"
												: "bg-orange-50 text-orange-600 border-orange-200"
										}`}
									>
										{daysLeft}d
									</Badge>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
