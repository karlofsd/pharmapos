import { useEffect, useRef } from "react"

interface UseInfiniteScrollOptions {
	threshold?: number // 0-1, default 0.3 (30% from bottom)
	isLoading?: boolean
	hasMore?: boolean
}

/**
 * Hook to detect when user scrolls near bottom of container
 * Useful for infinite scroll pagination
 */
export function useInfiniteScroll(
	onLoadMore: () => void,
	options: UseInfiniteScrollOptions = {}
): React.RefObject<HTMLDivElement | null> {
	const { threshold = 0.3, isLoading = false, hasMore = true } = options
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container || isLoading || !hasMore) return

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container
			const scrollPercentage = (scrollHeight - scrollTop - clientHeight) / scrollHeight

			// Trigger load when user is within threshold from bottom
			if (scrollPercentage < threshold) {
				onLoadMore()
			}
		}

		container.addEventListener("scroll", handleScroll)
		return () => container.removeEventListener("scroll", handleScroll)
	}, [threshold, isLoading, hasMore, onLoadMore])

	return containerRef
}
