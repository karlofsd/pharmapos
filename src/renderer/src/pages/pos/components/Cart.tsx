import { useState } from "react"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Separator } from "@renderer/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
import { useCartStore } from "@renderer/store/cartStore"
import { useAuth } from "@renderer/hooks/useAuth"
import { CartItem } from "./CartItem"

export function Cart(): React.ReactElement {
	const { user } = useAuth()
	const { items, subtotal, removeItem, updateQuantity, updatePrice, clear } = useCartStore()

	const isAdmin = user?.role === "admin"
	const [editPriceLotId, setEditPriceLotId] = useState<string | null>(null)
	const [newPrice, setNewPrice] = useState("")
	const [priceReason, setPriceReason] = useState("")

	function handleEditPrice(lotId: string, currentPrice: number): void {
		setEditPriceLotId(lotId)
		setNewPrice(currentPrice.toString())
		setPriceReason("")
	}

	function handleConfirmPrice(): void {
		if (!editPriceLotId || !user) return
		const price = parseFloat(newPrice)
		if (isNaN(price) || price < 0) return
		updatePrice(editPriceLotId, price, user.id, priceReason)
		setEditPriceLotId(null)
	}

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 shrink-0">
				<div className="flex items-center gap-2">
					<ShoppingCart size={16} className="text-slate-600" />
					<span className="font-semibold text-slate-800 text-sm">
						Carrito ({items.length})
					</span>
				</div>
				{items.length > 0 && (
					<button
						onClick={clear}
						className="text-slate-400 hover:text-red-500 transition-colors"
					>
						<Trash2 size={14} />
					</button>
				)}
			</div>

			<Separator />

			{/* Items */}
			<div className="flex-1 overflow-y-auto px-4">
				{items.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full gap-3 py-12">
						<ShoppingCart size={36} className="text-slate-200" />
						<p className="text-sm text-slate-400">El carrito está vacío</p>
					</div>
				) : (
					items.map((item) => (
						<CartItem
							key={item.lotId}
							item={item}
							isAdmin={isAdmin}
							onIncrement={() => updateQuantity(item.lotId, item.quantity + 1)}
							onDecrement={() => updateQuantity(item.lotId, item.quantity - 1)}
							onRemove={() => removeItem(item.lotId)}
							onEditPrice={() => handleEditPrice(item.lotId, item.finalPrice)}
						/>
					))
				)}
			</div>

			{/* Subtotal */}
			{items.length > 0 && (
				<>
					<Separator />
					<div className="px-4 py-3 flex items-center justify-between shrink-0">
						<span className="text-sm text-slate-500">Subtotal</span>
						<span className="font-semibold text-slate-800">
							S/. {subtotal.toFixed(2)}
						</span>
					</div>
				</>
			)}

			{/* Dialog editar precio */}
			<Dialog
				open={editPriceLotId !== null}
				onOpenChange={(open) => !open && setEditPriceLotId(null)}
			>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Modificar precio</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<Label>Nuevo precio (S/.)</Label>
							<Input
								type="number"
								min={0}
								step={0.01}
								value={newPrice}
								onChange={(e) => setNewPrice(e.target.value)}
								autoFocus
							/>
						</div>
						<div className="flex flex-col gap-1">
							<Label>Motivo de la modificación</Label>
							<Input
								placeholder="Ej: Descuento especial..."
								value={priceReason}
								onChange={(e) => setPriceReason(e.target.value)}
							/>
						</div>
						<div className="flex gap-2">
							<Button
								onClick={handleConfirmPrice}
								disabled={!newPrice || !priceReason}
								className="flex-1"
							>
								Confirmar
							</Button>
							<Button variant="outline" onClick={() => setEditPriceLotId(null)}>
								Cancelar
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
