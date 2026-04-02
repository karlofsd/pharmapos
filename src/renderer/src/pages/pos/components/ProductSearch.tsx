import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@renderer/components/ui/input"
import { Badge } from "@renderer/components/ui/badge"
import { Product, Lot } from "@renderer/types"
import { ProductService } from "@renderer/services/productService"
import { LotService } from "@renderer/services/lotService"
import { cn } from "@renderer/lib/utils"

interface SearchResult {
	product: Product
	lots: Lot[]
}

interface ProductSearchProps {
	onSelect: (product: Product, lot: Lot) => void
}

export function ProductSearch({ onSelect }: ProductSearchProps): React.ReactElement {
	const [search, setSearch] = useState("")
	const [results, setResults] = useState<SearchResult[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	// Focus automático al montar
	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current)

		if (!search.trim()) {
			setResults([])
			return
		}

		debounceRef.current = setTimeout(async () => {
			setIsSearching(true)
			try {
				const products = await ProductService.search(search)
				const resultsWithLots = await Promise.all(
					products.slice(0, 8).map(async (product) => {
						const lots = await LotService.getByProduct(product.id)
						return { product, lots: lots.filter((l) => l.stock > 0) }
					})
				)
				setResults(resultsWithLots.filter((r) => r.lots.length > 0))
			} finally {
				setIsSearching(false)
			}
		}, 300)

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current)
		}
	}, [search])

	function handleSelect(product: Product, lot: Lot): void {
		onSelect(product, lot)
		setSearch("")
		setResults([])
		inputRef.current?.focus()
	}

	return (
		<div className="flex flex-col gap-3 h-full">
			{/* Input de búsqueda */}
			<div className="relative">
				<Search
					size={16}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
				/>
				<Input
					ref={inputRef}
					placeholder="Buscar por nombre, código de barras..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="pl-9 h-11 text-base"
				/>
			</div>

			{/* Resultados */}
			<div className="flex-1 overflow-y-auto flex flex-col gap-2">
				{isSearching ? (
					<p className="text-sm text-slate-400 text-center py-8">Buscando...</p>
				) : results.length === 0 && search.trim() ? (
					<p className="text-sm text-slate-400 text-center py-8">
						No se encontraron productos con stock disponible
					</p>
				) : results.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 gap-3">
						<Search size={40} className="text-slate-200" />
						<p className="text-slate-400 text-sm">
							Busca un producto o escanea un código de barras
						</p>
					</div>
				) : (
					results.map(({ product, lots }) => (
						<div key={product.id} className="flex flex-col gap-1">
							{lots.map((lot) => (
								<button
									key={lot.id}
									onClick={() => handleSelect(product, lot)}
									className={cn(
										"w-full text-left px-4 py-3 rounded-lg border border-slate-200",
										"bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors"
									)}
								>
									<div className="flex items-start justify-between gap-2">
										<div className="min-w-0">
											<p className="font-medium text-slate-800 text-sm truncate">
												{product.brand}
											</p>
											<p className="text-xs text-slate-400 mt-0.5">
												{product.dci
													.map(
														(d) => `${d.name} ${d.measurement}${d.unit}`
													)
													.join(" + ")}
											</p>
											<p className="text-xs text-slate-400">
												Lote: {lot.numberLot} · Stock: {lot.stock}
											</p>
										</div>
										<div className="flex flex-col items-end gap-1 shrink-0">
											<span className="font-bold text-slate-800 text-sm">
												S/. {lot.sellPrice.toFixed(2)}
											</span>
											{product.requiredPrescription && (
												<Badge variant="secondary" className="text-xs">
													Receta
												</Badge>
											)}
										</div>
									</div>
								</button>
							))}
						</div>
					))
				)}
			</div>
		</div>
	)
}
