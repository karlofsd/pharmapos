import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import { useUIStore } from "@renderer/store/uiStore"
import { UpdateNotifier } from "../UpdateNotifier"

export default function AppLayout(): React.ReactElement {
	const { sidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useUIStore()
	const [manualOverride, setManualOverride] = useState(false)

	useEffect(() => {
		function handleResize(): void {
			if (!manualOverride) {
				setSidebarCollapsed(window.innerWidth < 900)
			}
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [manualOverride])

	function handleToggle(): void {
		setManualOverride(true)
		toggleSidebar()
	}

	return (
		<div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
			<Sidebar collapsed={sidebarCollapsed} onToggle={handleToggle} />
			<main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
				<Outlet />
			</main>
			<UpdateNotifier />
		</div>
	)
}
