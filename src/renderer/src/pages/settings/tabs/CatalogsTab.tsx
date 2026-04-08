import { useState } from "react"
import { Plus, X, Pencil, Check } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Separator } from "@renderer/components/ui/separator"
import { useCatalogs } from "@renderer/hooks/useCatalogs"
import { SettingsService } from "@renderer/services/settingsService"

interface CatalogSectionProps {
	title: string
	items: string[]
	onAdd: (item: string) => Promise<void>
	onRemove?: (item: string) => Promise<void>
}

function CatalogSection({ title, items, onAdd, onRemove }: CatalogSectionProps): React.ReactElement {
	const [newItem, setNewItem] = useState("")
	const [editingItem, setEditingItem] = useState<string | null>(null)
	const [editValue, setEditValue] = useState("")
	const [isAdding, setIsAdding] = useState(false)

	async function handleAdd(): Promise<void> {
		if (!newItem.trim()) return
		setIsAdding(true)
		try {
			await onAdd(newItem.trim())
			setNewItem("")
		} finally {
			setIsAdding(false)
		}
	}

	return (
		<div className="flex flex-col gap-3">
			<p className="text-sm font-semibold text-slate-700">{title}</p>
			<div className="flex gap-2">
				<Input
					placeholder={`Agregar ${title.toLowerCase()}...`}
					value={newItem}
					onChange={(e) => setNewItem(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleAdd()}
				/>
				<Button
					variant="outline"
					size="icon"
					onClick={handleAdd}
					disabled={!newItem.trim() || isAdding}
				>
					<Plus size={14} />
				</Button>
			</div>
			<div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
				{items.sort().map((item) => (
					<div
						key={item}
						className="flex items-center gap-1 bg-slate-100 rounded-full px-3 py-1"
					>
						{editingItem === item ? (
							<>
								<Input
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
									className="h-5 w-24 text-xs border-0 bg-transparent p-0 focus-visible:ring-0"
									autoFocus
								/>
								<button
									onClick={async () => {
										if (editValue.trim() && editValue !== item) {
											await onAdd(editValue.trim())
											if (onRemove) await onRemove(item)
										}
										setEditingItem(null)
									}}
									className="text-green-600 hover:text-green-700"
								>
									<Check size={12} />
								</button>
								<button
									onClick={() => setEditingItem(null)}
									className="text-slate-400 hover:text-red-500"
								>
									<X size={12} />
								</button>
							</>
						) : (
							<>
								<span className="text-xs text-slate-700">{item}</span>
								<button
									onClick={() => { setEditingItem(item); setEditValue(item) }}
									className="text-slate-400 hover:text-slate-600 ml-1"
								>
									<Pencil size={10} />
								</button>
								{onRemove && (
									<button
										onClick={() => onRemove(item)}
										className="text-slate-400 hover:text-red-500"
									>
										<X size={10} />
									</button>
								)}
							</>
						)}
					</div>
				))}
				{items.length === 0 && (
					<p className="text-xs text-slate-400">No hay elementos</p>
				)}
			</div>
		</div>
	)
}

export function CatalogsTab(): React.ReactElement {
	const { catalogs, addLab } = useCatalogs()
	const [categories, setCategories] = useState(catalogs.categories)
	const [units, setUnits] = useState(catalogs.units)

	async function handleAddCategory(category: string): Promise<void> {
		await SettingsService.addCategory(category)
		setCategories((prev) => [...prev, category])
	}

	async function handleAddUnit(unit: string): Promise<void> {
		await SettingsService.addUnit(unit)
		setUnits((prev) => [...prev, unit])
	}

	return (
		<div className="flex flex-col gap-6 max-w-2xl">
			<CatalogSection
				title="Laboratorios"
				items={catalogs.labs}
				onAdd={addLab}
			/>
			<Separator />
			<CatalogSection
				title="Categorías"
				items={catalogs.categories}
				onAdd={handleAddCategory}
			/>
			<Separator />
			<CatalogSection
				title="Unidades"
				items={catalogs.units}
				onAdd={handleAddUnit}
			/>
		</div>
	)
}