import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { useSuppliers } from "@renderer/hooks/useSuppliers"
import { useUIStore } from "@renderer/store/uiStore"
import { Supplier } from "@renderer/types"
import { SupplierCard } from "./components/SupplierCard"
import { SupplierDetail } from "./components/SupplierDetail"
import { SupplierForm } from "./components/SupplierForm"
import { CreateSupplierDTO, UpdateSupplierDTO } from "@renderer/services/supplierService"
import { useLocation } from "react-router-dom"
import { set } from "zod"

export default function SuppliersPage(): React.ReactElement {
	const {
		filtered,
		selected,
		isLoading,
		error,
		searchTerm,
		setSearchTerm,
		selectSupplier,
		createSupplier,
		updateSupplier,
		deactivateSupplier
	} = useSuppliers()

	const { setSidebarCollapsed } = useUIStore()
	const [showForm, setShowForm] = useState(false)
	const { state } = useLocation()

	useEffect(() => {
		if (state?.showForm) setShowForm(state.showForm)
	}, [state])

	function handleSelectSupplier(supplier: Supplier): void {
		selectSupplier(supplier)
		setShowForm(false)
		setSidebarCollapsed(true)
	}

	function handleCloseDetail(): void {
		selectSupplier(null)
		setShowForm(false)
		setSidebarCollapsed(false)
	}

	function handleNewSupplier(): void {
		selectSupplier(null)
		setShowForm(true)
		setSidebarCollapsed(true)
	}

	async function handleSubmit(data: CreateSupplierDTO | UpdateSupplierDTO): Promise<void> {
		if (selected) {
			await updateSupplier(selected.id, data as UpdateSupplierDTO)
		} else {
			await createSupplier(data as CreateSupplierDTO)
		}
		setShowForm(false)
	}

	return (
		<div className="flex h-full">
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Proveedores</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} {filtered.length === 1 ? "proveedor" : "proveedores"}
						</p>
					</div>
					<Button onClick={handleNewSupplier}>
						<Plus size={16} />
						Nuevo proveedor
					</Button>
				</div>

				<div className="relative max-w-sm">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
					/>
					<Input
						placeholder="Buscar por nombre, RUC, teléfono..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-9"
					/>
				</div>

				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando proveedores...</p>
					</div>
				) : error ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">No se encontraron proveedores</p>
					</div>
				) : (
					<div className="flex-1 overflow-y-auto flex flex-col gap-2">
						{filtered.map((supplier) => (
							<SupplierCard
								key={supplier.id}
								supplier={supplier}
								isSelected={selected?.id === supplier.id}
								onClick={() => handleSelectSupplier(supplier)}
							/>
						))}
					</div>
				)}
			</div>

			{(selected || showForm) && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					{showForm ? (
						<SupplierForm
							supplier={selected ?? undefined}
							onSubmit={handleSubmit}
							onCancel={handleCloseDetail}
						/>
					) : selected ? (
						<SupplierDetail
							supplier={selected}
							onEdit={() => setShowForm(true)}
							onDeactivate={() => deactivateSupplier(selected.id)}
							onClose={handleCloseDetail}
						/>
					) : null}
				</div>
			)}
		</div>
	)
}
