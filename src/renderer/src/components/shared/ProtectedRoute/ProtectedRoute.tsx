import { useAuth } from "@renderer/hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoute = (): React.ReactElement => {
	const { pathname } = useLocation()
	const { user, isLoading } = useAuth()

	if (isLoading) return <div>Loading...</div>

	console.log("ProtectedRoute", { user, pathname })

	if (!user) return <Navigate to="/login" state={{ from: pathname }} replace />

	if (pathname === "/" && user.role === "admin") {
		return <Navigate to="/dashboard" replace />
	} else if (pathname === "/" && user.role === "cashier") {
		return <Navigate to="/cashier" replace />
	}

	console.log(pathname, user)

	return <Outlet />
}

export default ProtectedRoute
