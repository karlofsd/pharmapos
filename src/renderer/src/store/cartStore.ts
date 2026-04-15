import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Client, Lot, Product } from "@renderer/types"

export interface CartItem {
	lotId: string
	productId: string
	productName: string
	unitPrice: number
	alterPrice: number | null
	finalPrice: number
	quantity: number
	subtotal: number
	requiresPrescription: boolean
	modification: {
		userId: string
		reason: string
		date: Date
	} | null
}

export type VoucherType = "boleta" | "factura"
export type CartPaymentMethod = "cash" | "card" | "credit" | "wallet" | "mixed"

interface CartState {
	items: CartItem[]
	voucherType: VoucherType
	paymentMethod: CartPaymentMethod
	client: Client | null
	cashReceived: number
	cardAmount: number
	walletAmount: number

	// Computed
	subtotal: number
	total: number
	change: number

	// Actions
	addItem: (product: Product, lot: Lot) => void
	removeItem: (lotId: string) => void
	updateQuantity: (lotId: string, quantity: number) => void
	updatePrice: (lotId: string, price: number, userId: string, reason: string) => void
	setVoucherType: (type: VoucherType) => void
	setPaymentMethod: (method: CartPaymentMethod) => void
	setClient: (client: Client) => void
	clearClient: () => void
	setCashReceived: (amount: number) => void
	setCardAmount: (amount: number) => void
	setWalletAmount: (amount: number) => void
	clear: () => void
}

function computeTotals(items: CartItem[]): { subtotal: number; total: number } {
	const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
	return { subtotal, total: subtotal }
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			voucherType: "boleta",
			paymentMethod: "cash",
			client: null,
			cashReceived: 0,
			cardAmount: 0,
			walletAmount: 0,
			subtotal: 0,
			total: 0,
			change: 0,

			addItem: (product, lot) => {
				const { items } = get()
				const existing = items.find((i) => i.lotId === lot.id)

				if (existing) {
					const updated = items.map((i) =>
						i.lotId === lot.id
							? {
									...i,
									quantity: i.quantity + 1,
									subtotal: (i.quantity + 1) * i.finalPrice
								}
							: i
					)
					const totals = computeTotals(updated)
					set({ items: updated, ...totals })
				} else {
					const newItem: CartItem = {
						lotId: lot.id,
						productId: product.id,
						productName: product.brand,
						unitPrice: lot.sellPrice,
						alterPrice: null,
						finalPrice: lot.sellPrice,
						quantity: 1,
						subtotal: lot.sellPrice,
						requiresPrescription: product.requiredPrescription,
						modification: null
					}
					const updated = [...items, newItem]
					const totals = computeTotals(updated)
					set({ items: updated, ...totals })
				}
			},

			removeItem: (lotId) => {
				const updated = get().items.filter((i) => i.lotId !== lotId)
				const totals = computeTotals(updated)
				set({ items: updated, ...totals })
			},

			updateQuantity: (lotId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(lotId)
					return
				}
				const updated = get().items.map((i) =>
					i.lotId === lotId ? { ...i, quantity, subtotal: quantity * i.finalPrice } : i
				)
				const totals = computeTotals(updated)
				set({ items: updated, ...totals })
			},

			updatePrice: (lotId, price, userId, reason) => {
				const updated = get().items.map((i) =>
					i.lotId === lotId
						? {
								...i,
								alterPrice: price,
								finalPrice: price,
								subtotal: i.quantity * price,
								modification: {
									userId,
									reason,
									date: new Date()
								}
							}
						: i
				)
				const totals = computeTotals(updated)
				set({ items: updated, ...totals })
			},

			setVoucherType: (voucherType) => set({ voucherType }),

			setPaymentMethod: (paymentMethod) =>
				set({
					paymentMethod,
					cashReceived: 0,
					cardAmount: 0,
					walletAmount: 0,
					change: 0
				}),

			setClient: (client) => set({ client }),
			clearClient: () => set({ client: null }),

			setCashReceived: (cashReceived) => {
				const { total } = get()
				const change = Math.max(0, cashReceived - total)
				set({ cashReceived, change })
			},

			setCardAmount: (cardAmount) => set({ cardAmount }),
			setWalletAmount: (walletAmount) => set({ walletAmount }),

			clear: () =>
				set({
					items: [],
					voucherType: "boleta",
					paymentMethod: "cash",
					client: null,
					cashReceived: 0,
					cardAmount: 0,
					walletAmount: 0,
					subtotal: 0,
					total: 0,
					change: 0
				})
		}),
		{
			name: "pharmapos-cart"
		}
	)
)
