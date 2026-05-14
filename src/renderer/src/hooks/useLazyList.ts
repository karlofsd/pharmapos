import { useCallback, useEffect, useState } from "react"
import { PaginationParams, PaginationResult, trimToPageSize } from "@renderer/lib/pagination"

interface UseLazyListState<T> {
items: T[]
filtered: T[]
selected: T | null
isLoading: boolean
error: string | null
searchTerm: string
sortField: string
sortOrder: "asc" | "desc"
hasMore: boolean
cursor: string | null
}

interface UseLazyListOptions {
pageSize?: number
maxItems?: number
initialSortField?: string
initialSortOrder?: "asc" | "desc"
}

interface UseLazyListReturn<T> extends UseLazyListState<T> {
load: () => Promise<void>
loadMore: () => Promise<void>
setSearchTerm: (term: string) => void
setSort: (field: string, order: "asc" | "desc") => void
selectItem: (item: T | null) => void
}

export function useLazyList<T extends { id: string }>(
loader: (params: PaginationParams) => Promise<PaginationResult<T>>,
applyFilters: (
items: T[],
searchTerm: string,
sortField: string,
sortOrder: "asc" | "desc"
) => T[],
options: UseLazyListOptions = {}
): UseLazyListReturn<T> {
const {
pageSize = 50,
maxItems = 500,
initialSortField = "name",
initialSortOrder = "asc"
} = options

const [state, setState] = useState<UseLazyListState<T>>({
items: [],
filtered: [],
selected: null,
isLoading: false,
error: null,
searchTerm: "",
sortField: initialSortField,
sortOrder: initialSortOrder,
hasMore: true,
cursor: null
})

const load = useCallback(async () => {
try {
setState((prev) => ({ ...prev, isLoading: true, error: null, cursor: null }))
const result = await loader({ pageSize })

const items = trimToPageSize(result.items, pageSize)
setState((prev) => ({
...prev,
isLoading: false,
items,
filtered: applyFilters(items, prev.searchTerm, prev.sortField, prev.sortOrder),
hasMore: result.hasMore,
cursor: result.nextCursor
}))
} catch (err) {
const errorMessage = err instanceof Error ? err.message : "Failed to load items"
setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
}
}, [pageSize, loader, applyFilters])

const loadMore = useCallback(async () => {
if (state.isLoading || !state.hasMore || state.items.length >= maxItems) return

try {
setState((prev) => ({ ...prev, isLoading: true, error: null }))
const result = await loader({
pageSize,
cursor: state.cursor || undefined
})

const newItems = trimToPageSize(result.items, pageSize)
setState((prev) => {
const combinedItems = [...prev.items, ...newItems]
const limitedItems =
combinedItems.length > maxItems
? combinedItems.slice(0, maxItems)
: combinedItems

return {
...prev,
isLoading: false,
items: limitedItems,
filtered: applyFilters(
limitedItems,
prev.searchTerm,
prev.sortField,
prev.sortOrder
),
hasMore: result.hasMore && limitedItems.length < maxItems,
cursor: result.nextCursor
}
})
} catch (err) {
const errorMessage = err instanceof Error ? err.message : "Failed to load more items"
setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
}
}, [state.isLoading, state.hasMore, state.items.length, state.cursor, pageSize, maxItems, applyFilters, loader])

useEffect(() => {
load()
}, [])

function setSearchTerm(searchTerm: string): void {
setState((prev) => ({
...prev,
searchTerm,
filtered: applyFilters(prev.items, searchTerm, prev.sortField, prev.sortOrder)
}))
}

function setSort(sortField: string, sortOrder: "asc" | "desc"): void {
setState((prev) => ({
...prev,
sortField,
sortOrder,
filtered: applyFilters(prev.items, prev.searchTerm, sortField, sortOrder)
}))
}

function selectItem(item: T | null): void {
setState((prev) => ({ ...prev, selected: item }))
}

return {
...state,
load,
loadMore,
setSearchTerm,
setSort,
selectItem
}
}
