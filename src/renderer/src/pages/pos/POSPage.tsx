import { useMemo, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Separator } from "@renderer/components/ui/separator"
import { Button } from "@renderer/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@renderer/components/ui/dialog"
import { useCartStore } from "@renderer/store/cartStore"
import { useTill } from "@renderer/hooks/useTill"
import { useAuth } from "@renderer/hooks/useAuth"
import { CreateSaleDTO, SaleService } from "@renderer/services/saleService"
import { CashRegisterGate } from "./components/TillGate"
import { ProductSearch } from "./components/ProductSearch"
import { Cart } from "./components/Cart"
import { PaymentPanel } from "./components/PaymentPanel"
import { Product, Lot, UserUtils, Client } from "@renderer/types"
import { useSettingsStore } from "@renderer/store/settingsStore"
import { ReceiptSunatService } from "@renderer/services/sunatService"
import { notify } from "@renderer/lib/notify"

export default function POSPage(): React.ReactElement {
	const { user } = useAuth()
	const { activeTill: till, isLoading, openTill } = useTill()
	const {
		items,
		total,
		voucherType,
		paymentMethod,
		client,
		cashReceived,
		cardAmount,
		walletAmount,
		clear
	} = useCartStore()
	const { addItem } = useCartStore()
	const { openDrawer, emitReceipt, sentSunat } = useSettingsStore()

	const [isProcessing, setIsProcessing] = useState(false)
	const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
	const [completedSale, setCompletedSale] = useState<{ total: number; change: number } | null>(
		null
	)

	const formatCurrency = useMemo(
		() => (value: number) =>
			new Intl.NumberFormat("es-PE", {
				style: "currency",
				currency: "PEN",
				minimumFractionDigits: 2
			}).format(value),
		[]
	)

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-slate-400">Cargando...</p>
			</div>
		)
	}

	if (!till) {
		return <CashRegisterGate onOpen={openTill} />
	}

	function handleSelectProduct(product: Product, lot: Lot): void {
		addItem(product, lot)
	}

	async function handleConfirmSale(): Promise<void> {
		if (!user || !till) return
		setIsProcessing(true)
		try {
			const creditAmount = paymentMethod === "credit" ? total : 0
			const mixedCash =
				paymentMethod === "mixed"
					? cashReceived
					: paymentMethod === "cash"
						? cashReceived
						: 0
			const mixedCard =
				paymentMethod === "mixed" ? cardAmount : paymentMethod === "card" ? total : 0
			const mixedWallet =
				paymentMethod === "mixed" ? walletAmount : paymentMethod === "wallet" ? total : 0

			const data = {
				cashierId: user.id,
				cashierName: UserUtils.getFullname(user),
				tillId: till.id,
				items,
				paymentMethod,
				voucherType,
				clientId: client?.id ?? null,
				totalPrice: total,
				receivedAmount: cashReceived,
				change: Math.max(0, cashReceived - total),
				cashAmount: mixedCash,
				cardAmount: mixedCard,
				walletAmount: mixedWallet,
				creditAmount
			} as CreateSaleDTO
			const saleId = await SaleService.create(data)
			const { receipt } = sentSunat
				? await ReceiptSunatService.emit({
					cashierName: data.cashierName,
					cashReceived,
					voucherType,
					clientName: client ? UserUtils.getFullname(client as Client) : null,
					clientDocumentType: !client
						? null
						: voucherType == "factura"
							? "RUC"
							: client.document?.dni
								? "DNI"
								: "CE",
					clientDocument: !client
						? null
						: voucherType == "factura"
							? client.document.ruc
							: client.document?.dni,
					clientAddress: client?.address ?? null,
					saleId,
					paymentMethod,
					change: data.change,
					items: items,
					totalPrice: data.totalPrice
				})
				: {}
			await SaleService.initPrinterDrawer(receipt, openDrawer, emitReceipt)
			setCompletedSale({ total: data.totalPrice, change: data.change })
			setReceiptDialogOpen(true)
			notify.success("Venta procesada correctamente")
			clear()
		} catch (error) {
			console.error("Error al procesar venta:", error)
			notify.error(error, "Error al procesar la venta")
		} finally {
			setIsProcessing(false)
		}
	}

	return (
		<>
			<div className="flex h-full overflow-hidden">
				{/* Panel izquierdo — búsqueda */}
				<div className="flex-1 flex flex-col p-4 min-w-0">
					<ProductSearch onSelect={handleSelectProduct} />
				</div>

				<Separator orientation="vertical" />

				{/* Panel central — carrito */}
				<div className="w-72 shrink-0 flex flex-col border-r border-border">
					<Cart />
				</div>

				{/* Panel derecho — pago */}
				<div className="w-72 shrink-0 flex flex-col overflow-y-auto">
					<PaymentPanel onConfirm={handleConfirmSale} isProcessing={isProcessing} />
				</div>
			</div>

			<Dialog
				open={receiptDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						setReceiptDialogOpen(false)
						setCompletedSale(null)
					}
				}}
			>
				<DialogContent className="max-w-sm">
					<DialogHeader className="items-center gap-4">
						<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:mx-0 dark:bg-emerald-900/40">
							<CheckCircle2 size={24} />
						</div>
						<div className="text-center sm:text-left">
							<DialogTitle>¡Venta completada!</DialogTitle>
							<DialogDescription>
								La transacción se registró correctamente. Puedes continuar con la
								siguiente venta.
							</DialogDescription>
						</div>
					</DialogHeader>

					<div className="mt-6 space-y-4">
						<div className="rounded-2xl border border-border bg-muted p-4">
							<p className="text-sm text-muted-foreground">Total</p>
							<p className="mt-2 text-3xl font-semibold text-foreground">
								{completedSale ? formatCurrency(completedSale.total) : "--"}
							</p>
						</div>
						<div className="rounded-2xl border border-border bg-card p-4">
							<p className="text-sm text-muted-foreground">Cambio</p>
							<p className="mt-2 text-2xl font-semibold text-emerald-700">
								{completedSale
									? formatCurrency(completedSale.change)
									: formatCurrency(0)}
							</p>
						</div>
					</div>

					<DialogFooter className="mt-6">
						<Button
							className="w-full"
							onClick={() => {
								setReceiptDialogOpen(false)
								setCompletedSale(null)
							}}
						>
							Continuar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
