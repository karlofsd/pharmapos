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
			<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex items-start gap-4">
					<div className="rounded-full bg-blue-50 p-3 text-blue-600">
						<Zap size={20} />
					</div>
					<div>
						<h2 className="text-lg font-semibold text-slate-900">Software</h2>
						<p className="mt-1 text-sm text-slate-500">
							Información de la aplicación y comprobación de actualizaciones
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div className="rounded-2xl border border-slate-200 bg-white p-6">
					<p className="text-sm font-semibold text-slate-700 mb-4">Información de la app</p>
					<div className="space-y-3 text-sm text-slate-600">
						<div>
							<p className="text-xs text-slate-400">Nombre</p>
							<p className="font-medium text-slate-900">{appInfo.productName ?? appInfo.name}</p>
						</div>
						<div>
							<p className="text-xs text-slate-400">Versión</p>
							<p className="font-medium text-slate-900">{appInfo.version}</p>
						</div>
						{appInfo.description && (
							<div>
								<p className="text-xs text-slate-400">Descripción</p>
								<p className="font-medium text-slate-900">{appInfo.description}</p>
							</div>
						)}
						<div>
							<p className="text-xs text-slate-400">Autor</p>
							<p className="font-medium text-slate-900">{appInfo.author ?? "Desconocido"}</p>
						</div>
						<div>
							<p className="text-xs text-slate-400">Plataforma</p>
							<p className="font-medium text-slate-900 break-words">{platformInfo}</p>
						</div>
					</div>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-6">
					<p className="text-sm font-semibold text-slate-700 mb-4">Actualizaciones</p>
					<div className="space-y-4">
						<div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
							<p className="font-medium">Estado</p>
							<p className="mt-2 flex items-center gap-2">
								{status.type === "available" && <CheckCircle2 size={16} className="text-emerald-600" />}
								{status.type === "downloading" && <RefreshCw size={16} className="animate-spin text-slate-500" />}
								{status.type === "downloaded" && <CheckCircle2 size={16} className="text-emerald-600" />}
								{status.type === "error" && <AlertTriangle size={16} className="text-rose-600" />}
								<span>{statusLabel}</span>
							</p>
						</div>

						<div className="grid gap-3">
							<Button
								variant="secondary"
								onClick={checkForUpdates}
								disabled={status.type === "checking" || status.type === "downloading"}
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
