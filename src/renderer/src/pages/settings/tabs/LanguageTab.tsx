import { useSettingsStore, Language } from "@renderer/store/settingsStore"
import { cn } from "@renderer/lib/utils"

const LANGUAGES = [
	{ value: "es" as Language, label: "Español", flag: "🇵🇪", description: "Interfaz en español" },
	{ value: "en" as Language, label: "English", flag: "🇺🇸", description: "Interface in English" }
]

export function LanguageTab(): React.ReactElement {
	const { language, setLanguage } = useSettingsStore()

	return (
		<div className="flex flex-col gap-4 max-w-lg">
			<p className="text-sm font-semibold text-slate-700">Idioma de la interfaz</p>
			<div className="flex flex-col gap-3">
				{LANGUAGES.map((lang) => (
					<button
						key={lang.value}
						onClick={() => setLanguage(lang.value)}
						className={cn(
							"flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
							language === lang.value
								? "border-slate-800 bg-slate-50"
								: "border-slate-200 hover:border-slate-300"
						)}
					>
						<span className="text-3xl">{lang.flag}</span>
						<div>
							<p
								className={`font-medium ${language === lang.value ? "text-slate-800" : "text-slate-600"}`}
							>
								{lang.label}
							</p>
							<p className="text-xs text-slate-400">{lang.description}</p>
						</div>
						{language === lang.value && (
							<div className="ml-auto w-4 h-4 rounded-full bg-slate-800" />
						)}
					</button>
				))}
			</div>
			<p className="text-xs text-slate-400">
				El cambio de idioma se aplica inmediatamente en toda la aplicación.
			</p>
		</div>
	)
}
