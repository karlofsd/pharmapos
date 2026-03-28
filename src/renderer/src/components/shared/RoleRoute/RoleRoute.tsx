import { useAuth } from "@renderer/hooks/useAuth"
import { Role } from "@renderer/types"
import { Navigate, Outlet } from "react-router-dom"

type RoleRouteProps = {
	allowedRoles: Role[]
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps): React.ReactElement => {
	const { user, isLoading } = useAuth()

	if (isLoading) return <div>Loading...</div>

	console.log("RoleRoute", { user, allowedRoles })

	if (!user) return <Navigate to="/login" replace />

	if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />

	return <Outlet />
}

export default RoleRoute
