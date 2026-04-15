import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { UseBusiness } from "@renderer/hooks/useBusiness"
import { Loader2, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
	ruc: z.string().min(11),
	socialReason: z.string().min(1, "Requerido"),
	name: z.string().min(1, "Requerido"),
	address: z.string().min(1, "Requerido"),
	phoneNumber: z.string().min(1, "Requerido"),
	department: z.string().optional().or(z.literal("")),
	province: z.string().optional().or(z.literal("")),
	district: z.string().optional().or(z.literal(""))
})

type FormData = z.infer<typeof schema>

export function BusinessForm(): React.ReactElement {
	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
		reset
	} = useForm<FormData>({ resolver: zodResolver(schema) })
	const {
		ruc,
		socialReason,
		name,
		address,
		department,
		province,
		district,
		phoneNumber,
		save,
		isLoading
	} = UseBusiness()
	const [isQuerying, setIsQuerying] = useState(false)
	const [queryError, setQueryError] = useState<string | null>(null)

	useEffect(() => {
		console.log({
			ruc,
			socialReason,
			name,
			address,
			department,
			province,
			district,
			phoneNumber
		})
		if (!isLoading)
			reset({
				ruc,
				socialReason,
				name,
				address,
				department,
				province,
				district,
				phoneNumber
			})
	}, [isLoading])

	async function handleQueryDocument(): Promise<void> {
		const docNumber = watch("ruc")

		if (!docNumber || docNumber.length < 8) return

		setIsQuerying(true)
		setQueryError(null)

		try {
			const result = await window.electron.ipcRenderer.invoke(
				"document:query",
				"ruc",
				docNumber,
				import.meta.env.VITE_DECOLECTA_API_KEY
			)

			if (!result.success) {
				setQueryError(result.error)
				return
			}

			const data = result.data

			if (data.estado === "INACTIVO") {
				setQueryError("RUC inactivo en SUNAT")
				return
			}
			setValue("socialReason", data.razon_social ?? "")
			setValue(
				"address",
				[data.direccion, data.distrito, data.provincia, data.departamento]
					.filter(Boolean)
					.join(", ")
			)
		} catch {
			setQueryError("Error al consultar el documento")
		} finally {
			setIsQuerying(false)
		}
	}

	async function handleFormSubmit(data: FormData): Promise<void> {
		await save(data)
	}

	return (
		<form className="flex flex-col gap-3" onSubmit={handleSubmit(handleFormSubmit)}>
			<div className="flex flex-col gap-1 flex-1">
				<Label>RUC</Label>
				<div className="flex gap-2">
					<Input {...register("ruc")} placeholder="00000000000" value={watch("ruc")} />
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={handleQueryDocument}
						disabled={isQuerying || !watch("ruc")}
						title="Consultar documento"
					>
						{isQuerying ? (
							<Loader2 size={14} className="animate-spin" />
						) : (
							<Search size={14} />
						)}
					</Button>
				</div>
				{errors.ruc && <p className="text-xs text-red-500">{errors.ruc.message}</p>}
				{queryError && <p className="text-xs text-red-500">{queryError}</p>}
			</div>
			<div className="flex flex-col gap-1 flex-1">
				<Label>Razón Social</Label>
				<Input
					{...register("socialReason")}
					placeholder="Ingresa nombre completo"
					value={watch("socialReason")}
				/>
				{errors.socialReason && (
					<p className="text-xs text-red-500">{errors.socialReason.message}</p>
				)}
			</div>
			<div className="flex flex-col gap-1 flex-1">
				<Label>Nombre Comercial</Label>
				<Input
					{...register("name")}
					placeholder="Ingresa nombre de negocio"
					value={watch("name")}
				/>
				{errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
			</div>
			<div className="flex flex-col gap-1 flex-1">
				<Label>Dirección</Label>
				<Input {...register("address")} placeholder="" />
				{errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="flex flex-col gap-1 ">
					<Label>Departamento</Label>
					<Input {...register("department")} placeholder="" />
					{errors.department && (
						<p className="text-xs text-red-500">{errors.department.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-1 ">
					<Label>Provincia</Label>
					<Input {...register("province")} placeholder="" />
					{errors.province && (
						<p className="text-xs text-red-500">{errors.province.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Label>Distrito</Label>
					<Input {...register("district")} placeholder="" />
					{errors.district && (
						<p className="text-xs text-red-500">{errors.district.message}</p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-1 flex-1">
				<Label>Teléfono</Label>
				<Input {...register("phoneNumber")} placeholder="" />
				{errors.phoneNumber && (
					<p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
				)}
			</div>

			<div className="flex flex-1">
				<Button disabled={isLoading} className="w-full" type="submit">
					Guardar
				</Button>
			</div>
		</form>
	)
}
