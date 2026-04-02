import { useState } from "react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Order } from "@renderer/types"
import { ReceiveOrderDTO } from "@renderer/services/orderService"

interface ReceiveItem {
	productId: string
	productName: string
	orderedQuantity: number
	lotNumber: string
	receivedQuantity: number
	expirationDate: string
	purchasePrice: number
	sellPrice: number
}

interface ReceiveOrderFormProps {
	order: Order
	onSubmit: (data: Omit<ReceiveOrderDTO, "userId">) => Promise<void>
	onCancel: () => void
}

export function ReceiveOrderForm({
	order,
	onSubmit,
	onCancel
}: ReceiveOrderFormProps): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [items, setItems] = useState<ReceiveItem[]>(
		order.items.map((item) => ({
			productId: item.productId,
			productName: item.productName ?? "",
			orderedQuantity: item.orderedQuantity,
			lotNumber: "",
			receivedQuantity: item.orderedQuantity,
			expirationDate: "",
			purchasePrice: item.purchasePrice,
			sellPrice: item.sellPrice
		}))
	)

	function updateItem(index: number, field: keyof ReceiveItem, value: string | number): void {
		setItems((prev) =>
			prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
		)
	}

	async function handleSubmit(): Promise<void> {
		const validItems = items.filter(
			(i) => i.receivedQuantity > 0 && i.lotNumber && i.expirationDate
		)
		if (validItems.length === 0) return

		setIsSubmitting(true)
		try {
			await onSubmit({
				orderId: order.id,
				items: validItems.map((i) => ({
					productId: i.productId,
					lotNumber: i.lotNumber,
					receivedQuantity: i.receivedQuantity,
					expirationDate: new Date(i.expirationDate),
					purchasePrice: i.purchasePrice,
					sellPrice: i.sellPrice
				}))
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-blue-50 rounded-lg p-3">
				<p className="text-sm font-medium text-blue-800">
					Pedido #{order.id.slice(-8).toUpperCase()}
				</p>
				<p className="text-xs text-blue-600">{order.items.length} productos</p>
			</div>

			<div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
				{items.map((item, index) => (
					<div key={index} className="flex flex-col gap-2 bg-slate-50 rounded-lg p-3">
						<p className="text-sm font-medium text-slate-800">{item.productName}</p>
						<p className="text-xs text-slate-500">
							Pedido: {item.orderedQuantity} unidades
						</p>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex flex-col gap-1">
								<Label className="text-xs">Cantidad recibida</Label>
								<Input
									type="number"
									min={0}
									max={item.orderedQuantity}
									value={item.receivedQuantity}
									onChange={(e) =>
										updateItem(
											index,
											"receivedQuantity",
											parseInt(e.target.value) || 0
										)
									}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<Label className="text-xs">Número de lote</Label>
								<Input
									placeholder="LT-2024-001"
									value={item.lotNumber}
									onChange={(e) => updateItem(index, "lotNumber", e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<Label className="text-xs">Vencimiento</Label>
								<Input
									type="date"
									value={item.expirationDate}
									onChange={(e) =>
										updateItem(index, "expirationDate", e.target.value)
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
				))}
			</div>

			<div className="flex gap-2">
				<Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
					{isSubmitting ? "Procesando..." : "Confirmar recepción"}
				</Button>
				<Button variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
			</div>
		</div>
	)
}
