import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import { useUIStore } from "@renderer/store/uiStore"
import { UpdateNotifier } from "../UpdateNotifier"
import { useSettingsStore } from "@renderer/store/settingsStore"
import { StatusBar } from "../statusbar/StatusBar"

export default function AppLayout(): React.ReactElement {
	const { sidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useUIStore()
	const [manualOverride, setManualOverride] = useState(false)
	const { kioskMode } = useSettingsStore()

	useEffect(() => {
		window.electron.ipcRenderer.invoke("window:kiosk", kioskMode)
	}, [kioskMode])

	useEffect(() => {
		function handleResize(): void {
			if (!manualOverride) {
				setSidebarCollapsed(window.innerWidth < 900)
			}
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [manualOverride, setSidebarCollapsed])

	function handleToggle(): void {
		setManualOverride(true)
		toggleSidebar()
	}

	return (
		<div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
			<div className="flex flex-1 h-full overflow-hidden">
				<Sidebar collapsed={sidebarCollapsed} onToggle={handleToggle} />
				<main className="flex-1 overflow-auto h-full bg-background text-foreground">
					<Outlet />
				</main>
			</div>
			<StatusBar />
			<UpdateNotifier />
		</div>
	)
}
