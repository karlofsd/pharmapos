import { User, FileText, CreditCard, X, Search } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Badge } from "@renderer/components/ui/badge"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@renderer/components/ui/select"
import { Separator } from "@renderer/components/ui/separator"
import { useCartStore, VoucherType, CartPaymentMethod } from "@renderer/store/cartStore"
import { cn } from "@renderer/lib/utils"
import { useClients } from "@renderer/hooks/useClients"
import { useState } from "react"
import { UserUtils } from "@renderer/types"

interface PaymentPanelProps {
	onConfirm: () => Promise<void>
	isProcessing: boolean
}

export function PaymentPanel({ onConfirm, isProcessing }: PaymentPanelProps): React.ReactElement {
	const {
		items,
		total,
		change,
		voucherType,
		paymentMethod,
		client,
		cashReceived,
		cardAmount,
		walletAmount,
		setVoucherType,
		setPaymentMethod,
		setCashReceived,
		setCardAmount,
		setWalletAmount,
		clearClient
	} = useCartStore()

	const { clients } = useClients()
	const { setClient } = useCartStore()
	const [clientSearch, setClientSearch] = useState("")
	const [showClientSearch, setShowClientSearch] = useState(false)

	const filteredClients = clientSearch.trim()
		? clients.filter(
			(c) =>
				UserUtils.getFullname(c).toLowerCase().includes(clientSearch.toLowerCase()) ||
				Object.values(c.document).some((v) => v.includes(clientSearch))
		)
		: clients.slice(0, 5)

	const isEmpty = items.length === 0
	const needsClient = voucherType === "factura" || paymentMethod === "credit"

	const isValid = (() => {
		if (isEmpty) return false
		if (needsClient && !client?.id) return false
		if (paymentMethod === "cash" && cashReceived < total) return false
		if (paymentMethod === "mixed") {
			const covered = cashReceived + cardAmount + walletAmount
			if (covered < total) return false
		}
		return true
	})()

	return (
		<div className="flex flex-col h-full">
			{/* Comprobante */}
			<div className="p-4 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
					<FileText size={13} />
					Comprobante
				</div>
				<div className="grid grid-cols-2 gap-2">
					{(["boleta", "factura"] as VoucherType[]).map((type) => (
						<button
							key={type}
							onClick={() => setVoucherType(type)}
							className={cn(
								"py-2 rounded-lg text-sm font-medium border transition-colors capitalize",
								voucherType === type
									? "bg-slate-800 text-white border-slate-800"
									: "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
							)}
						>
							{type}
						</button>
					))}
				</div>
			</div>

			<Separator />

			{/* Cliente */}
			<div className="p-4 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
					<User size={13} />
					Cliente
					{needsClient && (
						<Badge variant="destructive" className="text-xs py-0">
							Requerido
						</Badge>
					)}
				</div>
				{client?.id ? (
					<div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
						<p className="text-sm font-medium text-slate-800">{UserUtils.getFullname(client)}</p>
						<button
							onClick={() => {
								clearClient()
								setShowClientSearch(false)
							}}
							className="text-slate-400 hover:text-red-500 transition-colors"
						>
							<X size={14} />
						</button>
					</div>
				) : (
					<div className="relative">
						<div className="relative">
							<Search
								size={14}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
							/>
							<input
								placeholder="Buscar cliente..."
								value={clientSearch}
								onChange={(e) => {
									setClientSearch(e.target.value)
									setShowClientSearch(true)
								}}
								onFocus={() => setShowClientSearch(true)}
								className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
							/>
						</div>
						{showClientSearch && (
							<div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
								<div className="max-h-40 overflow-y-auto">
									{filteredClients.length === 0 ? (
										<p className="text-xs text-slate-400 text-center py-3">
											No se encontraron clientes
										</p>
									) : (
										filteredClients.map((client) => (
											<button
												key={client.id}
												type="button"
												onMouseDown={(e) => e.preventDefault()}
												onClick={() => {
													setClient(
														client
													)
													setClientSearch("")
													setShowClientSearch(false)
												}}
												className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
											>
												<p className="font-medium text-slate-800">
													{UserUtils.getFullname(client)}
												</p>
												<p className="text-xs text-slate-400">
													{Object.entries(client.document)
														.map(
															([type, num]) =>
																`${type.toUpperCase()}: ${num}`
														)
														.join(", ")}
												</p>
											</button>
										))
									)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			<Separator />

			{/* Método de pago */}
			<div className="p-4 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
					<CreditCard size={13} />
					Método de pago
				</div>
				<Select
					value={paymentMethod}
					onValueChange={(val) => setPaymentMethod(val as CartPaymentMethod)}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="cash">Efectivo</SelectItem>
						<SelectItem value="card">Tarjeta</SelectItem>
						<SelectItem value="credit">Crédito</SelectItem>
						<SelectItem value="wallet">Saldo a favor</SelectItem>
						<SelectItem value="mixed">Mixto</SelectItem>
					</SelectContent>
				</Select>

				{/* Efectivo */}
				{(paymentMethod === "cash" || paymentMethod === "mixed") && (
					<div className="flex flex-col gap-1 mt-1">
						<Label className="text-xs">
							{paymentMethod === "mixed"
								? "Monto efectivo (S/.)"
								: "Monto recibido (S/.)"}
						</Label>
						<Input
							type="number"
							min={0}
							step={0.01}
							placeholder="0.00"
							value={cashReceived || ""}
							onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
						/>
						{paymentMethod === "cash" && cashReceived >= total && (
							<div className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
								<span className="text-xs text-green-700">Cambio</span>
								<span className="text-sm font-bold text-green-700">
									S/. {change.toFixed(2)}
								</span>
							</div>
						)}
					</div>
				)}

				{/* Tarjeta */}
				{paymentMethod === "mixed" && (
					<div className="flex flex-col gap-1">
						<Label className="text-xs">Monto tarjeta (S/.)</Label>
						<Input
							type="number"
							min={0}
							step={0.01}
							placeholder="0.00"
							value={cardAmount || ""}
							onChange={(e) => setCardAmount(parseFloat(e.target.value) || 0)}
						/>
					</div>
				)}

				{/* Saldo a favor */}
				{(paymentMethod === "wallet" || paymentMethod === "mixed") && (
					<div className="flex flex-col gap-1">
						<Label className="text-xs">Saldo a favor (S/.)</Label>
						<Input
							type="number"
							min={0}
							step={0.01}
							placeholder="0.00"
							value={walletAmount || ""}
							onChange={(e) => setWalletAmount(parseFloat(e.target.value) || 0)}
						/>
					</div>
				)}
			</div>

			<Separator />

			{/* Total y botón cobrar */}
			<div className="p-4 flex flex-col gap-3 mt-auto">
				<div className="flex items-center justify-between">
					<span className="text-slate-600 font-medium">Total</span>
					<span className="text-2xl font-bold text-slate-800">
						S/. {total.toFixed(2)}
					</span>
				</div>
				<Button
					onClick={onConfirm}
					disabled={!isValid || isProcessing}
					className="w-full h-12 text-base font-bold"
				>
					{isProcessing
						? "Procesando..."
						: isEmpty
							? "Carrito vacío"
							: `Cobrar S/. ${total.toFixed(2)}`}
				</Button>
			</div>
		</div>
	)
}
