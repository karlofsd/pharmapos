import { Button } from "@renderer/components/ui/button"

const NotFoundPage = (): React.ReactElement => {
	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<div className="flex flex-col items-center gap-6 text-center max-w-sm">
				<div className="flex flex-col gap-1">
					<p className="text-7xl font-bold text-slate-200">404</p>
					<p className="text-xl font-semibold text-slate-800">Página no encontrada</p>
					<p className="text-sm text-slate-500">
						La página que buscas no existe o fue movida.
					</p>
				</div>
				<Button variant="outline" onClick={() => window.history.back()}>
					Volver atrás
				</Button>
			</div>
		</div>
	)
}

export default NotFoundPage
