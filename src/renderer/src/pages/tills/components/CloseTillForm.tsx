import { useState } from "react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { TillBalance } from "@renderer/types"

interface CloseTillFormProps {
	till: TillBalance
	onConfirm: (closingAmount: number) => Promise<void>
	onCancel: () => void
}

export function CloseTillForm({
	till,
	onConfirm,
	onCancel
}: CloseTillFormProps): React.ReactElement {
	const [closingAmount, setClosingAmount] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const expectedCash =
		till.openingAmount + till.totalCash + till.totalDeposits - till.totalWithdrawals

	const closing = parseFloat(closingAmount) || 0
	const difference = closing - expectedCash

	async function handleConfirm(): Promise<void> {
		if (!closingAmount) return
		setIsSubmitting(true)
		try {
			await onConfirm(closing)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2 bg-slate-50 rounded-lg p-4">
				{[
					{ label: "Monto apertura", value: till.openingAmount },
					{ label: "Ventas efectivo", value: till.totalCash },
					{ label: "Ingresos manuales", value: till.totalDeposits },
					{ label: "Retiros", value: -till.totalWithdrawals }
				].map(({ label, value }) => (
					<div key={label} className="flex justify-between text-sm">
						<span className="text-slate-500">{label}</span>
						<span
							className={`font-medium ${value < 0 ? "text-red-600" : "text-slate-800"}`}
						>
							S/. {Math.abs(value).toFixed(2)}
						</span>
					</div>
				))}
				<div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold">
					<span className="text-slate-700">Efectivo esperado</span>
					<span className="text-slate-800">S/. {expectedCash.toFixed(2)}</span>
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<Label>Efectivo contado (S/.)</Label>
				<Input
					type="number"
					min={0}
					step={0.01}
					placeholder="0.00"
					value={closingAmount}
					onChange={(e) => setClosingAmount(e.target.value)}
					autoFocus
				/>
			</div>

			{closingAmount && (
				<div
					className={`rounded-lg p-3 flex justify-between items-center
					${difference === 0 ? "bg-green-50" : difference > 0 ? "bg-blue-50" : "bg-red-50"}`}
				>
					<span className="text-sm font-medium">
						{difference === 0
							? "✓ Caja cuadra"
							: difference > 0
								? "Sobrante"
								: "Faltante"}
					</span>
					<span
						className={`text-sm font-bold
						${difference === 0 ? "text-green-700" : difference > 0 ? "text-blue-700" : "text-red-700"}`}
					>
						S/. {Math.abs(difference).toFixed(2)}
					</span>
				</div>
			)}

			<div className="flex gap-2">
				<Button
					onClick={handleConfirm}
					disabled={!closingAmount || isSubmitting}
					className="flex-1"
				>
					{isSubmitting ? "Cerrando..." : "Cerrar caja"}
				</Button>
				<Button variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</div>
	)
}
