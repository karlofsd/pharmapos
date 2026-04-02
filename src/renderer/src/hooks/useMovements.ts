import { useState, useEffect, useCallback } from "react"
import { Movement, MovementsService, MovementsFilters } from "@renderer/services/movementService"
import { Product } from "@renderer/types"
import { ProductService } from "@renderer/services/productService"

interface UseMovementsState {
	movements: Movement[]
	products: Product[]
	selected: Movement | null
	isLoading: boolean
	error: string | null
	filters: MovementsFilters
}

interface UseMovementsReturn extends UseMovementsState {
	load: () => Promise<void>
	setFilters: (filters: MovementsFilters) => void
	selectMovement: (movement: Movement) => void
}

export function useMovements(): UseMovementsReturn {
	const [state, setState] = useState<UseMovementsState>({
		movements: [],
		products: [],
		selected: null,
		isLoading: true,
		error: null,
		filters: {}
	})

	const load = useCallback(async (filters: MovementsFilters = {}) => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const [movements, products] = await Promise.all([
				MovementsService.getAll(filters),
				ProductService.getAll()
			])

			// Enriquecer movimientos con nombre de producto
			const productMap = new Map<string, Product>(products.map((p) => [p.id, p]))
			const enriched = movements.map((m) => ({
				...m,
				productName: productMap.get(m.productId)?.brand ?? "Producto eliminado"
			}))

			setState((prev) => ({
				...prev,
				movements: enriched,
				products,
				isLoading: false,
				filters
			}))
		} catch {
			setState((prev) => ({
				...prev,
				error: "Error al cargar los movimientos",
				isLoading: false
			}))
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	function selectMovement(movement: Movement | null): void {
		setState((prev) => ({ ...prev, selected: movement }))
	}

	function setFilters(filters: MovementsFilters): void {
		load(filters)
	}

	return {
		...state,
		load,
		selectMovement,
		setFilters
	}
}
