import { useState, useEffect } from "react"
import { Wifi, WifiOff, Clock, User, Landmark, RefreshCw, Power, Building2 } from "lucide-react"
import { useAuth } from "@renderer/hooks/useAuth"
import { useTillStore } from "@renderer/store/tillStore"
import { useSyncStore } from "@renderer/store/syncStore"
import { UserUtils } from "@renderer/types"
import { PowerModal } from "../modals/PowerModal"
import { cn } from "@renderer/lib/utils"

function useOnlineStatus(): boolean {
	const [isOnline, setIsOnline] = useState(navigator.onLine)
	useEffect(() => {
		function handleOnline(): void {
			setIsOnline(true)
		}
		function handleOffline(): void {
			setIsOnline(false)
		}
		window.addEventListener("online", handleOnline)
		window.addEventListener("offline", handleOffline)
		return () => {
			window.removeEventListener("online", handleOnline)
			window.removeEventListener("offline", handleOffline)
		}
	}, [])
	return isOnline
}

function useClock(): Date {
	const [time, setTime] = useState(new Date())
	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])
	return time
}

export function StatusBar(): React.ReactElement {
	const { user } = useAuth()
	const { isOpen: isTillOpen } = useTillStore()
	const isOnline = useOnlineStatus()
	const { status: syncStatus, pendingCount } = useSyncStore()
	const time = useClock()
	const [showPowerModal, setShowPowerModal] = useState(false)

	const timeStr = time.toLocaleTimeString("es-PE", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	})

	const dateStr = time.toLocaleDateString("es-PE", {
		weekday: "short",
		day: "2-digit",
		month: "short"
	})

	return (
		<>
			<div className="h-7 shrink-0 bg-slate-900 border-t border-slate-700 flex items-center justify-between px-3 text-xs text-slate-400 select-none">
				{/* Izquierda — sync + conexión */}
				<div className="flex items-center gap-3">
					{/* Online/Offline */}
					<div
						className={cn(
							"flex items-center gap-1",
							isOnline ? "text-green-400" : "text-red-400"
						)}
					>
						{isOnline ? <Wifi size={11} /> : <WifiOff size={11} />}
						<span>{isOnline ? "En línea" : "Sin conexión"}</span>
					</div>

					{/* Sync status */}
					{isOnline && (
						<div
							className={cn(
								"flex items-center gap-1",
								syncStatus === "synced" && "text-green-400",
								syncStatus === "syncing" && "text-blue-400",
								syncStatus === "pending" && "text-yellow-400",
								syncStatus === "error" && "text-red-400"
							)}
						>
							<RefreshCw
								size={10}
								className={syncStatus === "syncing" ? "animate-spin" : ""}
							/>
							<span>
								{syncStatus === "synced" && "Sincronizado"}
								{syncStatus === "syncing" && "Sincronizando..."}
								{syncStatus === "pending" &&
									`${pendingCount} pendiente${pendingCount !== 1 ? "s" : ""}`}
								{syncStatus === "error" && "Error de sync"}
							</span>
						</div>
					)}

					{!isOnline && (
						<div className="flex items-center gap-1 text-yellow-400">
							<RefreshCw size={10} />
							<span>Sin conexión — datos locales</span>
						</div>
					)}
				</div>

				{/* Centro — farmacia */}
				<div className="flex items-center gap-1 text-slate-500">
					<Building2 size={11} />
					<span>Farmacia POS</span>
				</div>

				{/* Derecha — caja, usuario, hora, power */}
				<div className="flex items-center gap-3">
					{/* Estado de caja */}
					<div
						className={cn(
							"flex items-center gap-1",
							isTillOpen ? "text-green-400" : "text-slate-500"
						)}
					>
						<Landmark size={11} />
						<span>{isTillOpen ? "Caja abierta" : "Caja cerrada"}</span>
					</div>

					{/* Usuario */}
					{user && (
						<div className="flex items-center gap-1 text-slate-400">
							<User size={11} />
							<span>{UserUtils.getFullname(user)}</span>
							<span className="text-slate-600">·</span>
							<span className="capitalize text-slate-500">{user.role}</span>
						</div>
					)}

					{/* Hora */}
					<div className="flex items-center gap-1 text-slate-400">
						<Clock size={11} />
						<span className="font-mono">{timeStr}</span>
						<span className="text-slate-600">·</span>
						<span className="capitalize">{dateStr}</span>
					</div>

					{/* Power */}
					<button
						onClick={() => setShowPowerModal(true)}
						className="flex items-center justify-center w-5 h-5 rounded hover:bg-slate-700 text-slate-500 hover:text-red-400 transition-colors"
						title="Opciones del sistema"
					>
						<Power size={11} />
					</button>
				</div>
			</div>

			<PowerModal open={showPowerModal} onClose={() => setShowPowerModal(false)} />
		</>
	)
}
