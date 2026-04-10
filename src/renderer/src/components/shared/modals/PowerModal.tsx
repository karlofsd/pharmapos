import { useState } from "react"
import { LogOut, X, Power } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
import { Separator } from "@renderer/components/ui/separator"
import { useTillStore } from "@renderer/store/tillStore"
import { useAuth } from "@renderer/hooks/useAuth"
import { signOut } from "firebase/auth"
import { getAuthInstance } from "@renderer/services/firebase"

interface PowerModalProps {
	open: boolean
	onClose: () => void
}

export function PowerModal({ open, onClose }: PowerModalProps): React.ReactElement {
	const { user } = useAuth()
	const { isOpen: isTillOpen } = useTillStore()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const isAdmin = user?.role === "admin"
	const tillWarning = isTillOpen ? "Debes cerrar la caja antes de realizar esta acción" : null

	async function handleLogout(): Promise<void> {
		if (isTillOpen) return
		setIsLoading(true)
		try {
			await signOut(getAuthInstance())
		} finally {
			setIsLoading(false)
			onClose()
		}
	}

	async function handleCloseApp(): Promise<void> {
		if (isTillOpen) return
		try {
			await window.electron.ipcRenderer.invoke("system:close")
		} catch {
			setError("No se pudo cerrar la aplicación")
		}
	}

	async function handleShutdown(): Promise<void> {
		if (isTillOpen) return
		setIsLoading(true)
		setError(null)
		try {
			const result = await window.electron.ipcRenderer.invoke("system:shutdown")
			if (!result.success) {
				setError("Sin permisos para apagar el equipo. Apágalo manualmente.")
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Power size={16} />
						Opciones del sistema
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-3">
					{/* Advertencia de caja */}
					{tillWarning && (
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
							<p className="text-xs text-yellow-700 font-medium">⚠ {tillWarning}</p>
						</div>
					)}

					{/* Error de permisos */}
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
							<p className="text-xs text-red-600">{error}</p>
						</div>
					)}

					{/* Cerrar sesión */}
					<button
						onClick={handleLogout}
						disabled={isTillOpen || isLoading}
						className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-left"
					>
						<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
							<LogOut size={14} className="text-slate-600" />
						</div>
						<div>
							<p className="text-sm font-medium text-slate-800">Cerrar sesión</p>
							<p className="text-xs text-slate-400">Vuelve a la pantalla de login</p>
						</div>
					</button>

					{/* Cerrar aplicación — solo admin */}
					{isAdmin && (
						<button
							onClick={handleCloseApp}
							disabled={isTillOpen || isLoading}
							className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-left"
						>
							<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
								<X size={14} className="text-slate-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-slate-800">
									Cerrar aplicación
								</p>
								<p className="text-xs text-slate-400">Cierra Farmacia POS</p>
							</div>
						</button>
					)}

					<Separator />

					{/* Apagar equipo */}
					<button
						onClick={handleShutdown}
						disabled={isTillOpen || isLoading}
						className="flex items-center gap-3 px-4 py-3 rounded-lg border border-red-200 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-left"
					>
						<div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
							<Power size={14} className="text-red-600" />
						</div>
						<div>
							<p className="text-sm font-medium text-red-700">Apagar equipo</p>
							<p className="text-xs text-red-400">
								Apaga el computador completamente
							</p>
						</div>
					</button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
