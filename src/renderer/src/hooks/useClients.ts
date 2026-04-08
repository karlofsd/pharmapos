import { ClientService, CreateClientDTO, UpdateClientDTO } from "@renderer/services/clientService"
import { Client } from "@renderer/types"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useAuth"

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
}

interface UseClientsReturn extends UseClientsState {
	load: () => Promise<void>
	setSearchTerm: (term: string) => void
	setSort: (sortField: SortField, sortOrder: SortOrder) => void
	selectClient: (client: Client | null) => void
	createClient: (data: CreateClientDTO) => Promise<void>
	updateClient: (id: string, data: UpdateClientDTO) => Promise<void>
	deactivateClient: (id: string) => Promise<void>
	getClient: (id: string) => Promise<Client | null>
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
		sortOrder: "asc"
	})

	const applyFilters = useCallback(
		(
			clients: Client[],
			searchTerm: string,
			sortField: SortField,
			sortOrder: SortOrder
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
				const aValue = a[sortField]
				const bValue = b[sortField]

				if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
				if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
				return 0
			})

			return result
		},
		[]
	)

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const clients = await ClientService.getAll()
			setState((prev) => ({
				...prev,
				isLoading: false,
				clients,
				filtered: applyFilters(clients, prev.searchTerm, prev.sortField, prev.sortOrder)
			}))
		} catch {
			setState((prev) => ({ ...prev, isLoading: false, error: "Failed to load clients" }))
		}
	}, [applyFilters])

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		load()
	}, [load])

	async function getClient(id: string): Promise<Client | null> {
		try {
			return await ClientService.getById(id)
		} catch (error) {
			console.log("No se pudo obtener cliente: ", error)
			return null
		}
	}

	function setSearchTerm(searchTerm: string): void {
		setState((prev) => ({
			...prev,
			searchTerm,
			filtered: applyFilters(prev.clients, searchTerm, prev.sortField, prev.sortOrder)
		}))
	}

	function setSort(sortField: SortField, sortOrder: SortOrder): void {
		setState((prev) => ({
			...prev,
			sortField,
			sortOrder,
			filtered: applyFilters(prev.clients, prev.searchTerm, sortField, sortOrder)
		}))
	}

	function selectClient(client: Client | null): void {
		setState((prev) => ({ ...prev, selected: client }))
	}

	async function createClient(data: CreateClientDTO): Promise<void> {
		const created = await ClientService.create(data, user!.id)
		setState((prev) => {
			const clients = [...prev.clients, created]
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
		load,
		setSearchTerm,
		setSort,
		selectClient,
		createClient,
		updateClient,
		deactivateClient,
		getClient
	}
}
