import { Client } from "@renderer/types"
import { Badge } from "@renderer/components/ui/badge"
import { UserUtils } from "@renderer/types"
import { cn } from "@renderer/lib/utils"

interface ClientCardProps {
	client: Client
	isSelected: boolean
	onClick: () => void
}

const DOCUMENT_LABELS: Record<string, string> = {
	dni: "DNI",
	ruc: "RUC",
	passport: "Pasaporte",
	ce: "C.E."
}

export function ClientCard({ client, isSelected, onClick }: ClientCardProps): React.ReactElement {
	const documentType = Object.keys(client.document)[0]
	const documentNumber = Object.values(client.document)[0]

	return (
		<button
			onClick={onClick}
			className={cn(
				"w-full text-left px-4 py-3 rounded-lg border transition-colors",
				"hover:bg-slate-50 hover:border-slate-300",
				isSelected ? "bg-blue-50 border-blue-300" : "bg-white border-slate-200"
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<p className="font-medium text-slate-800 truncate">
						{UserUtils.getFullname(client)}
					</p>
					<p className="text-sm text-slate-500">
						{DOCUMENT_LABELS[documentType]}: {documentNumber}
					</p>
					<p className="text-xs text-slate-400 mt-0.5">
						{client.phoneNumber.code} {client.phoneNumber.number}
					</p>
				</div>
				<div className="flex flex-col items-end gap-1 shrink-0">
					{client.debtBalance > 0 && (
						<Badge variant="destructive" className="text-xs">
							Debe S/. {client.debtBalance.toFixed(2)}
						</Badge>
					)}
					{client.favorBalance > 0 && (
						<Badge
							variant="outline"
							className="text-xs text-green-600 border-green-300"
						>
							Favor S/. {client.favorBalance.toFixed(2)}
						</Badge>
					)}
					{client.hasCredit && !client.debtBalance && !client.favorBalance && (
						<Badge variant="secondary" className="text-xs">
							Crédito
						</Badge>
					)}
				</div>
			</div>
		</button>
	)
}
