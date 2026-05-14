import { useCallback, useState } from "react"
import { PaginationParams, PaginationResult } from "@renderer/lib/pagination"

interface UsePaginationState<T> {
	items: T[]
	isLoading: boolean
	error: string | null
	hasMore: boolean
	cursor: string | null
}

interface UsePaginationReturn<T> extends UsePaginationState<T> {
	loadMore: () => Promise<void>
	reset: () => Promise<void>
	addItems: (newItems: T[]) => void
}

/**
 * Generic pagination hook for managing paginated data
 */
export function usePagination<T extends { id: string }>(
	loader: (params: PaginationParams) => Promise<PaginationResult<T>>,
	initialPageSize: number = 50
): UsePaginationReturn<T> {
	const [state, setState] = useState<UsePaginationState<T>>({
		items: [],
		isLoading: false,
		error: null,
		hasMore: true,
		cursor: null
	})

	const loadMore = useCallback(async () => {
		if (state.isLoading || !state.hasMore) return

		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const result = await loader({
				pageSize: initialPageSize,
				cursor: state.cursor || undefined
			})

			setState((prev) => ({
				...prev,
				isLoading: false,
				items: [...prev.items, ...result.items],
				hasMore: result.hasMore,
				cursor: result.nextCursor
			}))
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Failed to load more items"
			setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
		}
	}, [state.isLoading, state.hasMore, state.cursor, initialPageSize, loader])

	const reset = useCallback(async () => {
		try {
			setState({ items: [], isLoading: true, error: null, hasMore: true, cursor: null })
			const result = await loader({ pageSize: initialPageSize })

			setState({
				items: result.items,
				isLoading: false,
				error: null,
				hasMore: result.hasMore,
				cursor: result.nextCursor
			})
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Failed to load items"
			setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }))
		}
	}, [initialPageSize, loader])

	const addItems = useCallback((newItems: T[]) => {
		setState((prev) => ({
			...prev,
			items: [...prev.items, ...newItems]
		}))
	}, [])

	return {
		...state,
		loadMore,
		reset,
		addItems
	}
}
