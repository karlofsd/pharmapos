import { X, Pencil, Trash2, CreditCard, ShoppingBag } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"
import { Client } from "@renderer/types"
import { UserUtils } from "@renderer/types"

interface ClientDetailProps {
	client: Client
	onEdit: () => void
	onDeactivate: () => void
	onClose: () => void
}

interface DetailRowProps {
	label: string
	value: React.ReactNode
}

function DetailRow({ label, value }: DetailRowProps): React.ReactElement {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
			<div className="text-sm text-slate-800">{value}</div>
		</div>
	)
}

const GENRE_LABELS: Record<string, string> = {
	male: "Masculino",
	female: "Femenino",
	other: "Otro"
}

const DOCUMENT_LABELS: Record<string, string> = {
	dni: "DNI",
	ruc: "RUC",
	passport: "Pasaporte",
	ce: "C.E."
}

export function ClientDetail({
	client,
	onEdit,
	onDeactivate,
	onClose
}: ClientDetailProps): React.ReactElement {
	const documentType = Object.keys(client.document)[0]
	const documentNumber = Object.values(client.document)[0]

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-start justify-between p-4 shrink-0">
				<div>
					<h2 className="font-bold text-slate-800">{UserUtils.getFullname(client)}</h2>
					<p className="text-sm text-slate-500">
						{DOCUMENT_LABELS[documentType]}: {documentNumber}
					</p>
				</div>
				<button
					onClick={onClose}
					className="text-slate-400 hover:text-slate-600 transition-colors ml-2"
				>
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
				{/* Datos personales */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Datos personales
					</p>
					<DetailRow label="Género" value={GENRE_LABELS[client.genre]} />
					<DetailRow
						label="Fecha de nacimiento"
						value={client.birthday.toDate().toLocaleDateString("es-PE")}
					/>
					<DetailRow label="Dirección" value={client.address} />
				</div>

				<Separator />

				{/* Contacto */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Contacto
					</p>
					<DetailRow
						label="Teléfono"
						value={`${client.phoneNumber.code} ${client.phoneNumber.number}`}
					/>
					{client.email && <DetailRow label="Email" value={client.email} />}
				</div>

				<Separator />

				{/* Crédito */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Estado crediticio
					</p>
					<div className="grid grid-cols-2 gap-3">
						<div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-1">
							<p className="text-xs text-slate-400">Deuda</p>
							<p
								className={`text-lg font-bold ${client.debtBalance > 0 ? "text-red-600" : "text-slate-800"}`}
							>
								S/. {client.debtBalance?.toFixed(2) ?? 0}
							</p>
						</div>
						<div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-1">
							<p className="text-xs text-slate-400">Saldo a favor</p>
							<p
								className={`text-lg font-bold ${client.favorBalance > 0 ? "text-green-600" : "text-slate-800"}`}
							>
								S/. {client.favorBalance?.toFixed(2) ?? 0}
							</p>
						</div>
					</div>
					{client.hasCredit && (
						<DetailRow
							label="Límite de crédito"
							value={`S/. ${client.creditLimit?.toFixed(2) ?? 0}`}
						/>
					)}
					<DetailRow
						label="Crédito habilitado"
						value={
							<Badge variant={client.hasCredit ? "default" : "secondary"}>
								{client.hasCredit ? "Sí" : "No"}
							</Badge>
						}
					/>
				</div>

				<Separator />

				{/* Historial — placeholder por ahora */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Historial
					</p>
					<div className="grid grid-cols-2 gap-2">
						<button className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
							<ShoppingBag size={14} />
							Ver compras
						</button>
						<button className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
							<CreditCard size={14} />
							Ver créditos
						</button>
					</div>
				</div>
			</div>

			<Separator />

			{/* Acciones */}
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
