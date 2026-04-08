import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ThemeMode = "light" | "dark"
export type FontSize = "normal" | "large"
export type Language = "es" | "en"

export interface PrimaryColor {
	name: string
	value: string
	hsl: string
}

export const PRIMARY_COLORS: PrimaryColor[] = [
	{ name: "Slate", value: "#1e293b", hsl: "222.2 47.4% 11.2%" },
	{ name: "Blue", value: "#2563eb", hsl: "221.2 83.2% 53.3%" },
	{ name: "Green", value: "#16a34a", hsl: "142.1 76.2% 36.3%" },
	{ name: "Purple", value: "#7c3aed", hsl: "263.4 70% 50.4%" },
	{ name: "Rose", value: "#e11d48", hsl: "346.8 77.2% 49.8%" },
	{ name: "Orange", value: "#ea580c", hsl: "24.6 95% 53.1%" }
]

interface SettingsState {
	theme: ThemeMode
	fontSize: FontSize
	language: Language
	primaryColor: PrimaryColor
	setTheme: (theme: ThemeMode) => void
	setFontSize: (size: FontSize) => void
	setLanguage: (lang: Language) => void
	setPrimaryColor: (color: PrimaryColor) => void
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: "light",
			fontSize: "normal",
			language: "es",
			primaryColor: PRIMARY_COLORS[0],

			setTheme: (theme) => {
				set({ theme })
				document.documentElement.classList.toggle("dark", theme === "dark")
			},

			setFontSize: (fontSize) => {
				set({ fontSize })
				document.documentElement.classList.toggle("text-large", fontSize === "large")
			},

			setLanguage: (language) => {
				set({ language })
				import("i18next").then(({ default: i18n }) => i18n.changeLanguage(language))
			},

			setPrimaryColor: (primaryColor) => {
				set({ primaryColor })
				document.documentElement.style.setProperty("--primary", primaryColor.hsl)
			}
		}),
		{ name: "pharmapos-settings" }
	)
)
