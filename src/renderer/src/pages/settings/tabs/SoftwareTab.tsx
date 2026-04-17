import { useMemo } from "react"
import { Button } from "@renderer/components/ui/button"
import { useUpdater } from "@renderer/hooks/useUpdater"
import { AlertTriangle, CheckCircle2, Download, RefreshCw, Zap } from "lucide-react"
import pkg from "../../../../../../package.json"

const appInfo = pkg as {
	name: string
	version: string
	description?: string
	author?: string
	productName?: string
}

export function SoftwareTab(): React.ReactElement {
	const { status, checkForUpdates, downloadUpdate, installUpdate } = useUpdater()

	const platformInfo = useMemo(() => {
		return `${navigator.platform} · ${navigator.userAgent}`
	}, [])

	const statusLabel = useMemo(() => {
		switch (status.type) {
			case "checking":
				return "Buscando actualizaciones..."
			case "available":
				return `Actualización disponible: v${status.version}`
			case "not-available":
				return "No hay actualizaciones disponibles"
			case "downloading":
				return `Descargando actualización: ${status.percent}%`
			case "downloaded":
				return `Actualización descargada: v${status.version}`
			case "error":
				return `Error: ${status.message}`
			default:
				return "Estado de actualizaciones desconocido"
		}
	}, [status])

	return (
		<div className="flex flex-col gap-6 max-w-2xl">
			<div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
				<div className="flex items-start gap-4">
					<div className="rounded-full bg-blue-50 p-3 text-blue-600">
						<Zap size={20} />
					</div>
					<div>
						<h2 className="text-lg font-semibold text-foreground">Software</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Información de la aplicación y comprobación de actualizaciones
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div className="rounded-2xl border border-border bg-card p-6">
					<p className="text-sm font-semibold text-foreground mb-4">
						Información de la app
					</p>
					<div className="space-y-3 text-sm text-muted-foreground">
						<div>
							<p className="text-xs text-muted-foreground">Nombre</p>
							<p className="font-medium text-foreground">
								{appInfo.productName ?? appInfo.name}
							</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Versión</p>
							<p className="font-medium text-foreground">{appInfo.version}</p>
						</div>
						{appInfo.description && (
							<div>
								<p className="text-xs text-muted-foreground">Descripción</p>
								<p className="font-medium text-foreground">{appInfo.description}</p>
							</div>
						)}
						<div>
							<p className="text-xs text-muted-foreground">Autor</p>
							<p className="font-medium text-foreground">
								{appInfo.author ?? "Desconocido"}
							</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Plataforma</p>
							<p className="font-medium text-foreground break-words">{platformInfo}</p>
						</div>
					</div>
				</div>

				<div className="rounded-2xl border border-border bg-card p-6">
					<p className="text-sm font-semibold text-foreground mb-4">Actualizaciones</p>
					<div className="space-y-4">
						<div className="rounded-2xl bg-muted p-4 text-sm text-foreground">
							<p className="font-medium">Estado</p>
							<p className="mt-2 flex items-center gap-2">
								{status.type === "available" && (
									<CheckCircle2 size={16} className="text-emerald-600" />
								)}
								{status.type === "downloading" && (
									<RefreshCw size={16} className="animate-spin text-muted-foreground" />
								)}
								{status.type === "downloaded" && (
									<CheckCircle2 size={16} className="text-emerald-600" />
								)}
								{status.type === "error" && (
									<AlertTriangle size={16} className="text-rose-600" />
								)}
								<span>{statusLabel}</span>
							</p>
						</div>

						<div className="grid gap-3">
							<Button
								variant="secondary"
								onClick={checkForUpdates}
								disabled={
									status.type === "checking" || status.type === "downloading"
								}
							>
								<RefreshCw size={16} />
								Buscar actualizaciones
							</Button>
							{status.type === "available" && (
								<Button variant="default" onClick={downloadUpdate}>
									<Download size={16} />
									Descargar actualización
								</Button>
							)}
							{status.type === "downloaded" && (
								<Button variant="default" onClick={installUpdate}>
									<CheckCircle2 size={16} />
									Instalar y reiniciar
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
