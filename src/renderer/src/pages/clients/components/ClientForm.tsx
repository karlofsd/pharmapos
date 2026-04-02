import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Separator } from "@renderer/components/ui/separator"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { Client, ClientGenre, DocumentType } from "@renderer/types"
import { CreateClientDTO, UpdateClientDTO } from "@renderer/services/clientService"
import { useState } from "react"
import { Timestamp } from "firebase/firestore"
import { useAuth } from "@renderer/hooks/useAuth"

const clientSchema = z.object({
	name: z.string().min(1, "Requerido"),
	lastname: z.string().min(1, "Requerido"),
	documentType: z.enum(["dni", "ruc", "passport", "ce"]),
	documentNumber: z.string().min(1, "Requerido"),
	phoneCode: z.string().min(1, "Requerido"),
	phoneNumber: z.string().min(6, "Requerido"),
	email: z.string().email("Email inválido").optional().or(z.literal("")),
	genre: z.enum(["male", "female", "other"]),
	birthday: z.string().min(1, "Requerido"),
	address: z.string().min(1, "Requerido")
})

type ClientFormData = z.infer<typeof clientSchema>

const GENRE_LABELS: Record<ClientGenre, string> = {
	male: "Masculino",
	female: "Femenino",
	other: "Otro"
}

const DOCUMENT_LABELS: Record<DocumentType, string> = {
	dni: "DNI",
	ruc: "RUC",
	passport: "Pasaporte",
	ce: "Carnet de extranjería"
}

interface ClientFormProps {
	client?: Client
	onSubmit: (data: CreateClientDTO | UpdateClientDTO) => Promise<void>
	onCancel: () => void
}

export function ClientForm({ client, onSubmit, onCancel }: ClientFormProps): React.ReactElement {
	const { user } = useAuth()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<ClientFormData>({
		resolver: zodResolver(clientSchema),
		defaultValues: client
			? {
					name: client.name,
					lastname: client.lastname,
					documentType: Object.keys(client.document)[0] as DocumentType,
					documentNumber: Object.values(client.document)[0],
					phoneCode: client.phoneNumber.code,
					phoneNumber: client.phoneNumber.number,
					email: client.email ?? "",
					genre: client.genre,
					birthday: client.birthday.toDate().toISOString().split("T")[0],
					address: client.address
				}
			: {
					documentType: "dni",
					phoneCode: "+51",
					genre: "other"
				}
	})

	async function handleFormSubmit(data: ClientFormData): Promise<void> {
		if (!user) return
		setIsSubmitting(true)
		try {
			const payload = {
				name: data.name,
				lastname: data.lastname,
				document: { [data.documentType]: data.documentNumber } as Record<
					DocumentType,
					string
				>,
				phoneNumber: { code: data.phoneCode, number: data.phoneNumber },
				email: data.email || null,
				genre: data.genre as ClientGenre,
				birthday: Timestamp.fromDate(new Date(data.birthday)),
				address: data.address,
				isActive: true,
				createdBy: user.id
			}
			await onSubmit(payload)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-4 shrink-0">
				<h2 className="font-bold text-slate-800">
					{client ? "Editar cliente" : "Nuevo cliente"}
				</h2>
				<button
					onClick={onCancel}
					className="text-slate-400 hover:text-slate-600 transition-colors"
				>
					<X size={18} />
				</button>
			</div>

			<Separator />

			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
			>
				{/* Datos personales */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Datos personales
					</p>
					<div className="grid grid-cols-2 gap-3">
						<div className="flex flex-col gap-1">
							<Label>Nombre</Label>
							<Input {...register("name")} placeholder="Juan" />
							{errors.name && (
								<p className="text-xs text-red-500">{errors.name.message}</p>
							)}
						</div>
						<div className="flex flex-col gap-1">
							<Label>Apellido</Label>
							<Input {...register("lastname")} placeholder="Pérez" />
							{errors.lastname && (
								<p className="text-xs text-red-500">{errors.lastname.message}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<Label>Género</Label>
						<Select
							value={watch("genre")}
							onValueChange={(val) => setValue("genre", val as ClientGenre)}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{(Object.entries(GENRE_LABELS) as [ClientGenre, string][]).map(
									([val, label]) => (
										<SelectItem key={val} value={val}>
											{label}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col gap-1">
						<Label>Fecha de nacimiento</Label>
						<Input {...register("birthday")} type="date" />
						{errors.birthday && (
							<p className="text-xs text-red-500">{errors.birthday.message}</p>
						)}
					</div>
				</div>

				<Separator />

				{/* Documento */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Documento
					</p>
					<div className="flex gap-2">
						<div className="flex flex-col gap-1 w-36">
							<Label>Tipo</Label>
							<Select
								value={watch("documentType")}
								onValueChange={(val) =>
									setValue("documentType", val as DocumentType)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{(
										Object.entries(DOCUMENT_LABELS) as [DocumentType, string][]
									).map(([val, label]) => (
										<SelectItem key={val} value={val}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<Label>Número</Label>
							<Input {...register("documentNumber")} placeholder="00000000" />
							{errors.documentNumber && (
								<p className="text-xs text-red-500">
									{errors.documentNumber.message}
								</p>
							)}
						</div>
					</div>
				</div>

				<Separator />

				{/* Contacto */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Contacto
					</p>
					<div className="flex gap-2">
						<div className="flex flex-col gap-1 w-20">
							<Label>Código</Label>
							<Input {...register("phoneCode")} placeholder="+51" />
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<Label>Teléfono</Label>
							<Input {...register("phoneNumber")} placeholder="999999999" />
							{errors.phoneNumber && (
								<p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<Label>Email (opcional)</Label>
						<Input {...register("email")} type="email" placeholder="juan@email.com" />
						{errors.email && (
							<p className="text-xs text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Dirección</Label>
						<Input {...register("address")} placeholder="Av. Principal 123" />
						{errors.address && (
							<p className="text-xs text-red-500">{errors.address.message}</p>
						)}
					</div>
				</div>

				<Separator />

				<div className="flex gap-2 pb-2">
					<Button type="submit" disabled={isSubmitting} className="flex-1">
						{isSubmitting
							? "Guardando..."
							: client
								? "Guardar cambios"
								: "Crear cliente"}
					</Button>
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancelar
					</Button>
				</div>
			</form>
		</div>
	)
}
