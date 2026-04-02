import { TillBalance, CashMovement } from "@renderer/types"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"

interface TillSummaryProps {
	till: TillBalance
	movements: CashMovement[]
}

const TYPE_LABELS: Record<string, string> = {
	till_init: "Apertura",
	till_close: "Cierre",
	operating_expense: "Gasto operativo",
	bank_deposit: "Depósito banco",
	change_fund: "Fondo de cambio",
	adjustment: "Ajuste",
	other: "Otro"
}

export function TillSummary({ till, movements }: TillSummaryProps): React.ReactElement {
	const expectedCash =
		till.openingAmount + till.totalCash + till.totalDeposits - till.totalWithdrawals

	const isClosed = till.closedAt !== null

	return (
		<div className="flex flex-col gap-4">
			{/* Estado */}
			<div className="flex items-center justify-between">
				<Badge variant={isClosed ? "secondary" : "default"}>
					{isClosed ? "Cerrada" : "Abierta"}
				</Badge>
				<p className="text-xs text-slate-400">
					{till.openedAt.toDate().toLocaleDateString("es-PE", {
						day: "2-digit",
						month: "long",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit"
					})}
				</p>
			</div>

			{/* Resumen de totales */}
			<div className="grid grid-cols-2 gap-3">
				{[
					{ label: "Total ventas", value: till.totalSales, color: "text-green-600" },
					{ label: "Efectivo", value: till.totalCash, color: "text-slate-800" },
					{ label: "Tarjeta", value: till.totalCard, color: "text-slate-800" },
					{ label: "Crédito", value: till.totalCredit, color: "text-yellow-600" },
					{ label: "Ingresos", value: till.totalDeposits, color: "text-blue-600" },
					{ label: "Retiros", value: till.totalWithdrawals, color: "text-red-600" }
				].map(({ label, value, color }) => (
					<div key={label} className="bg-slate-50 rounded-lg p-3">
						<p className="text-xs text-slate-400">{label}</p>
						<p className={`text-base font-bold ${color}`}>S/. {value.toFixed(2)}</p>
					</div>
				))}
			</div>

			{/* Efectivo esperado */}
			<div className="bg-slate-800 text-white rounded-lg p-4 flex justify-between items-center">
				<span className="text-sm">Efectivo esperado</span>
				<span className="text-xl font-bold">S/. {expectedCash.toFixed(2)}</span>
			</div>

			{/* Diferencia al cierre */}
			{isClosed && till.difference !== null && (
				<div
					className={`rounded-lg p-3 flex justify-between items-center
					${till.difference === 0 ? "bg-green-50" : till.difference > 0 ? "bg-blue-50" : "bg-red-50"}`}
				>
					<span className="text-sm font-medium">
						{till.difference === 0
							? "✓ Cuadró"
							: till.difference > 0
								? "Sobrante"
								: "Faltante"}
					</span>
					<span
						className={`text-sm font-bold
						${till.difference === 0 ? "text-green-700" : till.difference > 0 ? "text-blue-700" : "text-red-700"}`}
					>
						S/. {Math.abs(till.difference).toFixed(2)}
					</span>
				</div>
			)}

			<Separator />

			{/* Historial de movimientos */}
			<div className="flex flex-col gap-2">
				<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
					Movimientos de caja
				</p>
				{movements.length === 0 ? (
					<p className="text-sm text-slate-400 text-center py-4">Sin movimientos</p>
				) : (
					<div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
						{movements.map((m) => (
							<div
								key={m.id}
								className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg"
							>
								<div className="min-w-0">
									<p className="text-xs font-medium text-slate-700">
										{TYPE_LABELS[m.type] ?? m.type}
									</p>
									<p className="text-xs text-slate-400 truncate">{m.reason}</p>
								</div>
								<p
									className={`text-sm font-bold shrink-0 ml-2
									${m.direction === "in" ? "text-green-600" : "text-red-600"}`}
								>
									{m.direction === "in" ? "+" : "-"}S/. {m.amount.toFixed(2)}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
