import "./assets/main.css"
import "@renderer/i18n"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { useSettingsStore } from "@renderer/store/settingsStore"
import { useFirebaseStore } from "./store/firebaseStore"
import { initializeFirebase } from "./services/firebase"

const { theme, fontSize, primaryColor, language } = useSettingsStore.getState()
document.documentElement.classList.toggle("dark", theme === "dark")
document.documentElement.classList.toggle("text-large", fontSize === "large")
document.documentElement.style.setProperty("--primary", primaryColor.hsl)
import("i18next").then(({ default: i18n }) => i18n.changeLanguage(language))

// Inicializar Firebase si hay credenciales guardadas
const { config } = useFirebaseStore.getState()
if (config) {
	initializeFirebase(config)
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
