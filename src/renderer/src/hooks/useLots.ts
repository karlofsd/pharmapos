import { useState, useEffect, useCallback } from "react"
import { Lot, Product } from "@renderer/types"
import { LotService, CreateLotDTO } from "@renderer/services/lotService"
import { ProductService } from "@renderer/services/productService"
import { useAuth } from "@renderer/hooks/useAuth"

export interface LotWithProduct extends Lot {
	product: Product
}

interface UseLotsReturn {
	lots: LotWithProduct[]
	filtered: LotWithProduct[]
	isLoading: boolean
	error: string | null
	searchTerm: string
	statusFilter: LotStatus | "all"
	load: () => Promise<void>
	setSearchTerm: (term: string) => void
	setStatusFilter: (status: LotStatus | "all") => void
	createLot: (data: CreateLotDTO) => Promise<void>
	updatePrice: (lotId: string, sellPrice: number) => Promise<void>
	adjustStock: (lotId: string, quantity: number, reason: string) => Promise<void>
	deactivateLot: (lotId: string) => Promise<void>
}

type LotStatus = "ok" | "low" | "empty" | "expired" | "expiring"

export function getLotStatus(lot: Lot, product: Product): LotStatus {
	const now = new Date()
	const expiration = lot.expirationDate.toDate()
	const daysUntilExpiry = Math.ceil(
		(expiration.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
	)

	if (expiration < now) return "expired"
	if (daysUntilExpiry <= 30) return "expiring"
	if (lot.stock === 0) return "empty"
	if (lot.stock <= product.minStock) return "low"
	return "ok"
}

interface UseLotsState {
	lots: LotWithProduct[]
	filtered: LotWithProduct[]
	isLoading: boolean
	error: string | null
	searchTerm: string
	statusFilter: LotStatus | "all"
}

export function useLots(): UseLotsReturn {
	const { user } = useAuth()
	const [state, setState] = useState<UseLotsState>({
		lots: [],
		filtered: [],
		isLoading: true,
		error: null,
		searchTerm: "",
		statusFilter: "all"
	})

	const applyFilters = useCallback(
		(
			lots: LotWithProduct[],
			searchTerm: string,
			statusFilter: LotStatus | "all"
		): LotWithProduct[] => {
			let result = [...lots]

			if (searchTerm.trim()) {
				const lower = searchTerm.toLowerCase()
				result = result.filter(
					(l) =>
						l.product.brand.toLowerCase().includes(lower) ||
						l.product.manufacturer.toLowerCase().includes(lower) ||
						l.numberLot.toLowerCase().includes(lower) ||
						l.product.barcode.toLowerCase() == lower
				)
			}

			if (statusFilter !== "all") {
				result = result.filter((l) => getLotStatus(l, l.product) === statusFilter)
			}

			return result
		},
		[]
	)

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const [lots, products] = await Promise.all([
				LotService.getAll(),
				ProductService.getAll()
			])
			console.log("Fetched products:", products)
			console.log("Fetched lots:", lots)
			const productMap = new Map(products.map((p) => [p.id, p]))
			const lotsWithProduct = lots
				.filter((l) => productMap.has(l.productId))
				.map((l) => ({ ...l, product: productMap.get(l.productId)! }))

			setState((prev) => ({
				...prev,
				lots: lotsWithProduct,
				filtered: applyFilters(lotsWithProduct, prev.searchTerm, prev.statusFilter),
				isLoading: false
			}))
		} catch (error) {
			console.error("Error loading lots:", error)
			setState((prev) => ({
				...prev,
				error: "Error al cargar el inventario",
				isLoading: false
			}))
		}
	}, [applyFilters])

	useEffect(() => {
		load()
	}, [load])

	function setSearchTerm(searchTerm: string): void {
		setState((prev) => ({
			...prev,
			searchTerm,
			filtered: applyFilters(prev.lots, searchTerm, prev.statusFilter)
		}))
	}

	function setStatusFilter(statusFilter: LotStatus | "all"): void {
		setState((prev) => ({
			...prev,
			statusFilter,
			filtered: applyFilters(prev.lots, prev.searchTerm, statusFilter)
		}))
	}

	async function createLot(data: CreateLotDTO): Promise<void> {
		try {
			// setState((prev) => ({ ...prev, isLoading: true }))
			if (!user) throw new Error("No se encontro usuario")
			await LotService.create(data, user.id)
			await load()
			// const product = state.lots.find((l) => l.productId === data.productId)?.product
			// if (!product) throw new Error("No se encontro producto")
			// const newLot: LotWithProduct = { ...created, product }
			// setState((prev) => {
			// 	const lots = [...prev.lots, newLot]
			// 	return {
			// 		...prev,
			// 		lots,
			// 		filtered: applyFilters(lots, prev.searchTerm, prev.statusFilter),
			// 		isLoading: false
			// 	}
			// })
		} catch (error) {
			console.log("Error al crear lote: ", error)
			// setState((prev) => ({ ...prev, isLoading: false }))
		}
	}

	async function updatePrice(lotId: string, sellPrice: number): Promise<void> {
		await LotService.updatePrice(lotId, sellPrice)
		setState((prev) => {
			const lots = prev.lots.map((l) => (l.id === lotId ? { ...l, sellPrice } : l))
			return {
				...prev,
				lots,
				filtered: applyFilters(lots, prev.searchTerm, prev.statusFilter)
			}
		})
	}

	async function adjustStock(lotId: string, quantity: number, reason: string): Promise<void> {
		if (!user) return
		const lot = state.lots.find((l) => l.id === lotId)
		if (!lot) return

		await LotService.adjustStock({
			lotId,
			productId: lot.productId,
			quantity,
			reason,
			userId: user.id
		})

		setState((prev) => {
			const lots = prev.lots.map((l) =>
				l.id === lotId ? { ...l, stock: l.stock + quantity } : l
			)
			return {
				...prev,
				lots,
				filtered: applyFilters(lots, prev.searchTerm, prev.statusFilter)
			}
		})
	}

	async function deactivateLot(lotId: string): Promise<void> {
		await LotService.deactivate(lotId)
		setState((prev) => {
			const lots = prev.lots.filter((l) => l.id !== lotId)
			return {
				...prev,
				lots,
				filtered: applyFilters(lots, prev.searchTerm, prev.statusFilter)
			}
		})
	}

	return {
		...state,
		load,
		setSearchTerm,
		setStatusFilter,
		createLot,
		updatePrice,
		adjustStock,
		deactivateLot
	}
}
