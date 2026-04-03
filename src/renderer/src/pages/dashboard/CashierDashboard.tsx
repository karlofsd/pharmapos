import { ShoppingCart, TrendingUp } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Separator } from "@renderer/components/ui/separator"
import { DashboardData } from "@renderer/hooks/useDashboard"
import { useNavigate } from "react-router-dom"
import { User, UserUtils } from "@renderer/types"

type CashierDashboardProps = {
	data: DashboardData
	user: User
}

export function CashierDashboard({ data, user }: CashierDashboardProps): React.ReactElement {
	const navigate = useNavigate()

	const till = data?.activeTill

	return (
		<div className="flex h-full items-center justify-center bg-slate-50">
			<div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
				{/* Saludo */}
				<div className="text-center">
					<p className="text-slate-500 text-sm">Bienvenido</p>
					<h1 className="text-2xl font-bold text-slate-800">
						{user ? UserUtils.getFullname(user) : ""}
					</h1>
					<p className="text-xs text-slate-400 mt-1">
						{new Date().toLocaleDateString("es-PE", {
							weekday: "long",
							day: "numeric",
							month: "long"
						})}
					</p>
				</div>

				{/* Estado de caja */}
				{till ? (
					<div className="w-full bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
							<p className="text-sm font-medium text-slate-700">Caja abierta</p>
							<p className="text-xs text-slate-400 ml-auto">
								{till.openedAt.toDate().toLocaleTimeString("es-PE", {
									hour: "2-digit",
									minute: "2-digit"
								})}
							</p>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-3">
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-1 text-slate-400">
									<TrendingUp size={12} />
									<p className="text-xs">Total vendido</p>
								</div>
								<p className="text-lg font-bold text-green-600">
									S/. {till.totalSales.toFixed(2)}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-1 text-slate-400">
									<ShoppingCart size={12} />
									<p className="text-xs">Transacciones</p>
								</div>
								<p className="text-lg font-bold text-slate-800">
									{data?.todayTransactions ?? 0}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
						<p className="text-sm font-medium text-yellow-800">
							No tienes caja abierta
						</p>
						<p className="text-xs text-yellow-600 mt-1">
							Ve al POS para abrir tu caja e iniciar el turno
						</p>
					</div>
				)}

				{/* Botón ir al POS */}
				<Button
					className="w-full h-12 text-base font-bold"
					onClick={() => navigate("/pos")}
				>
					<ShoppingCart size={18} />
					Ir al POS
				</Button>
			</div>
		</div>
	)
}
