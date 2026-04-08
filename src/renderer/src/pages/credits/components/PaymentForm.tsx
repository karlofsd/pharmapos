import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { Credit } from "@renderer/types"

const schema = z.object({
	amount: z.number().positive("Debe ser mayor a 0"),
	paymentMethod: z.enum(["cash", "wallet"])
})

type FormData = z.infer<typeof schema>

interface PaymentFormProps {
	credit: Credit
	clientFavorBalance: number
	onSubmit: (amount: number, method: "cash" | "wallet") => Promise<void>
	onCancel: () => void
}

export function PaymentForm({
	credit,
	clientFavorBalance,
	onSubmit,
	onCancel
}: PaymentFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { paymentMethod: "cash" }
	})

	const amount = watch("amount") ?? 0
	const method = watch("paymentMethod")
	const newBalance = credit.balance - Number(amount)
	const maxWallet = Math.min(credit.balance, clientFavorBalance)

	async function handleFormSubmit(data: FormData): Promise<void> {
		if (data.amount > credit.balance) return
		if (data.paymentMethod === "wallet" && data.amount > clientFavorBalance) return
		setIsSubmitting(true)
		try {
			await onSubmit(data.amount, data.paymentMethod)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			{/* Resumen del crédito */}
			<div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-1">
				<p className="text-sm font-medium text-slate-800">{credit.clientName}</p>
				<div className="flex justify-between text-xs text-slate-500">
					<span>Saldo pendiente</span>
					<span className="font-bold text-red-600">S/. {credit.balance.toFixed(2)}</span>
				</div>
				{clientFavorBalance > 0 && (
					<div className="flex justify-between text-xs text-slate-500">
						<span>Saldo a favor disponible</span>
						<span className="font-bold text-green-600">
							S/. {clientFavorBalance.toFixed(2)}
						</span>
					</div>
				)}
			</div>

			{/* Método de pago */}
			<div className="flex flex-col gap-1">
				<Label>Método de pago</Label>
				<Select
					value={method}
					onValueChange={(val) => setValue("paymentMethod", val as "cash" | "wallet")}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="cash">Efectivo</SelectItem>
						<SelectItem value="wallet" disabled={clientFavorBalance <= 0}>
							Saldo a favor{" "}
							{clientFavorBalance > 0
								? `(S/. ${clientFavorBalance.toFixed(2)})`
								: "(Sin saldo)"}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Monto */}
			<div className="flex flex-col gap-1">
				<Label>Monto a abonar (S/.)</Label>
				<Input
					{...register("amount", { valueAsNumber: true })}
					type="number"
					min={0.01}
					max={method === "wallet" ? maxWallet : credit.balance}
					step={0.01}
					placeholder="0.00"
					autoFocus
				/>
				{errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
				<p className="text-xs text-slate-400">
					Máximo: S/. {(method === "wallet" ? maxWallet : credit.balance).toFixed(2)}
				</p>
			</div>

			{/* Preview nuevo saldo */}
			{amount > 0 && (
				<div
					className={`rounded-lg p-3 flex justify-between text-sm
					${newBalance <= 0 ? "bg-green-50" : "bg-blue-50"}`}
				>
					<span className={newBalance <= 0 ? "text-green-700" : "text-blue-700"}>
						{newBalance <= 0 ? "✓ Crédito saldado" : "Nuevo saldo"}
					</span>
					<span
						className={`font-bold ${newBalance <= 0 ? "text-green-700" : "text-blue-700"}`}
					>
						S/. {Math.max(0, newBalance).toFixed(2)}
					</span>
				</div>
			)}

			<div className="flex gap-2">
				<Button
					type="submit"
					disabled={isSubmitting || !amount || amount <= 0}
					className="flex-1"
				>
					{isSubmitting ? "Registrando..." : "Registrar abono"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}
