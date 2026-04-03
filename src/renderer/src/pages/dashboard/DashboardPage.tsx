import { useAuth } from "@renderer/hooks/useAuth"
import { useDashboard } from "@renderer/hooks/useDashboard"
import { AdminDashboard } from "./AdminDashboard"
import { CashierDashboard } from "./CashierDashboard"

const DashboardPage = (): React.ReactElement => {
	const { user } = useAuth()
	const { data, isLoading, error, reload } = useDashboard()

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
					<p className="text-sm text-slate-400">Cargando dashboard...</p>
				</div>
			</div>
		)
	}

	if (error || !data) {
		console.log(error)
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-red-500">{error ?? "Error al cargar datos"}</p>
			</div>
		)
	}

	if (user!.role == "admin") return <AdminDashboard data={data} reload={reload} />
	return <CashierDashboard data={data} user={user!} />
}

export default DashboardPage
