import { ClientService, CreateClientDTO, UpdateClientDTO } from "@renderer/services/clientService"
import { Client } from "@renderer/types"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { useLazyList } from "./useLazyList"
import { PaginationParams, PaginationResult } from "@renderer/lib/pagination"

type SortField = "name" | "lastname"
type SortOrder = "asc" | "desc"

interface UseClientsState {
	clients: Client[]
	filtered: Client[]
	selected: Client | null
	isLoading: boolean
	error: string | null
	searchTerm: string
	sortField: SortField
	sortOrder: SortOrder
	hasMore: boolean
}

interface UseClientsReturn extends UseClientsState {
	load: () => Promise<void>
	loadMore: () => Promise<void>
	setSearchTerm: (term: string) => void
	setSort: (sortField: SortField, sortOrder: SortOrder) => void
	selectClient: (client: Client | null) => void
	createClient: (data: CreateClientDTO) => Promise<void>
	updateClient: (id: string, data: UpdateClientDTO) => Promise<void>
	deactivateClient: (id: string) => Promise<void>
	getClient: (id: string) => Promise<Client | null>
}

const applyFilters = (
	clients: Client[],
	searchTerm: string,
	sortField: string,
	sortOrder: string
): Client[] => {
	let result = [...clients]

	if (searchTerm) {
		const normalizedQuery = searchTerm.trim().toLowerCase()
		result = clients.filter(
			(client) =>
				client.name.toLowerCase().includes(normalizedQuery) ||
				Object.values(client.document).some((doc) => doc.includes(normalizedQuery))
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

export function useClients(): UseClientsReturn {
	const { user } = useAuth()
	const [state, setState] = useState<UseClientsState>({
		clients: [],
		filtered: [],
		selected: null,
		isLoading: false,
		error: null,
		searchTerm: "",
		sortField: "name",
		sortOrder: "asc",
		hasMore: true
	})

	// Lazy loader function
	const clientLoader = useCallback(
		(params: PaginationParams): Promise<PaginationResult<Client>> => {
			return ClientService.getPage(params)
		},
		[]
	)

	// Use lazy list for base functionality
	const lazyList = useLazyList(clientLoader, applyFilters, {
		pageSize: 50,
		maxItems: 500,
		initialSortField: "name",
		initialSortOrder: "asc"
	})

	// Merge with custom state
	useEffect(() => {
		setState((prev) => ({
			...prev,
			clients: lazyList.items,
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

	async function getClient(id: string): Promise<Client | null> {
		try {
			return await ClientService.getById(id)
		} catch (error) {
			console.log("No se pudo obtener cliente: ", error)
			return null
		}
	}

	async function createClient(data: CreateClientDTO): Promise<void> {
		const created = await ClientService.create(data, user!.id)
		setState((prev) => {
			const clients = [created, ...prev.clients]
			return {
				...prev,
				clients,
				filtered: applyFilters(clients, prev.searchTerm, prev.sortField, prev.sortOrder)
			}
		})
	}

	async function updateClient(id: string, data: UpdateClientDTO): Promise<void> {
		await ClientService.update(id, data, user!.id)
		setState((prev) => {
			const clients = prev.clients.map((p) => (p.id === id ? { ...p, ...data } : p))
			return {
				...prev,
				clients,
				filtered: applyFilters(clients, prev.searchTerm, prev.sortField, prev.sortOrder),
				selected: prev.selected?.id === id ? { ...prev.selected, ...data } : prev.selected
			}
		})
	}

	async function deactivateClient(id: string): Promise<void> {
		await ClientService.deactivate(id)
		setState((prev) => {
			const clients = prev.clients.filter((p) => p.id !== id)
			return {
				...prev,
				clients,
				filtered: applyFilters(clients, prev.searchTerm, prev.sortField, prev.sortOrder),
				selected: prev.selected?.id === id ? null : prev.selected
			}
		})
	}

	return {
		...state,
		load: lazyList.load,
		loadMore: lazyList.loadMore,
		setSearchTerm: lazyList.setSearchTerm,
		setSort: lazyList.setSort as (sortField: SortField, sortOrder: SortOrder) => void,
		selectClient: lazyList.selectItem,
		createClient,
		updateClient,
		deactivateClient,
		getClient
	}
}
