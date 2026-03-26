import { Button } from "@/components/ui/button"

function App(): React.ReactElement {
	return (
		<div className="flex items-center justify-center h-screen bg-slate-50">
			<div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 w-80">
				<h1 className="text-2xl font-bold text-slate-800">💊 Farmacia POS</h1>
				<p className="text-slate-500 text-sm">
					Stack listo — Electron + React + TypeScript + Tailwind + shadcn
				</p>
				<div className="flex flex-col gap-2">
					<Button>Comenzar venta</Button>
					<Button variant="outline">Ver inventario</Button>
					<Button variant="destructive">Cancelar</Button>
					<Button variant="secondary">Reportes</Button>
				</div>
			</div>
		</div>
	)
}

export default App
