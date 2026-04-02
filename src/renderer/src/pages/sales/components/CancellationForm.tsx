import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Sale } from "@renderer/types"
import { useState } from "react"

const schema = z.object({
	reason: z.string().min(5, "Describe el motivo con al menos 5 caracteres")
})

type FormData = z.infer<typeof schema>

interface CancellationFormProps {
	sale: Sale
	onConfirm: (reason: string) => Promise<void>
	onCancel: () => void
}

export function CancellationForm({
	sale,
	onConfirm,
	onCancel
}: CancellationFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(schema) })

	async function handleFormSubmit(data: FormData): Promise<void> {
		setIsSubmitting(true)
		try {
			await onConfirm(data.reason)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			<div className="bg-red-50 rounded-lg p-3 flex flex-col gap-1">
				<p className="text-sm font-medium text-red-800">
					Venta #{sale.id.slice(-8).toUpperCase()}
				</p>
				<p className="text-xs text-red-600">
					Total: S/. {sale.totalPrice.toFixed(2)} — {sale.items.length}{" "}
					{sale.items.length === 1 ? "producto" : "productos"}
				</p>
				<p className="text-xs text-red-500 mt-1">
					⚠ Esta acción revertirá el stock y no se puede deshacer
				</p>
			</div>
			<div className="flex flex-col gap-1">
				<Label>Motivo de anulación</Label>
				<Input
					{...register("reason")}
					placeholder="Ej: Error en el cobro, producto devuelto..."
					autoFocus
				/>
				{errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
			</div>
			<div className="flex gap-2">
				<Button
					type="submit"
					variant="destructive"
					disabled={isSubmitting}
					className="flex-1"
				>
					{isSubmitting ? "Anulando..." : "Confirmar anulación"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}
