/**
 * Pagination utilities for cursor-based pagination
 * Works with Firestore timestamps and document IDs
 */

export interface PaginationParams {
	pageSize: number
	cursor?: string
}

export interface PaginationResult<T> {
	items: T[]
	nextCursor: string | null
	hasMore: boolean
}

/**
 * Encode cursor for pagination (Firestore doc ID)
 */
export function encodeCursor(docId: string): string {
	return Buffer.from(docId).toString("base64")
}

/**
 * Decode cursor to get document ID
 */
export function decodeCursor(cursor: string): string {
	try {
		return Buffer.from(cursor, "base64").toString("utf-8")
	} catch {
		return ""
	}
}

/**
 * Get next cursor from last item in results
 */
export function getNextCursor<T extends { id: string }>(items: T[]): string | null {
	if (items.length === 0) return null
	const lastItem = items[items.length - 1]
	return encodeCursor(lastItem.id)
}

/**
 * Check if there are more items (loaded more than page size)
 */
export function hasMoreItems(itemsLoaded: number, pageSize: number): boolean {
	return itemsLoaded > pageSize
}

/**
 * Trim items to page size (remove extra item used for "hasMore" detection)
 */
export function trimToPageSize<T>(items: T[], pageSize: number): T[] {
	return items.slice(0, pageSize)
}
