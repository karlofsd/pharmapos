import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { useClients } from "@renderer/hooks/useClients"
import { useUIStore } from "@renderer/store/uiStore"
import { Client } from "@renderer/types"
import { ClientCard } from "./components/ClientCard"
import { ClientDetail } from "./components/ClientDetail"
import { ClientForm } from "./components/ClientForm"
import { CreateClientDTO, UpdateClientDTO } from "@renderer/services/clientService"

export default function ClientsPage(): React.ReactElement {
	const {
		filtered,
		selected,
		isLoading,
		error,
		searchTerm,
		setSearchTerm,
		selectClient,
		createClient,
		updateClient,
		deactivateClient
	} = useClients()

	const { setSidebarCollapsed } = useUIStore()
	const [showForm, setShowForm] = useState(false)

	function handleSelectClient(client: Client): void {
		selectClient(client)
		setShowForm(false)
		setSidebarCollapsed(true)
	}

	function handleCloseDetail(): void {
		selectClient(null)
		setShowForm(false)
		setSidebarCollapsed(false)
	}

	function handleNewClient(): void {
		selectClient(null)
		setShowForm(true)
		setSidebarCollapsed(true)
	}

	async function handleSubmit(data: CreateClientDTO | UpdateClientDTO): Promise<void> {
		if (selected) {
			await updateClient(selected.id, data as UpdateClientDTO)
		} else {
			await createClient(data as CreateClientDTO)
		}
		setShowForm(false)
	}

	return (
		<div className="flex h-full">
			{/* Lista */}
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Clientes</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} {filtered.length === 1 ? "cliente" : "clientes"}{" "}
							encontrados
						</p>
					</div>
					<Button onClick={handleNewClient}>
						<Plus size={16} />
						Nuevo cliente
					</Button>
				</div>

				<div className="relative max-w-sm">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
					/>
					<Input
						placeholder="Buscar por nombre, documento, teléfono..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-9"
					/>
				</div>

				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando clientes...</p>
					</div>
				) : error ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">No se encontraron clientes</p>
					</div>
				) : (
					<div className="flex-1 overflow-y-auto flex flex-col gap-2">
						{filtered.map((client) => (
							<ClientCard
								key={client.id}
								client={client}
								isSelected={selected?.id === client.id}
								onClick={() => handleSelectClient(client)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Panel derecho */}
			{(selected || showForm) && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					{showForm ? (
						<ClientForm
							client={selected ?? undefined}
							onSubmit={handleSubmit}
							onCancel={handleCloseDetail}
						/>
					) : selected ? (
						<ClientDetail
							client={selected}
							onEdit={() => setShowForm(true)}
							onDeactivate={() => deactivateClient(selected.id)}
							onClose={handleCloseDetail}
						/>
					) : null}
				</div>
			)}
		</div>
	)
}
