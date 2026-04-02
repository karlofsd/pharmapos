import { useState } from "react"
import { X, Plus, Trash2 } from "lucide-react"
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
import { useSuppliers } from "@renderer/hooks/useSuppliers"
import { useProducts } from "@renderer/hooks/useProducts"
import { CreateOrderDTO } from "@renderer/services/orderService"
import { OrderItem } from "@renderer/types"

interface OrderFormProps {
	onSubmit: (data: Omit<CreateOrderDTO, "createdBy">) => Promise<void>
	onCancel: () => void
}

export function OrderForm({ onSubmit, onCancel }: OrderFormProps): React.ReactElement {
	const { suppliers } = useSuppliers()
	const { products } = useProducts()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [supplierId, setSupplierId] = useState("")
	const [expectedAt, setExpectedAt] = useState("")
	const [notes, setNotes] = useState("")
	const [items, setItems] = useState<OrderItem[]>([])

	const selectedSupplier = suppliers.find((s) => s.id === supplierId)
	const totalAmount = items.reduce(
		(sum, item) => sum + item.orderedQuantity * item.purchasePrice,
		0
	)

	function addItem(): void {
		setItems((prev) => [
			...prev,
			{
				productId: "",
				productName: "",
				orderedQuantity: 1,
				purchasePrice: 0,
				sellPrice: 0,
				expirationDate: null,
				lotNumber: null
			}
		])
	}

	function removeItem(index: number): void {
		setItems((prev) => prev.filter((_, i) => i !== index))
	}

	function updateItem(index: number, field: keyof OrderItem, value: string | number): void {
		setItems((prev) =>
			prev.map((item, i) => {
				if (i !== index) return item
				if (field === "productId") {
					const product = products.find((p) => p.id === value)
					return {
						...item,
						productId: value as string,
						productName: product?.brand ?? ""
					}
				}
				return { ...item, [field]: value }
			})
		)
	}

	async function handleSubmit(): Promise<void> {
		if (!supplierId || items.length === 0) return
		const validItems = items.filter((i) => i.productId && i.orderedQuantity > 0)
		if (validItems.length === 0) return

		setIsSubmitting(true)
		try {
			await onSubmit({
				supplierId,
				supplierName: selectedSupplier?.businessName ?? "",
				items: validItems,
				notes: notes || null,
				expectedAt: expectedAt ? new Date(expectedAt) : null
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-4 shrink-0">
				<h2 className="font-bold text-slate-800">Nuevo pedido</h2>
				<button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
				{/* Proveedor */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Proveedor
					</p>
					<Select value={supplierId} onValueChange={setSupplierId}>
						<SelectTrigger>
							<SelectValue placeholder="Selecciona un proveedor..." />
						</SelectTrigger>
						<SelectContent>
							{suppliers.map((s) => (
								<SelectItem key={s.id} value={s.id}>
									{s.businessName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="flex flex-col gap-1">
						<Label>Fecha esperada (opcional)</Label>
						<Input
							type="date"
							value={expectedAt}
							onChange={(e) => setExpectedAt(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<Label>Notas (opcional)</Label>
						<Input
							placeholder="Indicaciones..."
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</div>
				</div>

				<Separator />

				{/* Items */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
							Productos
						</p>
						<Button type="button" variant="outline" size="sm" onClick={addItem}>
							<Plus size={14} />
							Agregar
						</Button>
					</div>

					{items.length === 0 ? (
						<p className="text-sm text-slate-400 text-center py-4">
							Agrega al menos un producto
						</p>
					) : (
						items.map((item, index) => (
							<div
								key={index}
								className="flex flex-col gap-2 bg-slate-50 rounded-lg p-3"
							>
								<div className="flex items-center justify-between">
									<p className="text-xs font-medium text-slate-600">
										Ítem {index + 1}
									</p>
									<button
										type="button"
										onClick={() => removeItem(index)}
										className="text-slate-400 hover:text-red-500 transition-colors"
									>
										<Trash2 size={14} />
									</button>
								</div>
								<Select
									value={item.productId}
									onValueChange={(val) => updateItem(index, "productId", val)}
								>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona producto..." />
									</SelectTrigger>
									<SelectContent>
										{products.map((p) => (
											<SelectItem key={p.id} value={p.id}>
												{p.brand} — {p.manufacturer}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<div className="grid grid-cols-3 gap-2">
									<div className="flex flex-col gap-1">
										<Label className="text-xs">Cantidad</Label>
										<Input
											type="number"
											min={1}
											value={item.orderedQuantity}
											onChange={(e) =>
												updateItem(
													index,
													"orderedQuantity",
													parseInt(e.target.value) || 1
												)
											}
										/>
									</div>
									<div className="flex flex-col gap-1">
										<Label className="text-xs">P. Compra</Label>
										<Input
											type="number"
											min={0}
											step={0.01}
											value={item.purchasePrice}
											onChange={(e) =>
												updateItem(
													index,
													"purchasePrice",
													parseFloat(e.target.value) || 0
												)
											}
										/>
									</div>
									<div className="flex flex-col gap-1">
										<Label className="text-xs">P. Venta</Label>
										<Input
											type="number"
											min={0}
											step={0.01}
											value={item.sellPrice}
											onChange={(e) =>
												updateItem(
													index,
													"sellPrice",
													parseFloat(e.target.value) || 0
												)
											}
										/>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{items.length > 0 && (
					<div className="bg-slate-800 text-white rounded-lg p-3 flex justify-between">
						<span className="text-sm">Total estimado</span>
						<span className="font-bold">S/. {totalAmount.toFixed(2)}</span>
					</div>
				)}
			</div>

			<Separator />

			<div className="flex gap-2 p-4 shrink-0">
				<Button
					onClick={handleSubmit}
					disabled={isSubmitting || !supplierId || items.length === 0}
					className="flex-1"
				>
					{isSubmitting ? "Guardando..." : "Crear pedido"}
				</Button>
				<Button variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</div>
	)
}
