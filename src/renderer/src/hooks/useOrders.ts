/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react"
import { Order } from "@renderer/types"
import { OrderService, CreateOrderDTO, ReceiveOrderDTO } from "@renderer/services/orderService"
import { useAuth } from "@renderer/hooks/useAuth"

interface UseOrdersState {
	orders: Order[]
	filtered: Order[]
	selected: Order | null
	isLoading: boolean
	error: string | null
	statusFilter: string
}

interface UseOrdersReturn extends UseOrdersState {
	load: () => Promise<void>
	selectOrder: (order: Order | null) => void
	setStatusFilter: (filter: string) => void
	createOrder: (data: Omit<CreateOrderDTO, "createdBy">) => Promise<void>
	cancelOrder: (id: string) => Promise<void>
	receiveOrder: (order: Omit<ReceiveOrderDTO, "userId">) => Promise<void>
}

export function useOrders(supplierId?: string): UseOrdersReturn {
	const { user } = useAuth()
	const [state, setState] = useState<UseOrdersState>({
		orders: [],
		filtered: [],
		selected: null,
		isLoading: true,
		error: null,
		statusFilter: "all"
	})

	function applyFilter(orders: Order[], statusFilter: string): Order[] {
		if (statusFilter === "all") return orders
		return orders.filter((o) => o.status === statusFilter)
	}

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const orders = supplierId
				? await OrderService.getBySupplier(supplierId)
				: await OrderService.getAll()
			setState((prev) => ({
				...prev,
				orders,
				filtered: applyFilter(orders, prev.statusFilter),
				isLoading: false
			}))
		} catch {
			setState((prev) => ({
				...prev,
				error: "Error al cargar pedidos",
				isLoading: false
			}))
		}
	}, [supplierId])

	useEffect(() => {
		load()
	}, [load])

	function setStatusFilter(statusFilter: string): void {
		setState((prev) => ({
			...prev,
			statusFilter,
			filtered: applyFilter(prev.orders, statusFilter)
		}))
	}

	function selectOrder(order: Order | null): void {
		setState((prev) => ({ ...prev, selected: order }))
	}

	async function createOrder(data: Omit<CreateOrderDTO, "createdBy">): Promise<void> {
		if (!user) return
		const created = await OrderService.create({ ...data, createdBy: user.id })
		setState((prev) => {
			const orders = [created, ...prev.orders]
			return {
				...prev,
				orders,
				filtered: applyFilter(orders, prev.statusFilter)
			}
		})
	}

	async function cancelOrder(id: string): Promise<void> {
		await OrderService.updateStatus(id, "cancelled")
		setState((prev) => {
			const orders = prev.orders.map((o) =>
				o.id === id ? { ...o, status: "cancelled" as const } : o
			)
			return {
				...prev,
				orders,
				filtered: applyFilter(orders, prev.statusFilter),
				selected:
					prev.selected?.id === id
						? { ...prev.selected, status: "cancelled" as const }
						: prev.selected
			}
		})
	}

	async function receiveOrder(data: Omit<ReceiveOrderDTO, "userId">): Promise<void> {
		if (!user) return
		await OrderService.receive({ ...data, userId: user.id })
		setState((prev) => {
			const orders = prev.orders.map((o) =>
				o.id === data.orderId ? ({ ...o, status: "received" } as Order) : o
			)
			return {
				...prev,
				orders,
				filtered: applyFilter(orders, prev.statusFilter),
				selected:
					prev.selected?.id === data.orderId
						? ({ ...prev.selected, status: "received" } as Order)
						: prev.selected
			}
		})
	}

	return {
		...state,
		load,
		setStatusFilter,
		selectOrder,
		createOrder,
		cancelOrder,
		receiveOrder
	}
}
