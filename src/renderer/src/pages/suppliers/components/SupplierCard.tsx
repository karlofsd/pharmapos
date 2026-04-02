import { Supplier } from "@renderer/types"
import { Badge } from "@renderer/components/ui/badge"
import { UserUtils } from "@renderer/types"
import { cn } from "@renderer/lib/utils"

interface SupplierCardProps {
	supplier: Supplier
	isSelected: boolean
	onClick: () => void
}

const DOCUMENT_LABELS: Record<string, string> = {
	dni: "DNI",
	ruc: "RUC",
	passport: "Pasaporte",
	ce: "C.E."
}

export function SupplierCard({
	supplier,
	isSelected,
	onClick
}: SupplierCardProps): React.ReactElement {
	const documentType = Object.keys(supplier.document)[0]
	const documentNumber = Object.values(supplier.document)[0]

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
					<p className="font-medium text-slate-800 truncate">{supplier.businessName}</p>
					<p className="text-sm text-slate-500 truncate">
						{UserUtils.getFullname(supplier)}
					</p>
					<p className="text-xs text-slate-400 mt-0.5">
						{DOCUMENT_LABELS[documentType]}: {documentNumber}
					</p>
				</div>
				<div className="flex flex-col items-end gap-1 shrink-0">
					<Badge
						variant={supplier.paymentCondition === "credit" ? "default" : "secondary"}
						className="text-xs"
					>
						{supplier.paymentCondition === "credit" ? "Crédito" : "Contado"}
					</Badge>
					{supplier.debtBalance > 0 && (
						<Badge variant="destructive" className="text-xs">
							Debe S/. {supplier.debtBalance.toFixed(2)}
						</Badge>
					)}
				</div>
			</div>
		</button>
	)
}
