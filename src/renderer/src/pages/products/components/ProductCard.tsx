import { Product } from "@renderer/types"
import { Badge } from "@renderer/components/ui/badge"
import { cn } from "@renderer/lib/utils"
import { PRESENTATION_LABELS } from "@renderer/core/constants"

interface ProductCardProps {
	product: Product
	isSelected: boolean
	onClick: () => void
}

export default function ProductCard({
	product,
	isSelected,
	onClick
}: ProductCardProps): React.ReactElement {
	const dciSummary = product.dci
		.map(({ name, measurement, unit }) => `${name} ${measurement}${unit}`)
		.join(" + ")

	return (
		<button
			onClick={onClick}
			className={cn(
				"w-full text-left px-4 py-3 rounded-lg border transition-colors",
				"hover:bg-slate-50 hover:border-slate-300",
				isSelected ? "bg-blue-50 border-blue-300" : "bg-white border-slate-200"
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<p className="font-medium text-slate-800 truncate">{product.brand}</p>
					<p className="text-sm text-slate-500 truncate">{dciSummary}</p>
					<p className="text-xs text-slate-400 mt-1">{product.manufacturer}</p>
				</div>
				<div className="flex flex-col items-end gap-1 shrink-0">
					{product.requiredPrescription && (
						<Badge variant="secondary" className="text-xs">
							Receta
						</Badge>
					)}
					<Badge variant="outline" className="text-xs">
						{PRESENTATION_LABELS[product.presentation]}
					</Badge>
				</div>
			</div>
		</button>
	)
}
