import { useUpdater } from "@renderer/hooks/useUpdater"
import { Button } from "@renderer/components/ui/button"
import { Download, RefreshCw, X } from "lucide-react"
import { useState } from "react"

export function UpdateNotifier(): React.ReactElement | null {
	const { status, downloadUpdate, installUpdate } = useUpdater()
	const [dismissed, setDismissed] = useState(false)

	if (dismissed) return null
	if (status.type === "idle" || status.type === "not-available" || status.type === "checking") {
		return null
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-sm">
			{status.type === "available" && (
				<div className="bg-card border border-border rounded-xl shadow-lg p-4 flex flex-col gap-3">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-sm font-semibold text-foreground">
								Nueva versión disponible
							</p>
							<p className="text-xs text-muted-foreground mt-0.5">
								Versión {status.version} está lista para descargar
							</p>
						</div>
						<button
							onClick={() => setDismissed(true)}
							className="text-muted-foreground hover:text-foreground"
						>
							<X size={14} />
						</button>
					</div>
					<Button size="sm" onClick={downloadUpdate}>
						<Download size={14} />
						Descargar actualización
					</Button>
				</div>
			)}

			{status.type === "downloading" && (
				<div className="bg-card border border-border rounded-xl shadow-lg p-4 flex flex-col gap-3">
					<p className="text-sm font-semibold text-foreground">
						Descargando actualización...
					</p>
					<div className="w-full bg-muted rounded-full h-2">
						<div
							className="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${status.percent}%` }}
						/>
					</div>
					<p className="text-xs text-muted-foreground text-right">{status.percent}%</p>
				</div>
			)}

			{status.type === "downloaded" && (
				<div className="bg-card border border-border rounded-xl shadow-lg p-4 flex flex-col gap-3">
					<div>
						<p className="text-sm font-semibold text-foreground">Actualización lista</p>
						<p className="text-xs text-muted-foreground mt-0.5">
							Versión {status.version} descargada. Reinicia para instalar.
						</p>
					</div>
					<div className="flex gap-2">
						<Button size="sm" onClick={installUpdate} className="flex-1">
							<RefreshCw size={14} />
							Reiniciar e instalar
						</Button>
						<Button size="sm" variant="outline" onClick={() => setDismissed(true)}>
							Después
						</Button>
					</div>
				</div>
			)}

			{status.type === "error" && (
				<div className="bg-card border border-red-200 rounded-xl shadow-lg p-4 flex items-start justify-between gap-3">
					<div>
						<p className="text-sm font-semibold text-foreground">Error al actualizar</p>
						<p className="text-xs text-red-500 mt-0.5">{status.message}</p>
					</div>
					<button
						onClick={() => setDismissed(true)}
						className="text-muted-foreground hover:text-foreground shrink-0"
					>
						<X size={14} />
					</button>
				</div>
			)}
		</div>
	)
}
