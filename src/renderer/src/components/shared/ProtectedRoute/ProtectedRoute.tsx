import { useAuth } from "@renderer/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = (): React.ReactElement => {
	const { user, isLoading } = useAuth()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
