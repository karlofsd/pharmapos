import "./assets/main.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./context/authContext"
import { HashRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HashRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</HashRouter>
	</StrictMode>
)
