import React, { useState } from "react"
import { Plus, Search, ArrowUpDown } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { useProducts } from "@renderer/hooks/useProducts"
import { useAuth } from "@renderer/hooks/useAuth"
import { Product } from "@renderer/types"
import ProductDetail from "./components/ProductDetail"
import ProductForm from "./components/ProductForm"
import ProductCard from "./components/ProductCard"
import { CreateProductDTO, UpdateProductDTO } from "@renderer/services/productService"
import { useUIStore } from "@renderer/store/uiStore"
import { useLots } from "@renderer/hooks/useLots"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
import { LotForm } from "../inventory/components/LotForm"

export default function ProductsPage(): React.ReactElement {
	const { user } = useAuth()
	const {
		filtered,
		selected,
		isLoading,
		error,
		searchTerm,
		sortField,
		sortOrder,
		setSearchTerm,
		setSort,
		selectProduct,
		createProduct,
		updateProduct,
		deactivateProduct
	} = useProducts()
	const { setSidebarCollapsed } = useUIStore()
	const [showForm, setShowForm] = useState(false)
	const [showAddLotPrompt, setShowAddLotPrompt] = useState(false)
	const [showLotForm, setShowLotForm] = useState(false)
	const [createdProductId, setCreatedProductId] = useState<string | null>(null)
	const { createLot } = useLots()

	const isAdmin = user?.role === "admin"

	function handleSelectProduct(product: Product): void {
		selectProduct(product)
		setShowForm(false)
		setSidebarCollapsed(true)
	}

	function handleCloseDetail(): void {
		selectProduct(null)
		setShowForm(false)
		setSidebarCollapsed(false)
	}

	function handleNewProduct(): void {
		selectProduct(null)
		setShowForm(true)
		setSidebarCollapsed(true)
	}

	function handleEdit(): void {
		setShowForm(true)
	}

	function handleCancelEdit(): void {
		setShowForm(false)
	}

	async function handleSubmit(data: CreateProductDTO | UpdateProductDTO): Promise<void> {
		if (selected) {
			await updateProduct(selected.id, data as UpdateProductDTO)
			setShowForm(false)
		} else {
			const created = await createProduct(data as CreateProductDTO)
			setShowForm(false)
			setCreatedProductId(created.id)
			setShowAddLotPrompt(true)  // ← pregunta si agrega lote
		}
	}

	return (
		<div className="flex h-full">
			{/* Lista principal */}
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Productos</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} productos encontrados
						</p>
					</div>
					{isAdmin && (
						<Button onClick={handleNewProduct}>
							<Plus size={16} />
							Nuevo producto
						</Button>
					)}
				</div>

				{/* Filtros */}
				<div className="flex items-center gap-3">
					<div className="relative flex-1 max-w-sm">
						<Search
							size={16}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
						/>
						<Input
							placeholder="Buscar por nombre, laboratorio, código..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="flex items-center gap-2">
						<ArrowUpDown size={16} className="text-slate-400" />
						<Select
							value={`${sortField}-${sortOrder}`}
							onValueChange={(val) => {
								const [field, order] = val.split("-") as [
									typeof sortField,
									typeof sortOrder
								]
								setSort(field, order)
							}}
						>
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="brand-asc">Nombre A-Z</SelectItem>
								<SelectItem value="brand-desc">Nombre Z-A</SelectItem>
								<SelectItem value="manufacturer-asc">Laboratorio A-Z</SelectItem>
								<SelectItem value="createdAt-desc">Más recientes</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Lista */}
				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando productos...</p>
					</div>
				) : error ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">No se encontraron productos</p>
					</div>
				) : (
					<div className="flex-1 overflow-y-auto flex flex-col gap-2">
						{filtered.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								isSelected={selected?.id === product.id}
								onClick={() => handleSelectProduct(product)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Panel derecho */}
			{(selected || showForm) && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					{showForm ? (
						<ProductForm
							product={selected ?? undefined}
							onSubmit={handleSubmit}
							onCancel={handleCancelEdit}
						/>
					) : selected ? (
						<ProductDetail
							product={selected}
							onEdit={isAdmin ? handleEdit : undefined}
							onDeactivate={
								isAdmin ? () => deactivateProduct(selected.id) : undefined
							}
							onClose={handleCloseDetail}
						/>
					) : null}
				</div>
			)}

			{/* Dialog — ¿Agregar lote? */}
			<Dialog
				open={showAddLotPrompt}
				onOpenChange={(open) => !open && setShowAddLotPrompt(false)}
			>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Producto creado</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<p className="text-sm text-slate-600">
							¿Deseas agregar un lote a este producto ahora?
						</p>
						<div className="flex gap-2">
							<Button
								className="flex-1"
								onClick={() => {
									setShowAddLotPrompt(false)
									setShowLotForm(true)
								}}
							>
								Sí, agregar lote
							</Button>
							<Button
								variant="outline"
								onClick={() => {
									setShowAddLotPrompt(false)
									setCreatedProductId(null)
								}}
							>
								No, terminar
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Dialog — Form de lote */}
			<Dialog
				open={showLotForm}
				onOpenChange={(open) => !open && setShowLotForm(false)}
			>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Agregar lote</DialogTitle>
					</DialogHeader>
					{createdProductId && (
						<LotForm
							productId={createdProductId}
							onSubmit={async (data) => {
								await createLot(data)
								setShowLotForm(false)
								// Preguntar si agrega otro lote
								setShowAddLotPrompt(true)
							}}
							onCancel={() => {
								setShowLotForm(false)
								setCreatedProductId(null)
							}}
							submitLabel="Guardar lote"
							cancelLabel="Terminar"
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
