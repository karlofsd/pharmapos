import { Badge } from "@renderer/components/ui/badge"
import { Check, X } from "lucide-react"
import { Role } from "@renderer/types"

interface Permission {
	module: string
	admin: boolean | "read"
	supervisor: boolean | "read"
	cashier: boolean | "read"
}

const PERMISSIONS: Permission[] = [
	{ module: "POS — Ventas", admin: true, supervisor: true, cashier: true },
	{ module: "POS — Modificar precio", admin: true, supervisor: true, cashier: false },
	{ module: "POS — Anular venta", admin: true, supervisor: true, cashier: false },
	{ module: "Inventario — Ver", admin: true, supervisor: true, cashier: "read" },
	{ module: "Inventario — Agregar lote", admin: true, supervisor: true, cashier: false },
	{ module: "Inventario — Ajustar stock", admin: true, supervisor: true, cashier: false },
	{ module: "Productos — Ver", admin: true, supervisor: true, cashier: "read" },
	{ module: "Productos — Crear/Editar", admin: true, supervisor: false, cashier: false },
	{ module: "Ventas — Ver historial", admin: true, supervisor: true, cashier: "read" },
	{ module: "Caja — Abrir/Cerrar", admin: true, supervisor: true, cashier: true },
	{ module: "Caja — Retiros e ingresos", admin: true, supervisor: true, cashier: false },
	{ module: "Créditos — Ver", admin: true, supervisor: true, cashier: false },
	{ module: "Créditos — Registrar abono", admin: true, supervisor: true, cashier: false },
	{ module: "Clientes — Gestionar", admin: true, supervisor: true, cashier: false },
	{ module: "Proveedores — Gestionar", admin: true, supervisor: false, cashier: false },
	{ module: "Pedidos — Gestionar", admin: true, supervisor: true, cashier: false },
	{ module: "Reportes", admin: true, supervisor: true, cashier: false },
	{ module: "Configuración", admin: true, supervisor: false, cashier: false },
	{ module: "Usuarios — Gestionar", admin: true, supervisor: false, cashier: false }
]

const ROLE_LABELS: Record<Role, string> = {
	admin: "Admin",
	supervisor: "Supervisor",
	cashier: "Cajero"
}

const ROLE_COLORS: Record<Role, string> = {
	admin: "bg-purple-100 text-purple-700 border-purple-200",
	supervisor: "bg-green-100 text-green-700 border-green-200",
	cashier: "bg-blue-100 text-blue-700 border-blue-200"
}

function PermissionIcon({ value }: { value: boolean | "read" }): React.ReactElement {
	if (value === true) return <Check size={14} className="text-green-600" />
	if (value === "read")
		return <span className="text-xs text-blue-500 font-medium">Solo lectura</span>
	return <X size={14} className="text-slate-300" />
}

export function PermissionsTab(): React.ReactElement {
	return (
		<div className="flex flex-col gap-4 max-w-2xl">
			<div className="flex items-center gap-3 flex-wrap">
				{(["admin", "supervisor", "cashier"] as Role[]).map((role) => (
					<Badge key={role} variant="outline" className={`text-xs ${ROLE_COLORS[role]}`}>
						{ROLE_LABELS[role]}
					</Badge>
				))}
			</div>

			<p className="text-xs text-slate-400">
				Los permisos están definidos por rol y nivel. Esta tabla es de solo lectura — para
				modificar permisos personaliza los roles en el código.
			</p>

			<div className="rounded-lg border border-slate-200 overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-slate-50">
						<tr>
							<th className="text-left px-4 py-3 text-slate-600 font-medium">
								Módulo
							</th>
							<th className="text-center px-4 py-3 text-purple-600 font-medium">
								Admin
							</th>
							<th className="text-center px-4 py-3 text-green-600 font-medium">
								Supervisor
							</th>
							<th className="text-center px-4 py-3 text-blue-600 font-medium">
								Cajero
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{PERMISSIONS.map((perm, i) => (
							<tr key={i} className="hover:bg-slate-50">
								<td className="px-4 py-2 text-slate-700">{perm.module}</td>
								<td className="px-4 py-2 text-center">
									<div className="flex justify-center">
										<PermissionIcon value={perm.admin} />
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex justify-center">
										<PermissionIcon value={perm.supervisor} />
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex justify-center">
										<PermissionIcon value={perm.cashier} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
