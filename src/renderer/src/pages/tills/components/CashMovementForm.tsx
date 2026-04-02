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
import { CashMovementType } from "@renderer/types"
import { useState } from "react"

const schema = z.object({
	amount: z.number().positive("Debe ser mayor a 0"),
	type: z.enum(["operating_expense", "bank_deposit", "change_fund", "adjustment", "other"]),
	reason: z.string().min(3, "Describe el motivo")
})

type FormData = z.infer<typeof schema>

const TYPE_LABELS: Record<string, string> = {
	operating_expense: "Gasto operativo",
	bank_deposit: "Depósito banco",
	change_fund: "Fondo de cambio",
	adjustment: "Ajuste",
	other: "Otro"
}

interface CashMovementFormProps {
	direction: "in" | "out"
	onSubmit: (type: CashMovementType, amount: number, reason: string) => Promise<void>
	onCancel: () => void
}

export function CashMovementForm({
	direction,
	onSubmit,
	onCancel
}: CashMovementFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { type: "other" }
	})

	async function handleFormSubmit(data: FormData): Promise<void> {
		setIsSubmitting(true)
		try {
			await onSubmit(data.type as CashMovementType, data.amount, data.reason)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			<div className="bg-slate-50 rounded-lg p-3">
				<p className="text-sm font-medium text-slate-700">
					{direction === "in" ? "➕ Ingreso a caja" : "➖ Retiro de caja"}
				</p>
			</div>
			<div className="flex flex-col gap-1">
				<Label>Tipo</Label>
				<Select
					value={watch("type")}
					onValueChange={(val) => setValue("type", val as FormData["type"])}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(TYPE_LABELS).map(([val, label]) => (
							<SelectItem key={val} value={val}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-1">
				<Label>Monto (S/.)</Label>
				<Input
					{...register("amount", { valueAsNumber: true })}
					type="number"
					min={0}
					step={0.01}
					placeholder="0.00"
				/>
				{errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
			</div>
			<div className="flex flex-col gap-1">
				<Label>Motivo</Label>
				<Input {...register("reason")} placeholder="Describe el motivo..." />
				{errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
			</div>
			<div className="flex gap-2">
				<Button type="submit" disabled={isSubmitting} className="flex-1">
					{isSubmitting ? "Guardando..." : "Confirmar"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}
