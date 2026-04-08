import { useSettingsStore, PRIMARY_COLORS } from "@renderer/store/settingsStore"
import { Moon, Sun } from "lucide-react"
import { cn } from "@renderer/lib/utils"

export function ThemeTab(): React.ReactElement {
	const { theme, primaryColor, setTheme, setPrimaryColor } = useSettingsStore()

	return (
		<div className="flex flex-col gap-6 max-w-lg">
			{/* Modo claro/oscuro */}
			<div className="flex flex-col gap-3">
				<p className="text-sm font-semibold text-slate-700">Modo de visualización</p>
				<div className="grid grid-cols-2 gap-3">
					{([
						{ value: "light", label: "Claro", icon: Sun },
						{ value: "dark", label: "Oscuro", icon: Moon }
					] as const).map(({ value, label, icon: Icon }) => (
						<button
							key={value}
							onClick={() => setTheme(value)}
							className={cn(
								"flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
								theme === value
									? "border-slate-800 bg-slate-50"
									: "border-slate-200 hover:border-slate-300"
							)}
						>
							<Icon size={24} className={theme === value ? "text-slate-800" : "text-slate-400"} />
							<span className={`text-sm font-medium ${theme === value ? "text-slate-800" : "text-slate-500"}`}>
								{label}
							</span>
						</button>
					))}
				</div>
			</div>

			{/* Color primario */}
			<div className="flex flex-col gap-3">
				<p className="text-sm font-semibold text-slate-700">Color primario</p>
				<div className="flex flex-wrap gap-3">
					{PRIMARY_COLORS.map((color) => (
						<button
							key={color.name}
							onClick={() => setPrimaryColor(color)}
							title={color.name}
							className={cn(
								"w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
								primaryColor.name === color.name
									? "border-slate-800 scale-110"
									: "border-transparent"
							)}
							style={{ backgroundColor: color.value }}
						/>
					))}
				</div>
				<p className="text-xs text-slate-400">
					Color seleccionado: <span className="font-medium">{primaryColor.name}</span>
				</p>
			</div>
		</div>
	)
}