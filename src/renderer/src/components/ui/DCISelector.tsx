import { useState, useRef, useEffect } from "react"
import { Plus, Search, Check } from "lucide-react"
import { DCI, ProductDCI, ProductCategory, DCIUnit } from "@renderer/types"
import { Input } from "@renderer/components/ui/input"
import { Button } from "@renderer/components/ui/button"
import { cn } from "@renderer/lib/utils"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { CategorySelector } from "@renderer/components/ui/CategorySelector"
import { Trash2 } from "lucide-react"
import { useCatalogs } from "@renderer/hooks/useCatalogs"

interface DCISelectorProps {
	dcis: DCI[]
	selected: ProductDCI[]
	onChange: (items: ProductDCI[]) => void
	onCreateDCI: (name: string, categories: ProductCategory[]) => Promise<DCI>
}

interface NewDCIForm {
	name: string
	categories: ProductCategory[]
}

export function DCISelector({
	dcis,
	selected,
	onChange,
	onCreateDCI
}: DCISelectorProps): React.ReactElement {
	const { catalogs } = useCatalogs()
	const [search, setSearch] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [newDCI, setNewDCI] = useState<NewDCIForm>({ name: "", categories: [] })
	const [isSaving, setIsSaving] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const selectedIds = selected.map((s) => s.dciId)

	const filtered = dcis.filter(
		(d) => d.name.toLowerCase().includes(search.toLowerCase()) && !selectedIds.includes(d.id)
	)

	useEffect(() => {
		function handleClickOutside(e: MouseEvent): void {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false)
				setIsCreating(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	function handleSelect(dci: DCI): void {
		onChange([
			...selected,
			{
				dciId: dci.id,
				name: dci.name,
				measurement: 0,
				unit: "mg"
			} as ProductDCI
		])
		setSearch("")
		setIsOpen(false)
	}

	async function handleCreate(): Promise<void> {
		if (!newDCI.name.trim()) return
		setIsSaving(true)
		try {
			const created = await onCreateDCI(newDCI.name.trim(), newDCI.categories)
			onChange([
				...selected,
				{
					dciId: created.id,
					name: created.name,
					measurement: 0,
					unit: "mg"
				} as ProductDCI
			])
			setNewDCI({ name: "", categories: [] })
			setIsCreating(false)
			setIsOpen(false)
		} finally {
			setIsSaving(false)
		}
	}

	function handleRemove(dciId: string): void {
		onChange(selected.filter((s) => s.dciId !== dciId))
	}

	function handleUpdateItem(
		dciId: string,
		field: "measurement" | "unit",
		value: string | number
	): void {
		onChange(selected.map((s) => (s.dciId === dciId ? { ...s, [field]: value } : s)))
	}

	return (
		<div className="flex flex-col gap-3">
			{/* Input con desplegable */}
			<div ref={containerRef} className="relative">
				<div className="relative">
					<Search
						size={14}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
					/>
					<Input
						placeholder="Buscar principio activo..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value)
							setIsOpen(true)
							setIsCreating(false)
						}}
						onFocus={() => setIsOpen(true)}
						className="pl-8"
					/>
				</div>

				{/* Dropdown */}
				{isOpen && (
					<div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
						{/* Opción crear nuevo */}
						{!isCreating ? (
							<button
								type="button"
								onClick={() => {
									setIsCreating(true)
									setNewDCI({ name: search, categories: [] })
								}}
								className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 border-b border-slate-100 transition-colors"
							>
								<Plus size={14} />
								Agregar nuevo DCI
								{search && <span className="font-medium">{`"${search}"`}</span>}
							</button>
						) : (
							<div
								className="p-3 border-b border-slate-100 flex flex-col gap-2"
								onMouseDown={(e) => e.stopPropagation()}
							>
								<p className="text-xs font-semibold text-slate-500">
									Nuevo principio activo
								</p>
								<Input
									placeholder="Nombre del DCI"
									value={newDCI.name}
									onChange={(e) =>
										setNewDCI((prev) => ({ ...prev, name: e.target.value }))
									}
									autoFocus
								/>
								<CategorySelector
									categories={catalogs.categories}
									selected={newDCI.categories}
									onChange={(categories) =>
										setNewDCI((prev) => ({ ...prev, categories }))
									}
								/>
								<div className="flex gap-2">
									<Button
										type="button"
										size="sm"
										onClick={handleCreate}
										disabled={!newDCI.name.trim() || isSaving}
										className="flex-1"
									>
										{isSaving ? "Guardando..." : "Guardar y agregar"}
									</Button>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={() => setIsCreating(false)}
									>
										Cancelar
									</Button>
								</div>
							</div>
						)}

						{/* Lista de DCIs */}
						<div className="max-h-48 overflow-y-auto">
							{filtered.length === 0 ? (
								<p className="text-sm text-slate-400 text-center py-3">
									No se encontraron resultados
								</p>
							) : (
								filtered.map((dci) => (
									<button
										key={dci.id}
										type="button"
										onClick={() => handleSelect(dci)}
										className={cn(
											"w-full flex items-center justify-between px-3 py-2 text-sm",
											"hover:bg-slate-50 transition-colors text-left"
										)}
									>
										<div>
											<p className="font-medium text-slate-800">{dci.name}</p>
											<p className="text-xs text-slate-400">
												{dci.categories.map((cat) => cat).join(", ") ||
													"Sin categoría"}
											</p>
										</div>
										{selectedIds.includes(dci.id) && (
											<Check size={14} className="text-green-500 shrink-0" />
										)}
									</button>
								))
							)}
						</div>
					</div>
				)}
			</div>

			{/* DCIs seleccionados */}
			{selected.length > 0 && (
				<div className="flex flex-col gap-2">
					{selected.map((item) => (
						<div
							key={item.dciId}
							className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2"
						>
							<p className="text-sm font-medium text-slate-800 flex-1">{item.name}</p>
							<Input
								defaultValue={item.measurement.toString() || ""}
								onChange={(e) => {
									if (e.target.value == "0") return
									if (
										!e.target.value.includes(".") ||
										e.target.value.split(".").length > 1
									)
										handleUpdateItem(
											item.dciId,
											"measurement",
											parseFloat(e.target.value) || 0
										)
								}}
								className="w-20 h-7 text-sm"
								placeholder="0"
							/>
							<Select
								value={item.unit}
								onValueChange={(val) =>
									handleUpdateItem(item.dciId, "unit", val as DCIUnit)
								}
							>
								<SelectTrigger className="w-16 h-7 text-sm">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="mg">mg</SelectItem>
									<SelectItem value="ml">ml</SelectItem>
									<SelectItem value="g">g</SelectItem>
								</SelectContent>
							</Select>
							<button
								type="button"
								onClick={() => handleRemove(item.dciId)}
								className="text-slate-400 hover:text-red-500 transition-colors"
							>
								<Trash2 size={14} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
