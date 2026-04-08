import { useSettingsStore, FontSize } from "@renderer/store/settingsStore"
import { cn } from "@renderer/lib/utils"
import { Type } from "lucide-react"

const FONT_SIZES = [
	{
		value: "normal" as FontSize,
		label: "Normal",
		description: "Tamaño estándar para uso diario",
		preview: "text-sm"
	},
	{
		value: "large" as FontSize,
		label: "Grande",
		description: "Mayor tamaño para mejor visibilidad",
		preview: "text-base"
	}
]

export function AccessibilityTab(): React.ReactElement {
	const { fontSize, setFontSize } = useSettingsStore()

	return (
		<div className="flex flex-col gap-6 max-w-lg">
			{/* Tamaño de texto */}
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<Type size={16} className="text-slate-500" />
					<p className="text-sm font-semibold text-slate-700">Tamaño de texto e iconos</p>
				</div>
				<div className="flex flex-col gap-3">
					{FONT_SIZES.map((size) => (
						<button
							key={size.value}
							onClick={() => setFontSize(size.value)}
							className={cn(
								"flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
								fontSize === size.value
									? "border-slate-800 bg-slate-50"
									: "border-slate-200 hover:border-slate-300"
							)}
						>
							<div className="flex flex-col gap-1">
								<p className={`font-medium ${size.preview} ${fontSize === size.value ? "text-slate-800" : "text-slate-600"}`}>
									{size.label}
								</p>
								<p className="text-xs text-slate-400">{size.description}</p>
							</div>
							<div className={cn(
								"flex items-center gap-1",
								fontSize === size.value ? "text-slate-800" : "text-slate-300"
							)}>
								<Type size={size.value === "normal" ? 16 : 22} />
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Preview */}
			<div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-3 border border-slate-200">
				<p className="text-xs text-slate-400 uppercase tracking-wide">Vista previa</p>
				<div className={cn(
					"flex flex-col gap-2",
					fontSize === "large" ? "text-base" : "text-sm"
				)}>
					<p className="font-bold text-slate-800">Farmacia POS</p>
					<p className="text-slate-600">Paracetamol 500mg — S/. 5.00</p>
					<p className="text-slate-400">Lote: LT-2024-001 · Stock: 45</p>
				</div>
			</div>
		</div>
	)
}