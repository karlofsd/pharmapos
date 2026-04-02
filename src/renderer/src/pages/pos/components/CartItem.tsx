import { Minus, Plus, Trash2, Pencil } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { CartItem as CartItemType } from "@renderer/store/cartStore"

interface CartItemProps {
	item: CartItemType
	isAdmin: boolean
	onIncrement: () => void
	onDecrement: () => void
	onRemove: () => void
	onEditPrice: () => void
}

export function CartItem({
	item,
	isAdmin,
	onIncrement,
	onDecrement,
	onRemove,
	onEditPrice
}: CartItemProps): React.ReactElement {
	return (
		<div className="flex flex-col gap-1 py-3 border-b border-slate-100 last:border-0">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<p className="text-sm font-medium text-slate-800 truncate">
						{item.productName}
					</p>
					<div className="flex items-center gap-2 mt-0.5">
						{item.alterPrice !== null ? (
							<>
								<span className="text-xs text-slate-400 line-through">
									S/. {item.unitPrice.toFixed(2)}
								</span>
								<span className="text-xs font-medium text-blue-600">
									S/. {item.finalPrice.toFixed(2)}
								</span>
								<Badge
									variant="outline"
									className="text-xs py-0 text-blue-600 border-blue-200"
								>
									Modificado
								</Badge>
							</>
						) : (
							<span className="text-xs text-slate-500">
								S/. {item.unitPrice.toFixed(2)} c/u
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center gap-1 shrink-0">
					{isAdmin && (
						<Button
							size="icon"
							variant="ghost"
							className="h-6 w-6 text-slate-400 hover:text-blue-600"
							onClick={onEditPrice}
						>
							<Pencil size={11} />
						</Button>
					)}
					<Button
						size="icon"
						variant="ghost"
						className="h-6 w-6 text-slate-400 hover:text-red-500"
						onClick={onRemove}
					>
						<Trash2 size={11} />
					</Button>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					<Button size="icon" variant="outline" className="h-6 w-6" onClick={onDecrement}>
						<Minus size={11} />
					</Button>
					<span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
					<Button size="icon" variant="outline" className="h-6 w-6" onClick={onIncrement}>
						<Plus size={11} />
					</Button>
				</div>
				<span className="text-sm font-bold text-slate-800">
					S/. {item.subtotal.toFixed(2)}
				</span>
			</div>
		</div>
	)
}
