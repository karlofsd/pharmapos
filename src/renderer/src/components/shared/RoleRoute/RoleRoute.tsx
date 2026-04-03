import { useAuth } from "@renderer/hooks/useAuth"
import { Role } from "@renderer/types"
import { LoaderCircle } from "lucide-react"
import { Navigate, Outlet } from "react-router-dom"

type RoleRouteProps = {
	allowedRoles: Role[]
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps): React.ReactElement => {
	const { user, isLoading } = useAuth()

	if (isLoading) return <div className="flex h-screen items-center justify-center bg-slate-50">
		<div className="flex flex-col items-center gap-4">
			<span className="text-4xl">💊</span>
			<div className="flex flex-col items-center gap-2">
				<div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
				<LoaderCircle />
			</div>
		</div>
	</div>

	if (!user) return <Navigate to="/login" replace />

	if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />

	return <Outlet />
}

export default RoleRoute
