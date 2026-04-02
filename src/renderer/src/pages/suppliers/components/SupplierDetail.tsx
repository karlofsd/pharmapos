import { X, Pencil, Trash2, ClipboardList } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"
import { Supplier } from "@renderer/types"
import { UserUtils } from "@renderer/types"
import { DetailRow } from "@renderer/components/ui/DetailRow"

interface SupplierDetailProps {
	supplier: Supplier
	onEdit: () => void
	onDeactivate: () => void
	onClose: () => void
}

const DOCUMENT_LABELS: Record<string, string> = {
	dni: "DNI",
	ruc: "RUC",
	passport: "Pasaporte",
	ce: "C.E."
}

export function SupplierDetail({
	supplier,
	onEdit,
	onDeactivate,
	onClose
}: SupplierDetailProps): React.ReactElement {
	const documentType = Object.keys(supplier.document)[0]
	const documentNumber = Object.values(supplier.document)[0]

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-start justify-between p-4 shrink-0">
				<div>
					<h2 className="font-bold text-slate-800">{supplier.businessName}</h2>
					<p className="text-sm text-slate-500">{UserUtils.getFullname(supplier)}</p>
				</div>
				<button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-2">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
				{/* Documento */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Identificación
					</p>
					<DetailRow label={DOCUMENT_LABELS[documentType]} value={documentNumber} />
				</div>

				<Separator />

				{/* Contacto */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Contacto
					</p>
					<DetailRow
						label="Teléfono"
						value={`${supplier.phoneNumber.code} ${supplier.phoneNumber.number}`}
					/>
					{supplier.email && <DetailRow label="Email" value={supplier.email} />}
					{supplier.address && <DetailRow label="Dirección" value={supplier.address} />}
				</div>

				<Separator />

				{/* Condición de pago */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Condición de pago
					</p>
					<DetailRow
						label="Tipo"
						value={
							<Badge
								variant={
									supplier.paymentCondition === "credit" ? "default" : "secondary"
								}
							>
								{supplier.paymentCondition === "credit" ? "Crédito" : "Contado"}
							</Badge>
						}
					/>
					{supplier.paymentCondition === "credit" && (
						<>
							<DetailRow
								label="Días de crédito"
								value={`${supplier.creditDays} días`}
							/>
							<DetailRow
								label="Límite"
								value={`S/. ${supplier.creditLimit.toFixed(2)}`}
							/>
							<div className="grid grid-cols-2 gap-3">
								<div className="bg-slate-50 rounded-lg p-3">
									<p className="text-xs text-slate-400">Deuda</p>
									<p
										className={`text-base font-bold ${supplier.debtBalance > 0 ? "text-red-600" : "text-slate-800"}`}
									>
										S/. {supplier.debtBalance.toFixed(2)}
									</p>
								</div>
								<div className="bg-slate-50 rounded-lg p-3">
									<p className="text-xs text-slate-400">Saldo favor</p>
									<p
										className={`text-base font-bold ${supplier.favorBalance > 0 ? "text-green-600" : "text-slate-800"}`}
									>
										S/. {supplier.favorBalance.toFixed(2)}
									</p>
								</div>
							</div>
						</>
					)}
				</div>

				<Separator />

				{/* Pedidos */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Historial
					</p>
					<button className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
						<ClipboardList size={14} />
						Ver pedidos de este proveedor
					</button>
				</div>
			</div>

			<Separator />

			<div className="flex items-center gap-2 p-4 shrink-0">
				<Button onClick={onEdit} className="flex-1">
					<Pencil size={16} />
					Editar
				</Button>
				<Button variant="destructive" size="icon" onClick={onDeactivate}>
					<Trash2 size={16} />
				</Button>
			</div>
		</div>
	)
}
