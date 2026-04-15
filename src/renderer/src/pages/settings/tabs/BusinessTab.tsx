import { BusinessForm } from "../components/BusinessForm"
import { Separator } from "@renderer/components/ui/separator"
import { useSettingsStore } from "@renderer/store/settingsStore"
import { SettingRow } from "./HardwareTab"
import { Receipt } from "lucide-react"

export function BusinessTab(): React.ReactElement {
	const { sentSunat, toggleSunat } = useSettingsStore()
	return (
		<div className="flex flex-col gap-4 max-w-lg">
			<BusinessForm />
			<Separator />
			<div className="bg-white rounded-xl border border-slate-200 p-4">
				<SettingRow
					label="Activar facturación"
					description="Habilita la facturación electronica con SUNAT"
					checked={sentSunat}
					onCheckedChange={toggleSunat}
					icon={Receipt}
				/>
			</div>
		</div>
	)
}
