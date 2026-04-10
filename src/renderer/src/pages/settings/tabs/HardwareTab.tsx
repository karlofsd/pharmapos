import { useSettingsStore } from "@renderer/store/settingsStore"
import { Switch } from "@renderer/components/ui/switch"
import { Label } from "@renderer/components/ui/label"
import { Separator } from "@renderer/components/ui/separator"
import { Printer, Landmark, Monitor } from "lucide-react"
import { useFirebaseStore } from "@renderer/store/firebaseStore"
import { Button } from "@renderer/components/ui/button"

interface SettingRowProps {
	icon: React.ElementType
	label: string
	description: string
	checked: boolean
	onCheckedChange: () => void
	destructive?: boolean
}

function SettingRow({
	icon: Icon,
	label,
	description,
	checked,
	onCheckedChange,
	destructive = false
}: SettingRowProps): React.ReactElement {
	return (
		<div className="flex items-center justify-between gap-4">
			<div className="flex items-start gap-3">
				<div
					className={`mt-0.5 p-2 rounded-lg ${destructive ? "bg-orange-50" : "bg-slate-100"
						}`}
				>
					<Icon
						size={16}
						className={destructive ? "text-orange-500" : "text-slate-500"}
					/>
				</div>
				<div>
					<Label className="text-sm font-medium text-slate-800">{label}</Label>
					<p className="text-xs text-slate-400 mt-0.5">{description}</p>
				</div>
			</div>
			<Switch checked={checked} onCheckedChange={onCheckedChange} />
		</div>
	)
}

export function HardwareTab(): React.ReactElement {
	const {
		emitReceipt,
		openDrawer,
		kioskMode,
		toggleEmitReceipt,
		toggleOpenDrawer,
		activeKioskMode
	} = useSettingsStore()

	const { clearConfig } = useFirebaseStore()

	return (
		<div className="flex flex-col gap-6 max-w-lg">
			{/* Ticketera */}
			<div className="flex flex-col gap-4">
				<p className="text-sm font-semibold text-slate-700">Ticketera</p>
				<div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-4">
					<SettingRow
						icon={Printer}
						label="Emitir ticket de venta"
						description="Imprime automáticamente el comprobante al confirmar una venta"
						checked={emitReceipt}
						onCheckedChange={toggleEmitReceipt}
					/>
					<Separator />
					<SettingRow
						icon={Landmark}
						label="Abrir caja registradora"
						description="Abre el cajón automáticamente al completar una venta en efectivo"
						checked={openDrawer}
						onCheckedChange={toggleOpenDrawer}
					/>
				</div>
				{!emitReceipt && !openDrawer && (
					<p className="text-xs text-slate-400">
						Ambas funciones están desactivadas. La venta se procesará sin interacción
						con hardware.
					</p>
				)}
			</div>

			<Separator />

			{/* Modo kiosko */}
			<div className="flex flex-col gap-4">
				<p className="text-sm font-semibold text-slate-700">Pantalla</p>
				<div className="bg-white rounded-xl border border-orange-200 p-4">
					<SettingRow
						icon={Monitor}
						label="Modo kiosko"
						description="La aplicación se ejecuta en pantalla completa sin bordes ni barra de título."
						checked={kioskMode}
						onCheckedChange={activeKioskMode}
						destructive
					/>
				</div>
				{kioskMode && (
					<div className="bg-orange-50 rounded-lg px-4 py-3 text-xs text-orange-700">
						⚠ Modo kiosko activo. Para salir usa{" "}
						<span className="font-mono font-bold">Alt+F4</span>.
					</div>
				)}
			</div>

			<Separator />

			<div className="flex flex-col gap-4">
				<Label className="text-sm font-medium text-slate-800">Conexion</Label>
				<p className="text-xs text-slate-400 mt-0.5">
					Credencial de configuracion de base de datos
				</p>
				<Button
					variant="destructive"
					onClick={() => {
						if (
							confirm(
								"¿Estás seguro? Tendrás que ingresar las credenciales nuevamente."
							)
						) {
							clearConfig()
							window.location.reload()
						}
					}}
				>
					Reconfigurar Firebase
				</Button>
			</div>
		</div>
	)
}
