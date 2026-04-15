import { useState } from "react"
import { Separator } from "@renderer/components/ui/separator"
import { useCartStore } from "@renderer/store/cartStore"
import { useTill } from "@renderer/hooks/useTill"
import { useAuth } from "@renderer/hooks/useAuth"
import { CreateSaleDTO, SaleService } from "@renderer/services/saleService"
import { CashRegisterGate } from "./components/TillGate"
import { ProductSearch } from "./components/ProductSearch"
import { Cart } from "./components/Cart"
import { PaymentPanel } from "./components/PaymentPanel"
import { Product, Lot, UserUtils } from "@renderer/types"
import { useSettingsStore } from "@renderer/store/settingsStore"
import { ReceiptSunatService } from "@renderer/services/sunatService"

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
						clientName: client ? UserUtils.getFullname(client) : null,
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
								: (client.document?.ce ?? client.document?.dni),
						clientAddress: client?.address ?? null,
						saleId,
						paymentMethod,
						change: data.change,
						items: items,
						totalPrice: data.totalPrice
					})
				: {}
			await SaleService.initPrinterDrawer(receipt, openDrawer, emitReceipt)

			clear()
		} catch (error) {
			console.error("Error al procesar venta:", error)
		} finally {
			setIsProcessing(false)
		}
	}

	return (
		<div className="flex h-full overflow-hidden">
			{/* Panel izquierdo — búsqueda */}
			<div className="flex-1 flex flex-col p-4 min-w-0">
				<ProductSearch onSelect={handleSelectProduct} />
			</div>

			<Separator orientation="vertical" />

			{/* Panel central — carrito */}
			<div className="w-72 shrink-0 flex flex-col border-r border-slate-200">
				<Cart />
			</div>

			{/* Panel derecho — pago */}
			<div className="w-72 shrink-0 flex flex-col overflow-y-auto">
				<PaymentPanel onConfirm={handleConfirmSale} isProcessing={isProcessing} />
			</div>
		</div>
	)
}
