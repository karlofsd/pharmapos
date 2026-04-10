import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Product, UserUtils } from "@renderer/types"
import { CreateLotDTO } from "@renderer/services/lotService"
import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { useProducts } from "@renderer/hooks/useProducts"
import { useSuppliers } from "@renderer/hooks/useSuppliers"

const lotSchema = z.object({
	productId: z.string().min(1, "Selecciona un producto"),
	numberLot: z.string().min(1, "Requerido"),
	expirationDate: z.string().min(1, "Requerido"),
	initialStock: z.number().min(1, "Debe ser mayor a 0"),
	purchasePrice: z.number().min(0, "Requerido"),
	sellPrice: z.number().min(0, "Requerido"),
	manufacturer: z.string().min(1, "Requerido"),
	supplierId: z.string("Requerido")
})

type LotFormData = z.infer<typeof lotSchema>

interface LotFormProps {
	productId?: string
	onSubmit: (data: CreateLotDTO) => Promise<void>
	onCancel: () => void
	submitLabel?: string
	cancelLabel?: string
}

export function LotForm({
	productId,
	onSubmit,
	onCancel,
	submitLabel = "Agregar lote",
	cancelLabel = "Cancelar"
}: LotFormProps): React.ReactElement {
	const { products } = useProducts()
	const { suppliers } = useSuppliers()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<LotFormData>({
		resolver: zodResolver(lotSchema),
		defaultValues: {
			initialStock: 0,
			purchasePrice: 0,
			sellPrice: 0
		}
	})

	useEffect(() => {
		if (productId) {
			setValue("productId", productId)
			const product = products.find((p) => p.id === productId)
			if (product) {
				setSelectedProduct(product)
				setValue("manufacturer", product.manufacturer)
			}
		}
	}, [productId, products, setValue])

	async function handleFormSubmit(data: LotFormData): Promise<void> {
		setIsSubmitting(true)
		try {
			const expirationDate = Timestamp.fromDate(new Date(data.expirationDate))
			await onSubmit({
				productId: data.productId,
				numberLot: data.numberLot,
				manufacturer: data.manufacturer,
				brand: selectedProduct?.brand ?? "",
				expirationDate,
				supplierId: data.supplierId,
				initialStock: data.initialStock,
				stock: data.initialStock,
				purchasePrice: data.purchasePrice,
				sellPrice: data.sellPrice,
				isActive: true
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
			{/* Producto */}
			<div className="flex flex-col gap-1">
				<Label>Producto</Label>
				<Select
					value={watch("productId")}
					onValueChange={(val) => {
						setValue("productId", val)
						const product = products.find((p) => p.id === val) ?? null
						setSelectedProduct(product)
						if (product) setValue("manufacturer", product.manufacturer)
					}}
					disabled={!!productId}
				>
					<SelectTrigger>
						<SelectValue placeholder="Selecciona un producto..." />
					</SelectTrigger>
					<SelectContent>
						{products.map((p) => (
							<SelectItem key={p.id} value={p.id}>
								{p.brand} — {p.presentation} - {p.manufacturer}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.productId && (
					<p className="text-xs text-red-500">{errors.productId.message}</p>
				)}
			</div>

			<div className="flex flex-col gap-1">
				<Label>Proveedor (opcional)</Label>
				<Select
					value={watch("supplierId")}
					onValueChange={(val) => setValue("supplierId", val)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Sin proveedor" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="none">Sin proveedor</SelectItem>
						{suppliers.map((s) => (
							<SelectItem key={s.id} value={s.id}>
								{s.businessName != "" ? s.businessName : UserUtils.getFullname(s)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.supplierId && (
					<p className="text-xs text-red-500">{errors.supplierId.message}</p>
				)}
			</div>

			{/* Número de lote */}
			<div className="flex flex-col gap-1">
				<Label>Número de lote</Label>
				<Input {...register("numberLot")} placeholder="Ej: LT-2024-001" />
				{errors.numberLot && (
					<p className="text-xs text-red-500">{errors.numberLot.message}</p>
				)}
			</div>

			{/* Fecha de vencimiento */}
			<div className="flex flex-col gap-1">
				<Label>Fecha de vencimiento</Label>
				<Input {...register("expirationDate")} type="date" />
				{errors.expirationDate && (
					<p className="text-xs text-red-500">{errors.expirationDate.message}</p>
				)}
			</div>

			{/* Stock inicial */}
			<div className="flex flex-col gap-1">
				<Label>Stock inicial</Label>
				<Input
					{...register("initialStock", { valueAsNumber: true })}
					type="number"
					min={1}
					placeholder="Ej: 100"
				/>
				{errors.initialStock && (
					<p className="text-xs text-red-500">{errors.initialStock.message}</p>
				)}
			</div>

			{/* Precios */}
			<div className="grid grid-cols-2 gap-3">
				<div className="flex flex-col gap-1">
					<Label>Precio compra (S/.)</Label>
					<Input
						{...register("purchasePrice", { valueAsNumber: true })}
						type="number"
						min={0}
						step={0.01}
						placeholder="0.00"
					/>
					{errors.purchasePrice && (
						<p className="text-xs text-red-500">{errors.purchasePrice.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Label>Precio venta (S/.)</Label>
					<Input
						{...register("sellPrice", { valueAsNumber: true })}
						type="number"
						min={0}
						step={0.01}
						placeholder="0.00"
					/>
					{errors.sellPrice && (
						<p className="text-xs text-red-500">{errors.sellPrice.message}</p>
					)}
				</div>
			</div>

			{/* Acciones */}
			<div className="flex gap-2 pt-2">
				<Button type="submit" disabled={isSubmitting} className="flex-1">
					{isSubmitting ? "Guardando..." : submitLabel}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					{cancelLabel}
				</Button>
			</div>
		</form>
	)
}
