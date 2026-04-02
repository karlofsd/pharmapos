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
import { Supplier, DocumentType, PaymentCondition } from "@renderer/types"
import { CreateSupplierDTO, UpdateSupplierDTO } from "@renderer/services/supplierService"
import { useState } from "react"

const schema = z.object({
	name: z.string().min(1, "Requerido"),
	lastname: z.string().min(1, "Requerido"),
	businessName: z.string().min(1, "Requerido"),
	documentType: z.enum(["dni", "ruc", "passport", "ce"]),
	documentNumber: z.string().min(1, "Requerido"),
	phoneCode: z.string().min(1, "Requerido"),
	phoneNumber: z.string().min(6, "Requerido"),
	email: z.string().email("Email inválido").optional().or(z.literal("")),
	address: z.string().optional().or(z.literal("")),
	paymentCondition: z.enum(["cash", "credit"]),
	creditDays: z.number().min(0),
	creditLimit: z.number().min(0)
})

type FormData = z.infer<typeof schema>

const DOCUMENT_LABELS: Record<DocumentType, string> = {
	dni: "DNI",
	ruc: "RUC",
	passport: "Pasaporte",
	ce: "C.E."
}

interface SupplierFormProps {
	supplier?: Supplier
	onSubmit: (data: CreateSupplierDTO | UpdateSupplierDTO) => Promise<void>
	onCancel: () => void
}

export function SupplierForm({
	supplier,
	onSubmit,
	onCancel
}: SupplierFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: supplier
			? {
					name: supplier.name,
					lastname: supplier.lastname,
					businessName: supplier.businessName,
					documentType: Object.keys(supplier.document)[0] as DocumentType,
					documentNumber: Object.values(supplier.document)[0],
					phoneCode: supplier.phoneNumber.code,
					phoneNumber: supplier.phoneNumber.number,
					email: supplier.email ?? "",
					address: supplier.address ?? "",
					paymentCondition: supplier.paymentCondition,
					creditDays: supplier.creditDays,
					creditLimit: supplier.creditLimit
				}
			: {
					documentType: "ruc",
					phoneCode: "+51",
					paymentCondition: "cash",
					creditDays: 0,
					creditLimit: 0
				}
	})

	const paymentCondition = watch("paymentCondition")

	async function handleFormSubmit(data: FormData): Promise<void> {
		setIsSubmitting(true)
		try {
			await onSubmit({
				name: data.name,
				lastname: data.lastname,
				businessName: data.businessName,
				document: { [data.documentType]: data.documentNumber } as Record<
					DocumentType,
					string
				>,
				phoneNumber: { code: data.phoneCode, number: data.phoneNumber },
				email: data.email || null,
				address: data.address || null,
				paymentCondition: data.paymentCondition as PaymentCondition,
				creditDays: data.paymentCondition === "credit" ? data.creditDays : 0,
				creditLimit: data.paymentCondition === "credit" ? data.creditLimit : 0,
				hasCredit: data.paymentCondition === "credit",
				debtBalance: supplier?.debtBalance ?? 0,
				favorBalance: supplier?.favorBalance ?? 0,
				isActive: true
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-4 shrink-0">
				<h2 className="font-bold text-slate-800">
					{supplier ? "Editar proveedor" : "Nuevo proveedor"}
				</h2>
				<button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
			>
				{/* Datos del contacto */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Contacto
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
						<Label>Razón social</Label>
						<Input
							{...register("businessName")}
							placeholder="Distribuidora Farma S.A."
						/>
						{errors.businessName && (
							<p className="text-xs text-red-500">{errors.businessName.message}</p>
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
						<div className="flex flex-col gap-1 w-28">
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
							<Input {...register("documentNumber")} placeholder="20000000001" />
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
						Información de contacto
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
						<Input
							{...register("email")}
							type="email"
							placeholder="contacto@proveedor.com"
						/>
						{errors.email && (
							<p className="text-xs text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Dirección (opcional)</Label>
						<Input {...register("address")} placeholder="Av. Industrial 456" />
					</div>
				</div>

				<Separator />

				{/* Condición de pago */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Condición de pago
					</p>
					<div className="flex flex-col gap-1">
						<Label>Tipo</Label>
						<Select
							value={paymentCondition}
							onValueChange={(val) =>
								setValue("paymentCondition", val as PaymentCondition)
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="cash">Contado</SelectItem>
								<SelectItem value="credit">Crédito</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{paymentCondition === "credit" && (
						<div className="grid grid-cols-2 gap-3">
							<div className="flex flex-col gap-1">
								<Label>Días de crédito</Label>
								<Input
									{...register("creditDays", { valueAsNumber: true })}
									type="number"
									min={0}
									placeholder="30"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<Label>Límite (S/.)</Label>
								<Input
									{...register("creditLimit", { valueAsNumber: true })}
									type="number"
									min={0}
									step={0.01}
									placeholder="0.00"
								/>
							</div>
						</div>
					)}
				</div>

				<Separator />

				<div className="flex gap-2 pb-2">
					<Button type="submit" disabled={isSubmitting} className="flex-1">
						{isSubmitting
							? "Guardando..."
							: supplier
								? "Guardar cambios"
								: "Crear proveedor"}
					</Button>
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancelar
					</Button>
				</div>
			</form>
		</div>
	)
}
