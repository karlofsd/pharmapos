import { useState, useRef, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@renderer/components/ui/input"
import { cn } from "@renderer/lib/utils"

interface LabSelectorProps {
	labs: string[]
	value: string | undefined
	onChange: (lab: string) => void
}

export function LabSelector({ labs, value, onChange }: LabSelectorProps): React.ReactElement {
	const [search, setSearch] = useState(value)
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const filtered = labs.filter((lab) => lab.toLowerCase().includes(search?.toLowerCase() ?? ""))

	const isNew =
		(search ?? "").trim() !== "" &&
		!labs.some((lab) => lab.toLowerCase() === search?.toLowerCase())

	useEffect(() => {
		setSearch(value ?? "")
	}, [value])

	useEffect(() => {
		function handleClickOutside(e: MouseEvent): void {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false)
				if (!labs.includes(search!)) {
					setSearch(value)
				}
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [labs, search, value])

	function handleSelect(lab: string): void {
		setSearch(lab)
		onChange(lab)
		setIsOpen(false)
	}

	return (
		<div ref={containerRef} className="relative">
			<div className="relative">
				<Search
					size={14}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
				/>
				<Input
					placeholder="Buscar o ingresar laboratorio..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
						onChange(e.target.value)
						setIsOpen(true)
					}}
					onFocus={() => setIsOpen(true)}
					className="pl-8"
				/>
			</div>

			{isOpen && (
				<div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
					{/* Opción nuevo laboratorio */}
					{isNew && (
						<button
							type="button"
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => handleSelect(search?.trim() ?? '')}
							className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 border-b border-slate-100 transition-colors"
						>
							<Plus size={14} />
							Usar <span className="font-medium">{'"' + (search?.trim() ?? "") + '"'} </span>
							<span className="text-xs text-slate-400 ml-auto">
								Se guardará al crear el producto
							</span>
						</button>
					)}

					{/* Lista */}
					<div className="max-h-48 overflow-y-auto">
						{filtered.length === 0 && !isNew ? (
							<p className="text-sm text-slate-400 text-center py-3">
								No se encontraron laboratorios
							</p>
						) : (
							filtered.map((lab) => (
								<button
									key={lab}
									type="button"
									onMouseDown={(e) => e.preventDefault()}
									onClick={() => handleSelect(lab)}
									className={cn(
										"w-full text-left px-3 py-2 text-sm transition-colors",
										"hover:bg-slate-50",
										value === lab
											? "font-medium text-slate-900"
											: "text-slate-700"
									)}
								>
									{lab}
								</button>
							))
						)}
					</div>
				</div>
			)}
		</div>
	)
}
