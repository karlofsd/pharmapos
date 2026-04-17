import { useAuth } from "@renderer/hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Logo } from "../logo"

type ProtectedRouteProps = {
	children?: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): React.ReactElement => {
	const { pathname } = useLocation()
	const { user, isLoading } = useAuth()

	console.log("ProtectedRoute", { user, pathname, isLoading })

	if (isLoading)
		return (
			<div className="flex h-screen items-center justify-center bg-slate-50">
				<div className="flex justify-center  items-center gap-4 relative">
					<Logo size={56} />
					<div className="w-24 h-24 border-4 border-green-300 border-t-slate-800 rounded-full animate-spin absolute" />
				</div>
			</div>
		)

	if (!user) return <Navigate to="/login" state={{ from: pathname }} replace />

	if (pathname === "/") {
		return <Navigate to="/dashboard" replace />
	}

	return <>{children || <Outlet />}</>
}

export default ProtectedRoute
