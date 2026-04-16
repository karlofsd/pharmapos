import { useAuth } from "@renderer/hooks/useAuth"
import { PermissionLevel, Role } from "@renderer/types"
import { Navigate, Outlet } from "react-router-dom"
import { Logo } from "../logo"

type RoleRouteProps = {
	allowedRoles: Role[]
	allowedMinLevel: PermissionLevel
}

const RoleRoute = ({ allowedRoles, allowedMinLevel }: RoleRouteProps): React.ReactElement => {
	const { user, isLoading } = useAuth()

	if (isLoading)
		return (
			<div className="flex h-screen items-center justify-center bg-slate-50">
				<div className="flex justify-center  items-center gap-4 relative">
					<Logo size={56} />
					<div className="w-24 h-24 border-4 border-green-300 border-t-slate-800 rounded-full animate-spin absolute" />
				</div>
			</div>
		)

	if (!user) return <Navigate to="/login" replace />

	if (allowedMinLevel > user.level && !allowedRoles.includes(user.role))
		return <Navigate to="/unauthorized" replace />

	return <Outlet />
}

export default RoleRoute
