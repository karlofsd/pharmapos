import { useState } from "react"
import { Search, Wallet } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
import { useCredits } from "@renderer/hooks/useCredits"
import { useClients } from "@renderer/hooks/useClients"
import { useUIStore } from "@renderer/store/uiStore"
import { Client, Credit } from "@renderer/types"
import { CreditCard } from "./components/CreditCard"
import { CreditDetail } from "./components/CreditDetail"
import { PaymentForm } from "./components/PaymentForm"
import { FavorForm } from "./components/FavorForm"

type DialogType = "payment" | "favor" | "none"

export default function CreditsPage(): React.ReactElement {
	const {
		filtered,
		selected,
		isLoading,
		error,
		searchTerm,
		typeFilter,
		setSearchTerm,
		setTypeFilter,
		selectCredit,
		registerPayment,
		createFavor
	} = useCredits()

	const { getClient } = useClients()
	const { setSidebarCollapsed } = useUIStore()
	const [selectedClient, setSelectedClient] = useState<Client | null>(null)
	const [dialog, setDialog] = useState<DialogType>("none")

	// Totales
	const totalDebt = filtered
		.filter((c) => c.type === "debt")
		.reduce((sum, c) => sum + c.balance, 0)
	const totalFavor = filtered
		.filter((c) => c.type === "favor")
		.reduce((sum, c) => sum + c.balance, 0)

	function handleSelectCredit(credit: Credit): void {
		getClient(credit.clientId).then((client) => {
			selectCredit(credit)
			setSelectedClient(client)
			setSidebarCollapsed(true)
		})
	}

	function handleClose(): void {
		selectCredit(null)
		setSelectedClient(null)
		setSidebarCollapsed(false)
	}

	function handlePay(credit: Credit): void {
		selectCredit(credit)
		setDialog("payment")
	}

	async function handlePaymentSubmit(amount: number, method: "cash" | "wallet"): Promise<void> {
		if (!selected) return
		// const client = clients.find((c) => c.id === selected.clientId)
		// if (!client) return
		await registerPayment(selected.id, selected.clientId, amount, method)
		setDialog("none")
	}

	async function handleFavorSubmit(
		clientId: string,
		clientName: string,
		amount: number
	): Promise<void> {
		await createFavor(clientId, clientName, amount)
		setDialog("none")
	}

	return (
		<div className="flex h-full">
			{/* Lista */}
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Créditos</h1>
						<p className="text-sm text-slate-500">
							{filtered.length} {filtered.length === 1 ? "registro" : "registros"}
						</p>
					</div>
					<Button onClick={() => setDialog("favor")}>
						<Wallet size={16} />
						Saldo a favor
					</Button>
				</div>

				{/* Totales */}
				<div className="grid grid-cols-2 gap-3">
					<div className="bg-red-50 border border-red-100 rounded-lg p-3 flex justify-between items-center">
						<p className="text-sm text-red-600">Total por cobrar</p>
						<p className="font-bold text-red-700">S/. {totalDebt.toFixed(2)}</p>
					</div>
					<div className="bg-green-50 border border-green-100 rounded-lg p-3 flex justify-between items-center">
						<p className="text-sm text-green-600">Total a favor clientes</p>
						<p className="font-bold text-green-700">S/. {totalFavor.toFixed(2)}</p>
					</div>
				</div>

				{/* Filtros */}
				<div className="flex items-center gap-3">
					<div className="relative flex-1 max-w-sm">
						<Search
							size={16}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
						/>
						<Input
							placeholder="Buscar por cliente..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Select
						value={typeFilter}
						onValueChange={(val) => setTypeFilter(val as typeof typeFilter)}
					>
						<SelectTrigger className="w-40">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="debt">Deudas</SelectItem>
							<SelectItem value="favor">Saldos a favor</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Lista */}
				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando créditos...</p>
					</div>
				) : error ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-red-500">{error}</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">No hay créditos activos</p>
					</div>
				) : (
					<div className="flex-1 overflow-y-auto flex flex-col gap-2">
						{filtered.map((credit) => (
							<CreditCard
								key={credit.id}
								credit={credit}
								isSelected={selected?.id === credit.id}
								onClick={() => handleSelectCredit(credit)}
								onPay={() => handlePay(credit)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Panel derecho */}
			{selected && dialog === "none" && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
					<CreditDetail credit={selected} onClose={handleClose} />
				</div>
			)}

			{/* Dialog abono */}
			<Dialog open={dialog === "payment"} onOpenChange={(open) => !open && setDialog("none")}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Registrar abono</DialogTitle>
					</DialogHeader>
					{selected && (
						<PaymentForm
							credit={selected}
							clientFavorBalance={selectedClient?.favorBalance ?? 0}
							onSubmit={handlePaymentSubmit}
							onCancel={() => setDialog("none")}
						/>
					)}
				</DialogContent>
			</Dialog>

			{/* Dialog saldo a favor */}
			<Dialog open={dialog === "favor"} onOpenChange={(open) => !open && setDialog("none")}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Crear saldo a favor</DialogTitle>
					</DialogHeader>
					<FavorForm onSubmit={handleFavorSubmit} onCancel={() => setDialog("none")} />
				</DialogContent>
			</Dialog>
		</div>
	)
}
