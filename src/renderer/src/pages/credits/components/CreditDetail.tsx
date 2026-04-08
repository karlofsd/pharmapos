import { X } from "lucide-react"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"
import { Credit } from "@renderer/types"

interface CreditDetailProps {
	credit: Credit
	onClose: () => void
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	paid: { label: "Pagado", className: "bg-green-100 text-green-700 border-green-200" },
	overdue: { label: "Vencido", className: "bg-red-100 text-red-700 border-red-200" }
}

const PAYMENT_LABELS: Record<string, string> = {
	cash: "Efectivo",
	wallet: "Saldo a favor"
}

export function CreditDetail({ credit, onClose }: CreditDetailProps): React.ReactElement {
	const statusConfig = STATUS_CONFIG[credit.status] ?? STATUS_CONFIG.pending
	const isDebt = credit.type === "debt"

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-start justify-between p-4 shrink-0">
				<div>
					<h2 className="font-bold text-slate-800">{credit.clientName}</h2>
					<p className="text-sm text-slate-500">{isDebt ? "Deuda" : "Saldo a favor"}</p>
				</div>
				<button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-2">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
				{/* Estado y montos */}
				<div className="flex flex-col gap-3">
					<Badge variant="outline" className={`text-xs w-fit ${statusConfig.className}`}>
						{statusConfig.label}
					</Badge>

					<div className="grid grid-cols-3 gap-3">
						<div className="bg-slate-50 rounded-lg p-3 text-center">
							<p className="text-xs text-slate-400">Total</p>
							<p className="text-base font-bold text-slate-800">
								S/. {credit.totalAmount.toFixed(2)}
							</p>
						</div>
						<div className="bg-green-50 rounded-lg p-3 text-center">
							<p className="text-xs text-green-600">Pagado</p>
							<p className="text-base font-bold text-green-700">
								S/. {credit.paidAmount.toFixed(2)}
							</p>
						</div>
						<div
							className={`rounded-lg p-3 text-center ${isDebt ? "bg-red-50" : "bg-blue-50"}`}
						>
							<p className={`text-xs ${isDebt ? "text-red-600" : "text-blue-600"}`}>
								Saldo
							</p>
							<p
								className={`text-base font-bold ${isDebt ? "text-red-700" : "text-blue-700"}`}
							>
								S/. {credit.balance.toFixed(2)}
							</p>
						</div>
					</div>

					<div className="flex justify-between text-sm">
						<span className="text-slate-500">Fecha límite</span>
						<span className="font-medium text-slate-800">
							{credit.dueDate.toDate().toLocaleDateString("es-PE", {
								day: "2-digit",
								month: "long",
								year: "numeric"
							})}
						</span>
					</div>
				</div>

				<Separator />

				{/* Historial de pagos */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Historial de pagos ({credit.payments.length})
					</p>
					{credit.payments.length === 0 ? (
						<p className="text-sm text-slate-400 text-center py-4">
							Sin pagos registrados
						</p>
					) : (
						<div className="flex flex-col gap-2">
							{credit.payments.map((payment, i) => (
								<div
									key={i}
									className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
								>
									<div>
										<p className="text-xs font-medium text-slate-700">
											{PAYMENT_LABELS[payment.paymentMethod]}
										</p>
										<p className="text-xs text-slate-400">
											{payment.createdAt.toDate().toLocaleDateString("es-PE")}
										</p>
									</div>
									<p className="text-sm font-bold text-green-600">
										S/. {payment.amount.toFixed(2)}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
