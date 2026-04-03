import { Button } from "@renderer/components/ui/button"
import { useNavigate } from "react-router-dom"

const Unauthorized = (): React.ReactElement => {
	const navigate = useNavigate()

	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<div className="flex flex-col items-center gap-6 text-center max-w-sm">
				<div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
					<span className="text-3xl">🔒</span>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold text-slate-800">Acceso denegado</h1>
					<p className="text-slate-500 text-sm">
						No tienes permisos para acceder a esta página.
					</p>
				</div>
				<Button variant="outline" onClick={() => navigate(-1)}>
					Volver atrás
				</Button>
			</div>
		</div>
	)
}

export default Unauthorized
