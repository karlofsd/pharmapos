import {
	CreateProductDTO,
	ProductService,
	UpdateProductDTO
} from "@renderer/services/productService"
import { Product } from "@renderer/types"
import { useCallback, useEffect, useState } from "react"

type SortField = "brand" | "manufacturer" | "createdAt"
type SortOrder = "asc" | "desc"

interface UseProductsState {
	products: Product[]
	filtered: Product[]
	selected: Product | null
	isLoading: boolean
	error: string | null
	// Filters
	searchTerm: string
	sortField: SortField
	sortOrder: SortOrder
}

type UseProductsReturn = UseProductsState & {
	load: () => Promise<void>
	setSearchTerm: (searchTerm: string) => void
	setSort: (sortField: SortField, sortOrder: SortOrder) => void
	selectProduct: (product: Product | null) => void
	createProduct: (data: CreateProductDTO) => Promise<void>
	updateProduct: (id: string, data: UpdateProductDTO) => Promise<void>
	deactivateProduct: (id: string) => Promise<void>
}

export function useProducts(): UseProductsReturn {
	const [state, setState] = useState<UseProductsState>({
		products: [],
		filtered: [],
		selected: null,
		isLoading: false,
		error: null,
		searchTerm: "",
		sortField: "brand",
		sortOrder: "asc"
	})

	const applyFilters = useCallback(
		(
			products: Product[],
			searchTerm: string,
			sortField: SortField,
			sortOrder: SortOrder
		): Product[] => {
			let result = [...products]

			if (searchTerm) {
				const normalizedQuery = searchTerm.trim().toLowerCase()
				result = products.filter(
					(product) =>
						product.brand.toLowerCase().includes(normalizedQuery) ||
						product.manufacturer.toLowerCase().includes(normalizedQuery) ||
						product.dci.some((dci) => dci.name.toLowerCase().includes(normalizedQuery))
				)
			}

			result.sort((a, b) => {
				const aValue = a[sortField]
				const bValue = b[sortField]

				if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
				if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
				return 0
			})

			return result
		},
		[]
	)

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const products = await ProductService.getAll()
			setState((prev) => ({
				...prev,
				isLoading: false,
				products,
				filtered: applyFilters(products, prev.searchTerm, prev.sortField, prev.sortOrder)
			}))
		} catch {
			setState((prev) => ({ ...prev, isLoading: false, error: "Failed to load products" }))
		}
	}, [applyFilters])

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		load()
	}, [load])

	function setSearchTerm(searchTerm: string): void {
		setState((prev) => ({
			...prev,
			searchTerm,
			filtered: applyFilters(prev.products, searchTerm, prev.sortField, prev.sortOrder)
		}))
	}

	function setSort(sortField: SortField, sortOrder: SortOrder): void {
		setState((prev) => ({
			...prev,
			sortField,
			sortOrder,
			filtered: applyFilters(prev.products, prev.searchTerm, sortField, sortOrder)
		}))
	}

	function selectProduct(product: Product | null): void {
		setState((prev) => ({ ...prev, selected: product }))
	}

	async function createProduct(data: CreateProductDTO): Promise<void> {
		const created = await ProductService.create(data)
		setState((prev) => {
			const products = [...prev.products, created]
			return {
				...prev,
				products,
				filtered: applyFilters(products, prev.searchTerm, prev.sortField, prev.sortOrder)
			}
		})
	}

	async function updateProduct(id: string, data: UpdateProductDTO): Promise<void> {
		await ProductService.update(id, data)
		setState((prev) => {
			const products = prev.products.map((p) => (p.id === id ? { ...p, ...data } : p))
			return {
				...prev,
				products,
				filtered: applyFilters(products, prev.searchTerm, prev.sortField, prev.sortOrder),
				selected: prev.selected?.id === id ? { ...prev.selected, ...data } : prev.selected
			}
		})
	}

	async function deactivateProduct(id: string): Promise<void> {
		await ProductService.deactivate(id)
		setState((prev) => {
			const products = prev.products.filter((p) => p.id !== id)
			return {
				...prev,
				products,
				filtered: applyFilters(products, prev.searchTerm, prev.sortField, prev.sortOrder),
				selected: prev.selected?.id === id ? null : prev.selected
			}
		})
	}

	return {
		...state,
		load,
		setSearchTerm,
		setSort,
		selectProduct,
		createProduct,
		updateProduct,
		deactivateProduct
	}
}
