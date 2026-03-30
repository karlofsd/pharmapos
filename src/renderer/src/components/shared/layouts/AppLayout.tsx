import React, { useEffect, useState } from "react"
import Sidebar from "../sidebar/Sidebar"
import { Outlet } from "react-router-dom"

const AppLayout = (): React.ReactElement => {
	const [collapsed, setCollapsed] = useState(false)

	useEffect(() => {
		function handleResize(): void {
			setCollapsed(window.innerWidth < 900)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<div className="flex h-screen overflow-hidden bg-slate-50">
			<Sidebar collapsed={collapsed} />
			<main className="flex-1 overflow-auto">
				<Outlet />
			</main>
		</div>
	)
}

export default AppLayout
