import { Credit } from "@renderer/types"
import { Badge } from "@renderer/components/ui/badge"
import { Button } from "@renderer/components/ui/button"
import { cn } from "@renderer/lib/utils"
import { CreditCard as Card, Wallet } from "lucide-react"

interface CreditCardProps {
	credit: Credit
	isSelected: boolean
	onClick: () => void
	onPay: () => void
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	paid: { label: "Pagado", className: "bg-green-100 text-green-700 border-green-200" },
	overdue: { label: "Vencido", className: "bg-red-100 text-red-700 border-red-200" }
}

export function CreditCard({
	credit,
	isSelected,
	onClick,
	onPay
}: CreditCardProps): React.ReactElement {
	const statusConfig = STATUS_CONFIG[credit.status] ?? STATUS_CONFIG.pending
	const isDebt = credit.type === "debt"
	const canPay = credit.status !== "paid" && isDebt

	return (
		<div
			onClick={onClick}
			className={cn(
				"w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer",
				"hover:bg-slate-50 hover:border-slate-300",
				isSelected ? "bg-blue-50 border-blue-300" : "bg-white border-slate-200"
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						{isDebt ? (
							<Card size={14} className="text-red-400 shrink-0" />
						) : (
							<Wallet size={14} className="text-green-500 shrink-0" />
						)}
						<p className="font-medium text-slate-800 truncate text-sm">
							{credit.clientName}
						</p>
					</div>
					<p className="text-xs text-slate-400 mt-0.5 ml-5">
						Vence: {credit.dueDate.toDate().toLocaleDateString("es-PE")}
					</p>
				</div>
				<div className="flex flex-col items-end gap-1 shrink-0">
					<p
						className={`text-sm font-bold ${isDebt ? "text-red-600" : "text-green-600"}`}
					>
						S/. {credit.balance.toFixed(2)}
					</p>
					<Badge variant="outline" className={`text-xs ${statusConfig.className}`}>
						{statusConfig.label}
					</Badge>
				</div>
			</div>
			{canPay && (
				<div className="mt-2 ml-5">
					<Button
						size="sm"
						variant="outline"
						className="h-7 text-xs"
						onClick={(e) => {
							e.stopPropagation()
							onPay()
						}}
					>
						Registrar abono
					</Button>
				</div>
			)}
		</div>
	)
}
