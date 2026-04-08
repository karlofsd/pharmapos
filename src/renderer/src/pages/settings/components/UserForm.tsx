import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { User, Role, PermissionLevel } from "@renderer/types"
import { CreateUserDTO, UpdateUserDTO } from "@renderer/services/userService"
import { useState } from "react"

const createSchema = z.object({
	name: z.string().min(1, "Requerido"),
	lastname: z.string().min(1, "Requerido"),
	email: z.email("Email inválido"),
	password: z.string().min(6, "Mínimo 6 caracteres"),
	role: z.enum(["admin", "cashier", "supervisor"]),
	level: z.number().min(1).max(3),
	phoneCode: z.string().min(1),
	phoneNumber: z.string().min(6)
})

const updateSchema = createSchema.omit({ email: true, password: true })

type CreateFormData = z.infer<typeof createSchema>
type UpdateFormData = z.infer<typeof updateSchema>

const ROLE_LABELS: Record<Role, string> = {
	admin: "Administrador",
	cashier: "Cajero",
	supervisor: "Supervisor"
}

const LEVEL_LABELS: Record<number, string> = {
	1: "Nivel 1 — Básico",
	2: "Nivel 2 — Intermedio",
	3: "Nivel 3 — Total"
}

interface UserFormProps {
	user?: User
	onSubmit: (data: CreateUserDTO | UpdateUserDTO) => Promise<void>
	onCancel: () => void
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const isEditing = !!user

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<CreateFormData | UpdateFormData>({
		resolver: zodResolver(isEditing ? updateSchema : createSchema),
		defaultValues: user ? {
			name: user.name,
			lastname: user.lastname,
			role: user.role,
			level: user.level,
			phoneCode: user.phoneNumber.code,
			phoneNumber: user.phoneNumber.number
		} : {
			role: "cashier",
			level: 1,
			phoneCode: "+51"
		}
	})

	async function handleFormSubmit(data: CreateFormData | UpdateFormData): Promise<void> {
		setIsSubmitting(true)
		try {
			if (isEditing) {
				await onSubmit({
					name: data.name,
					lastname: data.lastname,
					role: data.role as Role,
					level: data.level as PermissionLevel,
					phoneNumber: { code: data.phoneCode, number: data.phoneNumber }
				} as UpdateUserDTO)
			} else if ('email' in data) {
				await onSubmit({
					name: data.name,
					lastname: data.lastname,
					email: data.email,
					password: data.password,
					role: data.role as Role,
					level: data.level as PermissionLevel,
					phoneNumber: { code: data.phoneCode, number: data.phoneNumber },
					document: {}
				} as CreateUserDTO)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-3">
				<div className="flex flex-col gap-1">
					<Label>Nombre</Label>
					<Input {...register("name")} placeholder="Juan" />
					{errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
				</div>
				<div className="flex flex-col gap-1">
					<Label>Apellido</Label>
					<Input {...register("lastname")} placeholder="Pérez" />
					{errors.lastname && <p className="text-xs text-red-500">{errors.lastname.message}</p>}
				</div>
			</div>

			{(!isEditing && 'email' in errors) && (
				<>
					<div className="flex flex-col gap-1">
						<Label>Correo electrónico</Label>
						<Input {...register("email")} type="email" placeholder="juan@farmacia.com" />
						{errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Contraseña</Label>
						<Input {...register("password")} type="password" placeholder="••••••••" />
						{errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
					</div>
				</>
			)}

			<div className="flex gap-2">
				<div className="flex flex-col gap-1 w-20">
					<Label>Código</Label>
					<Input {...register("phoneCode")} placeholder="+51" />
				</div>
				<div className="flex flex-col gap-1 flex-1">
					<Label>Teléfono</Label>
					<Input {...register("phoneNumber")} placeholder="999999999" />
				</div>
			</div>

			<Separator />

			<div className="grid grid-cols-2 gap-3">
				<div className="flex flex-col gap-1">
					<Label>Rol</Label>
					<Select
						value={watch("role")}
						onValueChange={(val) => setValue("role", val as Role)}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{(Object.entries(ROLE_LABELS) as [Role, string][]).map(([val, label]) => (
								<SelectItem key={val} value={val}>{label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-col gap-1">
					<Label>Nivel de acceso</Label>
					<Select
						value={String(watch("level"))}
						onValueChange={(val) => setValue("level", parseInt(val) as PermissionLevel)}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(LEVEL_LABELS).map(([val, label]) => (
								<SelectItem key={val} value={val}>{label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex gap-2 pt-2">
				<Button type="submit" disabled={isSubmitting} className="flex-1">
					{isSubmitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear usuario"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}