import { useState, useEffect, useCallback } from "react"
import { Credit } from "@renderer/types"
import { CreditService } from "@renderer/services/creditService"
import { useAuth } from "@renderer/hooks/useAuth"

interface UseCreditsState {
	credits: Credit[]
	filtered: Credit[]
	selected: Credit | null
	isLoading: boolean
	error: string | null
	searchTerm: string
	typeFilter: "all" | "debt" | "favor"
}

interface UseCreditsReturn extends UseCreditsState {
	load: () => Promise<void>
	setSearchTerm: (term: string) => void
	setTypeFilter: (type: "all" | "debt" | "favor") => void
	selectCredit: (credit: Credit | null) => void
	registerPayment: (
		creditId: string,
		clientId: string,
		amount: number,
		paymentMethod: "cash" | "wallet"
	) => Promise<void>
	createFavor: (clientId: string, clientName: string, amount: number) => Promise<void>
}

export function useCredits(clientId?: string): UseCreditsReturn {
	const { user } = useAuth()
	const [state, setState] = useState<UseCreditsState>({
		credits: [],
		filtered: [],
		selected: null,
		isLoading: true,
		error: null,
		searchTerm: "",
		typeFilter: "all"
	})

	function applyFilters(credits: Credit[], searchTerm: string, typeFilter: string): Credit[] {
		let result = [...credits]
		if (typeFilter !== "all") {
			result = result.filter((c) => c.type === typeFilter)
		}
		if (searchTerm.trim()) {
			const lower = searchTerm.toLowerCase()
			result = result.filter((c) => c.clientName.toLowerCase().includes(lower))
		}
		return result
	}

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const credits = clientId
				? await CreditService.getByClient(clientId)
				: await CreditService.getAll()

			setState((prev) => ({
				...prev,
				credits,
				filtered: applyFilters(credits, prev.searchTerm, prev.typeFilter),
				isLoading: false
			}))
		} catch {
			setState((prev) => ({
				...prev,
				error: "Error al cargar créditos",
				isLoading: false
			}))
		}
	}, [clientId])

	useEffect(() => {
		CreditService.checkAndUpdateOverdue().then(() => load())
	}, [load])

	function setSearchTerm(searchTerm: string): void {
		setState((prev) => ({
			...prev,
			searchTerm,
			filtered: applyFilters(prev.credits, searchTerm, prev.typeFilter)
		}))
	}

	function setTypeFilter(typeFilter: "all" | "debt" | "favor"): void {
		setState((prev) => ({
			...prev,
			typeFilter,
			filtered: applyFilters(prev.credits, prev.searchTerm, typeFilter)
		}))
	}

	function selectCredit(credit: Credit | null): void {
		setState((prev) => ({ ...prev, selected: credit }))
	}

	async function registerPayment(
		creditId: string,
		clientId: string,
		amount: number,
		paymentMethod: "cash" | "wallet"
	): Promise<void> {
		if (!user) return
		await CreditService.registerPayment({
			creditId,
			clientId,
			amount,
			paymentMethod,
			cashierId: user.id
		})
		await load()
	}

	async function createFavor(
		clientId: string,
		clientName: string,
		amount: number
	): Promise<void> {
		if (!user) return
		await CreditService.createFavor(clientId, clientName, amount, user.id)
		await load()
	}

	return {
		...state,
		load,
		setSearchTerm,
		setTypeFilter,
		selectCredit,
		registerPayment,
		createFavor
	}
}
