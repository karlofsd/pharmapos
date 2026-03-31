import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { LotWithProduct } from "@renderer/hooks/useLots"
import { useState } from "react"

const adjustSchema = z.object({
	quantity: z.number().refine((val) => val !== 0, "No puede ser 0"),
	reason: z.string().min(3, "Describe el motivo del ajuste")
})

type AdjustFormData = z.infer<typeof adjustSchema>

interface StockAdjustFormProps {
	lot: LotWithProduct
	onSubmit: (quantity: number, reason: string) => Promise<void>
	onCancel: () => void
}

export function StockAdjustForm({ lot, onSubmit, onCancel }: StockAdjustFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<AdjustFormData>({
		resolver: zodResolver(adjustSchema),
		defaultValues: { quantity: 0 }
	})

	const quantity = watch("quantity") ?? 0
	const newStock = lot.stock + Number(quantity)

	async function handleFormSubmit(data: AdjustFormData): Promise<void> {
		setIsSubmitting(true)
		try {
			await onSubmit(data.quantity, data.reason)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			<div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-1">
				<p className="text-sm font-medium text-slate-800">{lot.product.brand}</p>
				<p className="text-xs text-slate-500">Lote: {lot.numberLot}</p>
				<p className="text-xs text-slate-500">Stock actual: <span className="font-medium">{lot.stock}</span></p>
			</div>

			<div className="flex flex-col gap-1">
				<Label>Cantidad a ajustar</Label>
				<Input
					{...register("quantity", { valueAsNumber: true })}
					type="number"
					placeholder="Positivo para entrada, negativo para salida"
				/>
				<p className="text-xs text-slate-400">
					Usa valores negativos para reducir el stock
				</p>
				{errors.quantity && (
					<p className="text-xs text-red-500">{errors.quantity.message}</p>
				)}
			</div>

			{/* Preview del nuevo stock */}
			{quantity !== 0 && (
				<div className={`rounded-lg p-3 text-sm font-medium text-center
					${newStock < 0
						? "bg-red-50 text-red-600"
						: "bg-green-50 text-green-700"
					}`}
				>
					{newStock < 0
						? "Stock insuficiente"
						: `Nuevo stock: ${newStock} unidades`
					}
				</div>
			)}

			<div className="flex flex-col gap-1">
				<Label>Motivo del ajuste</Label>
				<Input
					{...register("reason")}
					placeholder="Ej: Producto dañado, conteo físico..."
				/>
				{errors.reason && (
					<p className="text-xs text-red-500">{errors.reason.message}</p>
				)}
			</div>

			<div className="flex gap-2 pt-2">
				<Button
					type="submit"
					disabled={isSubmitting || newStock < 0}
					className="flex-1"
				>
					{isSubmitting ? "Guardando..." : "Aplicar ajuste"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}