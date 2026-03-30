import { useAuth } from "@renderer/hooks/useAuth"
import { navItems } from "../navItems"
import { cn } from "@renderer/lib/utils"
import { Separator } from "@renderer/components/ui/separator"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@renderer/components/ui/tooltip"
import { NavLink } from "react-router-dom"

type SidebarProps = {
	collapsed: boolean
}

const Sidebar = ({ collapsed }: SidebarProps): React.ReactElement => {
	const { user, logout } = useAuth()

	const visibleItems = navItems.filter((item) =>
		user?.role ? item.allowedRoles.includes(user?.role) : false
	)
	return (
		<aside
			className={cn(
				"flex flex-col h-screen bg-slate-900 text-white transition-all duration-300 shrink-0",
				collapsed ? "w-16" : "w-56"
			)}
		>
			{/* Logo */}
			<div
				className={cn(
					"flex items-center gap-3 px-4 py-5 shrink-0",
					collapsed && "justify-center px-0"
				)}
			>
				<span className="text-2xl">💊</span>
				{!collapsed && (
					<span className="font-bold text-sm tracking-wide">Farmacia POS</span>
				)}
			</div>

			<Separator className="bg-slate-700" />

			{/* Nav items */}
			<nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
				<TooltipProvider delayDuration={0}>
					{visibleItems.map((item) => (
						<Tooltip key={item.path}>
							<TooltipTrigger>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										cn(
											"flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
											"text-slate-300 hover:bg-slate-700 hover:text-white",
											isActive && "bg-slate-700 text-white font-medium",
											collapsed && "justify-center px-0"
										)
									}
								>
									<item.icon size={18} className="shrink-0" />
									{!collapsed && <span>{item.label}</span>}
								</NavLink>
							</TooltipTrigger>
							{collapsed && (
								<TooltipContent side="right">{item.label}</TooltipContent>
							)}
						</Tooltip>
					))}
				</TooltipProvider>
			</nav>

			<Separator className="bg-slate-700" />

			{/* User info + logout */}
			<div
				className={cn(
					"flex items-center gap-3 px-4 py-4 shrink-0",
					collapsed && "justify-center px-0"
				)}
			>
				<div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
					<span className="text-xs font-bold uppercase">
						{user?.fullName?.charAt(0) ?? "U"}
					</span>
				</div>
				{!collapsed && (
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{user?.fullName}</p>
						<button
							onClick={logout}
							className="text-xs text-slate-400 hover:text-white transition-colors"
						>
							Cerrar sesión
						</button>
					</div>
				)}
			</div>
		</aside>
	)
}

export default Sidebar
