import "./assets/main.css"
import "@renderer/i18n"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./context/authContext"
import { HashRouter } from "react-router-dom"
import { useSettingsStore } from "@renderer/store/settingsStore"

const { theme, fontSize, primaryColor } = useSettingsStore.getState()
document.documentElement.classList.toggle("dark", theme === "dark")
document.documentElement.classList.toggle("text-large", fontSize === "large")
document.documentElement.style.setProperty("--primary", primaryColor.hsl)

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HashRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</HashRouter>
	</StrictMode>
)
