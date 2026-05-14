import {
CreateProductDTO,
ProductService,
UpdateProductDTO
} from "@renderer/services/productService"
import { Product } from "@renderer/types"
import { useCallback, useEffect, useState } from "react"
import { useLazyList } from "./useLazyList"
import { PaginationParams, PaginationResult } from "@renderer/lib/pagination"

type SortField = "brand" | "manufacturer" | "createdAt"
type SortOrder = "asc" | "desc"

interface UseProductsState {
products: Product[]
filtered: Product[]
selected: Product | null
isLoading: boolean
error: string | null
searchTerm: string
sortField: SortField
sortOrder: SortOrder
isOpenLotForm: boolean
hasMore: boolean
}

type UseProductsReturn = UseProductsState & {
load: () => Promise<void>
loadMore: () => Promise<void>
setSearchTerm: (searchTerm: string) => void
setSort: (sortField: SortField, sortOrder: SortOrder) => void
selectProduct: (product: Product | null) => void
createProduct: (data: CreateProductDTO) => Promise<Product>
updateProduct: (id: string, data: UpdateProductDTO) => Promise<void>
deactivateProduct: (id: string) => Promise<void>
toggleLotForm: () => void
}

const applyFilters = (
products: Product[],
searchTerm: string,
sortField: string,
sortOrder: string
): Product[] => {
let result = [...products]

if (searchTerm) {
const normalizedQuery = searchTerm.trim().toLowerCase()
result = products.filter(
(product) =>
product.brand.toLowerCase().includes(normalizedQuery) ||
product.manufacturer.toLowerCase().includes(normalizedQuery) ||
product.barcode.toLowerCase() == normalizedQuery ||
product.dci.some((dci) => dci.name.toLowerCase().includes(normalizedQuery))
)
}

result.sort((a, b) => {
const aValue = a[sortField as SortField]
const bValue = b[sortField as SortField]

if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
return 0
})

return result
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
sortOrder: "asc",
isOpenLotForm: false,
hasMore: true
})

// Lazy loader function
const productLoader = useCallback(
(params: PaginationParams): Promise<PaginationResult<Product>> => {
return ProductService.getPage(params)
},
[]
)

// Use lazy list for base functionality
const lazyList = useLazyList(productLoader, applyFilters, {
pageSize: 50,
maxItems: 500,
initialSortField: "brand",
initialSortOrder: "asc"
})

// Merge with custom state
useEffect(() => {
setState((prev) => ({
...prev,
products: lazyList.items,
filtered: lazyList.filtered,
selected: lazyList.selected,
isLoading: lazyList.isLoading,
error: lazyList.error,
searchTerm: lazyList.searchTerm,
sortField: lazyList.sortField as SortField,
sortOrder: lazyList.sortOrder as SortOrder,
hasMore: lazyList.hasMore
}))
}, [lazyList])

async function createProduct(data: CreateProductDTO): Promise<Product> {
const created = await ProductService.create(data)
setState((prev) => {
const products = [created, ...prev.products]
return {
...prev,
products,
filtered: applyFilters(products, prev.searchTerm, prev.sortField, prev.sortOrder)
}
})
return created
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

function toggleLotForm(): void {
setState((prev) => ({ ...prev, isOpenLotForm: !prev.isOpenLotForm }))
}

return {
...state,
load: lazyList.load,
loadMore: lazyList.loadMore,
setSearchTerm: lazyList.setSearchTerm,
setSort: lazyList.setSort as (sortField: SortField, sortOrder: SortOrder) => void,
selectProduct: lazyList.selectItem,
createProduct,
updateProduct,
deactivateProduct,
toggleLotForm
}
}
