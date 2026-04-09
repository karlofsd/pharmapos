/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react"
import { Supplier } from "@renderer/types"
import {
	SupplierService,
	CreateSupplierDTO,
	UpdateSupplierDTO
} from "@renderer/services/supplierService"

interface UseSuppliersState {
	suppliers: Supplier[]
	filtered: Supplier[]
	selected: Supplier | null
	isLoading: boolean
	error: string | null
	searchTerm: string
}

interface UseSuppliersReturn extends UseSuppliersState {
	load: () => Promise<void>
	setSearchTerm: (term: string) => void
	selectSupplier: (supplier: Supplier | null) => void
	createSupplier: (data: CreateSupplierDTO) => Promise<Supplier>
	updateSupplier: (id: string, data: UpdateSupplierDTO) => Promise<void>
	deactivateSupplier: (id: string) => Promise<void>
}

export function useSuppliers(): UseSuppliersReturn {
	const [state, setState] = useState<UseSuppliersState>({
		suppliers: [],
		filtered: [],
		selected: null,
		isLoading: true,
		error: null,
		searchTerm: ""
	})

	function applyFilter(suppliers: Supplier[], term: string): Supplier[] {
		if (!term.trim()) return suppliers
		const lower = term.toLowerCase()
		return suppliers.filter(
			(s) =>
				s.name.toLowerCase().includes(lower) ||
				s.lastname.toLowerCase().includes(lower) ||
				s.businessName?.toLowerCase()?.includes(lower) ||
				Object.values(s.document).some((v) => v.includes(term)) ||
				s.phoneNumber.number.includes(term)
		)
	}

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const suppliers = await SupplierService.getAll()
			setState((prev) => ({
				...prev,
				suppliers,
				filtered: applyFilter(suppliers, prev.searchTerm),
				isLoading: false
			}))
		} catch {
			setState((prev) => ({
				...prev,
				error: "Error al cargar proveedores",
				isLoading: false
			}))
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	function setSearchTerm(searchTerm: string): void {
		setState((prev) => ({
			...prev,
			searchTerm,
			filtered: applyFilter(prev.suppliers, searchTerm)
		}))
	}

	function selectSupplier(supplier: Supplier | null): void {
		setState((prev) => ({ ...prev, selected: supplier }))
	}

	async function createSupplier(data: CreateSupplierDTO): Promise<Supplier> {
		const created = await SupplierService.create(data)
		setState((prev) => {
			const suppliers = [...prev.suppliers, created].sort((a, b) =>
				a.name.localeCompare(b.name)
			)
			return {
				...prev,
				suppliers,
				filtered: applyFilter(suppliers, prev.searchTerm)
			}
		})
		return created
	}

	async function updateSupplier(id: string, data: UpdateSupplierDTO): Promise<void> {
		await SupplierService.update(id, data)
		setState((prev) => {
			const suppliers = prev.suppliers.map((s) => (s.id === id ? { ...s, ...data } : s))
			return {
				...prev,
				suppliers,
				filtered: applyFilter(suppliers, prev.searchTerm),
				selected: prev.selected?.id === id ? { ...prev.selected, ...data } : prev.selected
			}
		})
	}

	async function deactivateSupplier(id: string): Promise<void> {
		await SupplierService.deactivate(id)
		setState((prev) => {
			const suppliers = prev.suppliers.filter((s) => s.id !== id)
			return {
				...prev,
				suppliers,
				filtered: applyFilter(suppliers, prev.searchTerm),
				selected: prev.selected?.id === id ? null : prev.selected
			}
		})
	}

	return {
		...state,
		load,
		setSearchTerm,
		selectSupplier,
		createSupplier,
		updateSupplier,
		deactivateSupplier
	}
}
