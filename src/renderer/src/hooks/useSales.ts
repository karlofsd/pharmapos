import { useState, useEffect, useCallback } from "react"
import { Sale } from "@renderer/types"
import { SaleService, SalesFilters } from "@renderer/services/saleService"
import { useAuth } from "@renderer/hooks/useAuth"

interface UseSalesState {
	sales: Sale[]
	selected: Sale | null
	isLoading: boolean
	error: string | null
	filters: SalesFilters
}

interface UseSalesReturn extends UseSalesState {
	load: () => Promise<void>
	selectSale: (sale: Sale | null) => void
	setFilters: (filters: SalesFilters) => void
	cancelSale: (id: string, reason: string) => void
}

export function useSales(): UseSalesReturn {
	const { user } = useAuth()
	const [state, setState] = useState<UseSalesState>({
		sales: [],
		selected: null,
		isLoading: true,
		error: null,
		filters: {}
	})

	const load = useCallback(async (filters: SalesFilters = {}) => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const sales = await SaleService.getAll(filters)
			setState((prev) => ({
				...prev,
				sales,
				isLoading: false,
				filters
			}))
		} catch {
			setState((prev) => ({
				...prev,
				error: "Error al cargar las ventas",
				isLoading: false
			}))
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	function selectSale(sale: Sale | null): void {
		setState((prev) => ({ ...prev, selected: sale }))
	}

	function setFilters(filters: SalesFilters): void {
		load(filters)
	}

	async function cancelSale(saleId: string, reason: string): Promise<void> {
		if (!user) return
		await SaleService.cancel(saleId, user.id, reason)
		setState((prev) => ({
			...prev,
			sales: prev.sales.map((s) => (s.id === saleId ? { ...s, status: "cancelled" } : s)),
			selected:
				prev.selected?.id === saleId
					? { ...prev.selected, status: "cancelled" as const }
					: prev.selected
		}))
	}

	return {
		...state,
		load,
		selectSale,
		setFilters,
		cancelSale
	}
}
