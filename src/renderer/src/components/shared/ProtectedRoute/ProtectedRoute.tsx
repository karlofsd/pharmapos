import { useAuth } from "@renderer/hooks/useAuth"
import { LoaderCircle } from "lucide-react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

type ProtectedRouteProps = {
	children?: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): React.ReactElement => {
	const { pathname } = useLocation()
	const { user, isLoading } = useAuth()

	if (isLoading) return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<div className="flex flex-col items-center gap-4">
				<span className="text-4xl">💊</span>
				<div className="flex flex-col items-center gap-2">
					<div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
					<LoaderCircle />
				</div>
			</div>
		</div>
	)

	console.log("ProtectedRoute", { user, pathname, isLoading })

	if (!user) return <Navigate to="/login" state={{ from: pathname }} replace />

	if (pathname === "/" && user.role === "admin") {
		return <Navigate to="/dashboard" replace />
	} else if (pathname === "/" && user.role === "cashier") {
		return <Navigate to="/cashier" replace />
	}

	return <>{children || <Outlet />}</>
}

export default ProtectedRoute
