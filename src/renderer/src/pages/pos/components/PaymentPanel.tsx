import { User, FileText, CreditCard } from "lucide-react"
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
		clientId,
		clientName,
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

	const isEmpty = items.length === 0
	const needsClient = voucherType === "factura" || paymentMethod === "credit"

	const isValid = (() => {
		if (isEmpty) return false
		if (needsClient && !clientId) return false
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
				{clientId ? (
					<div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
						<p className="text-sm font-medium text-slate-800">{clientName}</p>
						<button
							onClick={clearClient}
							className="text-xs text-slate-400 hover:text-red-500 transition-colors"
						>
							Quitar
						</button>
					</div>
				) : (
					<button className="w-full text-left px-3 py-2 rounded-lg border border-dashed border-slate-300 text-sm text-slate-400 hover:border-slate-400 transition-colors">
						+ Buscar cliente
					</button>
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
