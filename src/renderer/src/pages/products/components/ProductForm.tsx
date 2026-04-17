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
import { CategorySelector } from "@renderer/components/ui/CategorySelector"
import { DCISelector } from "@renderer/components/ui/DCISelector"
import { useDCI } from "@renderer/hooks/useDCI"
import { Product, ProductCategory, ProductDCI } from "@renderer/types"
import { CreateProductDTO, UpdateProductDTO } from "@renderer/services/productService"
import { useState, useEffect } from "react"
import { useCatalogs } from "@renderer/hooks/useCatalogs"
import { LabSelector } from "@renderer/components/ui/LabSelector"
import { PRESENTATION_LABELS } from "@renderer/core/constants"

const productSchema = z.object({
	brand: z.string().min(1, "Requerido").toUpperCase(),
	manufacturer: z.string().min(1, "Requerido"),
	barcode: z.string().min(1, "Requerido"),
	altcode: z.string(),
	presentation: z.enum([
		"tablet",
		"capsule",
		"syrup",
		"injection",
		"ointment",
		"cream",
		"gel",
		"powder",
		"other"
	]),
	minStock: z.number().min(0, "Debe ser mayor o igual a 0"),
	requiredPrescription: z.boolean(),
	dataSource: z.enum(["manual", "external"])
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
	product?: Product
	onSubmit: (data: CreateProductDTO | UpdateProductDTO) => Promise<void>
	onCancel: () => void
}

export default function ProductForm({
	product,
	onSubmit,
	onCancel
}: ProductFormProps): React.ReactElement {
	const { dcis, createDCI } = useDCI()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
		product?.categories ?? []
	)
	const [selectedDCIs, setSelectedDCIs] = useState<ProductDCI[]>(product?.dci ?? [])
	const { catalogs, addLab } = useCatalogs()
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: product
			? {
					brand: product.brand,
					manufacturer: product.manufacturer,
					barcode: product.barcode,
					altcode: product.altcode.join(", "),
					presentation: product.presentation,
					minStock: product.minStock,
					requiredPrescription: product.requiredPrescription,
					dataSource: product.dataSource
				}
			: {
					dataSource: "manual",
					requiredPrescription: false,
					minStock: 0
				}
	})

	// Sincronizar categorías desde DCI seleccionados
	useEffect(() => {
		const dciCategories = selectedDCIs
			.map((item) => dcis.find((d) => d.id === item.dciId)?.categories)
			.flat()
			.filter((c): c is ProductCategory => c !== undefined)

		setSelectedCategories((prev) => {
			const merged = Array.from(new Set([...prev, ...dciCategories]))
			return merged
		})
	}, [selectedDCIs, dcis])

	// Categorías bloqueadas — vienen de los DCI seleccionados
	const dciCategories = selectedDCIs
		.map((item) => dcis.find((d) => d.id === item.dciId)?.categories)
		.flat()
		.filter((c): c is ProductCategory => c !== undefined)

	async function handleFormSubmit(data: ProductFormData): Promise<void> {
		setIsSubmitting(true)
		try {
			const altcode = data.altcode
				.split(",")
				.map((c) => c.trim())
				.filter(Boolean)

			if (!catalogs.labs.includes(data.manufacturer)) {
				await addLab(data.manufacturer)
			}

			await onSubmit({
				brand: data.brand,
				manufacturer: data.manufacturer,
				barcode: data.barcode,
				altcode,
				presentation: data.presentation,
				minStock: data.minStock,
				requiredPrescription: data.requiredPrescription,
				dataSource: data.dataSource,
				categories: selectedCategories,
				dci: selectedDCIs,
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
					{product ? "Editar producto" : "Nuevo producto"}
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
				{/* Identificación */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Identificación
					</p>
					<div className="flex flex-col gap-1">
						<Label>Nombre comercial</Label>
						<Input {...register("brand")} placeholder="Ej: Amoxil" />
						{errors.brand && (
							<p className="text-xs text-red-500">{errors.brand.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Laboratorio</Label>
						<LabSelector
							labs={catalogs.labs}
							value={watch("manufacturer")}
							onChange={(lab) => setValue("manufacturer", lab)}
						/>
						{errors.manufacturer && (
							<p className="text-xs text-red-500">{errors.manufacturer.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Código de barras</Label>
						<Input {...register("barcode")} placeholder="Ej: 7501234567890" />
						{errors.barcode && (
							<p className="text-xs text-red-500">{errors.barcode.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Códigos alternos</Label>
						<Input
							{...register("altcode")}
							placeholder="Separados por coma: ABC, 123"
						/>
						<p className="text-xs text-slate-400">Separa múltiples códigos con comas</p>
					</div>
				</div>

				<Separator />

				{/* Presentación */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Presentación
					</p>
					<div className="flex flex-col gap-1">
						<Label>Tipo de presentación</Label>
						<Select
							value={watch("presentation")}
							onValueChange={(val) =>
								setValue("presentation", val as ProductFormData["presentation"])
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecciona..." />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(PRESENTATION_LABELS).map(([val, label]) => (
									<SelectItem key={val} value={val}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.presentation && (
							<p className="text-xs text-red-500">{errors.presentation.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label>Stock mínimo</Label>
						<Input
							{...register("minStock", { valueAsNumber: true })}
							type="number"
							min={0}
							placeholder="Ej: 10"
						/>
						{errors.minStock && (
							<p className="text-xs text-red-500">{errors.minStock.message}</p>
						)}
					</div>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="requiredPrescription"
							{...register("requiredPrescription")}
							className="w-4 h-4"
						/>
						<Label htmlFor="requiredPrescription">Requiere receta médica</Label>
					</div>
				</div>

				<Separator />

				{/* Categorías */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Categorías
					</p>
					<p className="text-xs text-slate-400">
						Las categorías marcadas en gris vienen de los DCI seleccionados
					</p>
					<CategorySelector
						categories={catalogs.categories}
						selected={selectedCategories}
						onChange={setSelectedCategories}
						disabled={dciCategories}
					/>
				</div>

				<Separator />

				{/* DCI */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Principios activos (DCI) — opcional
					</p>
					<DCISelector
						dcis={dcis}
						selected={selectedDCIs}
						onChange={setSelectedDCIs}
						onCreateDCI={createDCI}
					/>
				</div>

				<Separator />

				{/* Acciones */}
				<div className="flex gap-2 pb-2">
					<Button type="submit" disabled={isSubmitting} className="flex-1">
						{isSubmitting
							? "Guardando..."
							: product
								? "Guardar cambios"
								: "Crear producto"}
					</Button>
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancelar
					</Button>
				</div>
			</form>
		</div>
	)
}
