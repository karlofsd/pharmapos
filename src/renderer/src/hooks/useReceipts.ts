import { useState, useCallback } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { getDb } from "@renderer/services/firebase"
import { Receipt, SunatStatus } from "shared/types/receipt.type"
import { ReceiptSunatService } from "@renderer/services/sunatService"
import { ReceiptService } from "@renderer/services/receiptService"
import { VoucherType } from "@renderer/types"

export type SortField = "date" | "voucherType" | "sunatStatus" | "totalPrice"
export type SortOrder = "asc" | "desc"

export interface ReceiptsFilters {
	dateFrom?: Date
	dateTo?: Date
	voucherType?: VoucherType | "all"
	sunatStatus?: SunatStatus | "all"
}

const PAGE_SIZE = 20

interface UseReceiptsState {
	receipts: Receipt[]
	isLoading: boolean
	error: string | null
	page: number
	totalPages: number
	sortField: SortField
	sortOrder: SortOrder
	filters: ReceiptsFilters
	updatingId: string | null
}

interface UseReceiptsReturn extends UseReceiptsState {
	load: (
		filters?: ReceiptsFilters,
		sortfield?: SortField,
		sortOrder?: SortOrder,
		page?: number
	) => Promise<void>
	updateStatus: (data: Receipt) => void
	setSort: (field: SortField) => void
	setPage: (page: number) => void
	setFilters: (filter: ReceiptsFilters) => void
}

export function useReceipts(): UseReceiptsReturn {
	const [state, setState] = useState<UseReceiptsState>({
		receipts: [],
		isLoading: false,
		error: null,
		page: 1,
		totalPages: 1,
		sortField: "date",
		sortOrder: "desc",
		filters: { voucherType: "all", sunatStatus: "all" },
		updatingId: null
	})

	const load = useCallback(
		async (
			filters: ReceiptsFilters = {},
			sortField: SortField = "date",
			sortOrder: SortOrder = "desc",
			page = 1
		) => {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			try {
				const db = getDb()
				const q = query(collection(db, "receipts"), orderBy("createdAt", "desc"))
				const snapshot = await getDocs(q)
				let receipts = snapshot.docs.map(
					(d) =>
						({
							id: d.id,
							...d.data()
						}) as Receipt
				)

				// Filtros locales
				if (filters.dateFrom) {
					receipts = receipts.filter((r) => {
						const date = new Date(r.date)
						return date >= filters.dateFrom!
					})
				}
				if (filters.dateTo) {
					const to = new Date(filters.dateTo)
					to.setHours(23, 59, 59)
					receipts = receipts.filter((r) => new Date(r.date) <= to)
				}
				if (filters.voucherType && filters.voucherType !== "all") {
					receipts = receipts.filter((r) => r.voucherType === filters.voucherType)
				}
				if (filters.sunatStatus && filters.sunatStatus !== "all") {
					receipts = receipts.filter((r) => r.sunatStatus === filters.sunatStatus)
				}

				// Ordenamiento local
				receipts.sort((a, b) => {
					let aVal: string | number = ""
					let bVal: string | number = ""

					if (sortField === "date") {
						aVal = a.date
						bVal = b.date
					}
					if (sortField === "voucherType") {
						aVal = a.voucherType
						bVal = b.voucherType
					}
					if (sortField === "sunatStatus") {
						aVal = a.sunatStatus ?? ""
						bVal = b.sunatStatus ?? ""
					}
					if (sortField === "totalPrice") {
						aVal = a.totalPrice
						bVal = b.totalPrice
					}

					if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
					if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
					return 0
				})

				const totalPages = Math.max(1, Math.ceil(receipts.length / PAGE_SIZE))
				const paginated = receipts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

				setState((prev) => ({
					...prev,
					receipts: paginated,
					totalPages,
					page,
					sortField,
					sortOrder,
					filters,
					isLoading: false
				}))
			} catch {
				setState((prev) => ({
					...prev,
					error: "Error al cargar comprobantes",
					isLoading: false
				}))
			}
		},
		[]
	)

	async function updateStatus(receipt: Receipt): Promise<void> {
		if (!receipt.id || !receipt.serialCode) return
		setState((prev) => ({ ...prev, updatingId: receipt.id! }))
		try {
			const result = await ReceiptSunatService.status(receipt.voucherType, receipt.serialCode)
			if (result.payload?.estado && result.payload.estado !== receipt.sunatStatus) {
				await ReceiptService.update(receipt.id, {
					sunatStatus: result.payload.estado,
					sunatMessage: result.message
				})
				setState((prev) => ({
					...prev,
					receipts: prev.receipts.map((r) =>
						r.id === receipt.id ? { ...r, sunatStatus: result.payload!.estado } : r
					)
				}))
			}
		} finally {
			setState((prev) => ({ ...prev, updatingId: null }))
		}
	}

	function setSort(field: SortField): void {
		const newOrder = state.sortField === field && state.sortOrder === "asc" ? "desc" : "asc"
		load(state.filters, field, newOrder, 1)
	}

	function setPage(page: number): void {
		load(state.filters, state.sortField, state.sortOrder, page)
	}

	function setFilters(filters: ReceiptsFilters): void {
		load(filters, state.sortField, state.sortOrder, 1)
	}

	return {
		...state,
		load,
		updateStatus,
		setSort,
		setPage,
		setFilters
	}
}
