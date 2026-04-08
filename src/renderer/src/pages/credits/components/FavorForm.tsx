import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { useClients } from "@renderer/hooks/useClients"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { UserUtils } from "@renderer/types"

const schema = z.object({
	clientId: z.string().min(1, "Selecciona un cliente"),
	amount: z.number().positive("Debe ser mayor a 0"),
	reason: z.string().min(3, "Describe el motivo")
})

type FormData = z.infer<typeof schema>

interface FavorFormProps {
	onSubmit: (clientId: string, clientName: string, amount: number) => Promise<void>
	onCancel: () => void
}

export function FavorForm({ onSubmit, onCancel }: FavorFormProps): React.ReactElement {
	const { clients } = useClients()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(schema) })

	const clientId = watch("clientId")
	const selectedClient = clients.find((c) => c.id === clientId)

	async function handleFormSubmit(data: FormData): Promise<void> {
		if (!selectedClient) return
		setIsSubmitting(true)
		try {
			await onSubmit(data.clientId, UserUtils.getFullname(selectedClient), data.amount)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			<div className="bg-blue-50 rounded-lg p-3">
				<p className="text-sm text-blue-800 font-medium">Crear saldo a favor</p>
				<p className="text-xs text-blue-600 mt-0.5">
					El cliente podrá usar este saldo en futuras compras
				</p>
			</div>

			<div className="flex flex-col gap-1">
				<Label>Cliente</Label>
				<Select value={clientId} onValueChange={(val) => setValue("clientId", val)}>
					<SelectTrigger>
						<SelectValue placeholder="Selecciona un cliente..." />
					</SelectTrigger>
					<SelectContent>
						{clients.map((c) => (
							<SelectItem key={c.id} value={c.id}>
								{UserUtils.getFullname(c)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.clientId && (
					<p className="text-xs text-red-500">{errors.clientId.message}</p>
				)}
			</div>

			{selectedClient && selectedClient.favorBalance > 0 && (
				<div className="bg-green-50 rounded-lg px-3 py-2 text-xs text-green-700">
					Saldo a favor actual: S/. {selectedClient.favorBalance.toFixed(2)}
				</div>
			)}

			<div className="flex flex-col gap-1">
				<Label>Monto (S/.)</Label>
				<Input
					{...register("amount", { valueAsNumber: true })}
					type="number"
					min={0.01}
					step={0.01}
					placeholder="0.00"
				/>
				{errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
			</div>

			<div className="flex flex-col gap-1">
				<Label>Motivo</Label>
				<Input
					{...register("reason")}
					placeholder="Ej: Devolución de producto, pago en exceso..."
				/>
				{errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
			</div>

			<div className="flex gap-2">
				<Button type="submit" disabled={isSubmitting} className="flex-1">
					{isSubmitting ? "Creando..." : "Crear saldo a favor"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}
