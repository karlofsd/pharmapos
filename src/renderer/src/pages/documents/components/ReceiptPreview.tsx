import { X, ExternalLink, Download } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { Separator } from "@renderer/components/ui/separator"
import { Receipt } from "shared/types/receipt.type"

interface ReceiptPreviewProps {
	receipt: Receipt
	onClose: () => void
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
	ACEPTADO: { label: "Aceptado", className: "bg-green-100 text-green-700 border-green-200" },
	PENDIENTE: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
	RECHAZADO: { label: "Rechazado", className: "bg-red-100 text-red-700 border-red-200" },
	ANULADO: { label: "Anulado", className: "bg-slate-100 text-slate-500 border-slate-200" },
	PENDING: { label: "Por enviar", className: "bg-orange-100 text-orange-700 border-orange-200" },
	ERROR: { label: "Error", className: "bg-red-100 text-red-700 border-red-200" }
}

const PAYMENT_LABELS: Record<string, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	credit: "Crédito",
	wallet: "Saldo favor",
	mixed: "Mixto"
}

export function ReceiptPreview({ receipt, onClose }: ReceiptPreviewProps): React.ReactElement {
	const statusConfig = STATUS_CONFIG[receipt.sunatStatus] ?? STATUS_CONFIG.PENDING

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-start justify-between p-4 shrink-0">
				<div>
					<h2 className="font-bold text-slate-800">{receipt.serialCode}</h2>
					<p className="text-sm text-slate-500 capitalize">{receipt.voucherType}</p>
				</div>
				<button onClick={onClose} className="text-slate-400 hover:text-slate-600">
					<X size={18} />
				</button>
			</div>

			<Separator />

			<div className="flex-1 overflow-y-auto">
				{/* PDF iframe si hay URL */}
				{receipt.pdfTicketURL ? (
					<div className="flex flex-col gap-3 p-4">
						<div className="flex gap-2">
							<Button
								size="sm"
								variant="outline"
								className="flex-1"
								onClick={() => window.open(receipt.pdfTicketURL!, "_blank")}
							>
								<ExternalLink size={13} />
								Abrir PDF ticket
							</Button>
							{receipt.pdfA4URL && (
								<Button
									size="sm"
									variant="outline"
									className="flex-1"
									onClick={() => window.open(receipt.pdfA4URL!, "_blank")}
								>
									<Download size={13} />
									PDF A4
								</Button>
							)}
						</div>
						<iframe
							src={receipt.pdfTicketURL}
							className="w-full rounded-lg border border-slate-200"
							style={{ height: "720px" }}
							title={`Comprobante ${receipt.serialCode}`}
						/>
					</div>
				) : (
					/* Vista manual si no hay PDF */
					<div className="p-4 flex flex-col gap-4">
						{/* Estado SUNAT */}
						<div className="flex items-center justify-between">
							<Badge
								variant="outline"
								className={`text-xs ${statusConfig.className}`}
							>
								{statusConfig.label}
							</Badge>
							{receipt.sunatMessage && (
								<p className="text-xs text-slate-400 max-w-48 text-right truncate">
									{receipt.sunatMessage}
								</p>
							)}
						</div>

						{/* Emisor */}
						<div className="bg-slate-50 rounded-lg p-3 text-center">
							<p className="font-bold text-slate-800 text-sm">
								{receipt.ownerBussinesName}
							</p>
							<p className="text-xs text-slate-500">RUC: {receipt.ownerRUC}</p>
							<p className="text-xs text-slate-400">{receipt.ownerAddress}</p>
						</div>

						{/* Info comprobante */}
						<div className="flex flex-col gap-1">
							{[
								{ label: "Serie-Número", value: receipt.serialCode },
								{ label: "Fecha", value: `${receipt.date} ${receipt.hour}` },
								{ label: "Cliente", value: receipt.clientName },
								{
									label: receipt.clientDocumentType ?? "Doc.",
									value: receipt.clientDocument ?? "-"
								},
								{ label: "Cajero", value: receipt.cashierName },
								{
									label: "Pago",
									value:
										PAYMENT_LABELS[receipt.paymentMethod] ??
										receipt.paymentMethod
								}
							].map(({ label, value }) => (
								<div key={label} className="flex justify-between text-sm">
									<span className="text-slate-500">{label}</span>
									<span className="font-medium text-slate-800 text-right max-w-48 truncate">
										{value}
									</span>
								</div>
							))}
						</div>

						<Separator />

						{/* Items */}
						<div className="flex flex-col gap-2">
							<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
								Productos
							</p>
							{receipt.items.map((item, i) => (
								<div
									key={i}
									className="flex justify-between bg-slate-50 rounded px-3 py-2"
								>
									<div>
										<p className="text-xs font-medium text-slate-800">
											{item.productName}
										</p>
										<p className="text-xs text-slate-400">
											{item.quantity} x S/. {item.finalPrice.toFixed(2)}
										</p>
									</div>
									<p className="text-sm font-bold text-slate-800">
										S/. {(item.quantity * item.finalPrice).toFixed(2)}
									</p>
								</div>
							))}
						</div>

						<Separator />

						{/* Totales */}
						<div className="flex flex-col gap-1">
							{receipt.totalIGV > 0 && (
								<div className="flex justify-between text-sm">
									<span className="text-slate-500">IGV</span>
									<span className="text-slate-800">
										S/. {receipt.totalIGV.toFixed(2)}
									</span>
								</div>
							)}
							<div className="flex justify-between text-base font-bold">
								<span className="text-slate-700">Total</span>
								<span className="text-slate-800">
									S/. {receipt.totalPrice.toFixed(2)}
								</span>
							</div>
							{receipt.paymentMethod === "cash" && (
								<>
									<div className="flex justify-between text-sm">
										<span className="text-slate-500">Recibido</span>
										<span>S/. {receipt.cashReceived.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-slate-500">Cambio</span>
										<span>S/. {receipt.change.toFixed(2)}</span>
									</div>
								</>
							)}
						</div>

						{/* Hash SUNAT */}
						{receipt.hash && (
							<div className="bg-slate-50 rounded-lg p-2">
								<p className="text-xs text-slate-400 break-all font-mono">
									{receipt.hash}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
