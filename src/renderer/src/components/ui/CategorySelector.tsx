import { ProductCategory } from "@renderer/types"
import { X } from "lucide-react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"

interface CategorySelectorProps {
	categories: ProductCategory[]
	selected: ProductCategory[]
	onChange: (categories: ProductCategory[]) => void
	disabled?: ProductCategory[]
}

export function CategorySelector({
	categories,
	selected,
	onChange,
	disabled = []
}: CategorySelectorProps): React.ReactElement {
	const available = categories.filter((c) => !selected.includes(c))

	function handleAdd(category: ProductCategory): void {
		onChange([...selected, category])
	}

	function handleRemove(category: ProductCategory): void {
		if (disabled.includes(category)) return
		onChange(selected.filter((c) => c !== category))
	}

	return (
		<div className="flex flex-col gap-3">
			{/* Selector */}
			{available.length > 0 && (
				<Select onValueChange={(val) => handleAdd(val as ProductCategory)}>
					<SelectTrigger>
						<SelectValue placeholder="Agregar categoría..." />
					</SelectTrigger>
					<SelectContent>
						{available.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			{/* Chips seleccionados */}
			{selected.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selected.map((category) => {
						const isDisabled = disabled.includes(category)
						return (
							<span
								key={category}
								className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border
									${
										isDisabled
											? "bg-slate-200 text-slate-500 border-slate-200 cursor-not-allowed"
											: "bg-slate-800 text-white border-slate-800"
									}`}
							>
								{category}
								{!isDisabled && (
									<button
										type="button"
										onClick={() => handleRemove(category)}
										className="hover:opacity-70 transition-opacity"
									>
										<X size={10} />
									</button>
								)}
							</span>
						)
					})}
				</div>
			)}

			{selected.length === 0 && (
				<p className="text-xs text-slate-400">No hay categorías seleccionadas</p>
			)}
		</div>
	)
}
