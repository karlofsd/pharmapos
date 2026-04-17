import { useState, useEffect, useCallback } from "react"
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { TillService } from "@renderer/services/tillService"
import { useAuth } from "@renderer/hooks/useAuth"
import { TillBalance, Lot, Product } from "@renderer/types"
import { notify } from "@renderer/lib/notify"

export interface DashboardData {
	// Ventas del día
	todaySales: number
	todayTransactions: number
	todayCash: number
	todayCard: number
	todayCredit: number

	// Alertas
	lowStockLots: { lot: Lot; product: Product }[]
	expiringLots: { lot: Lot; product: Product; daysLeft: number }[]
	pendingCredits: number
	pendingOrders: number

	// Caja
	activeTill: TillBalance | null
}

interface UseDashboardReturn {
	data: DashboardData | null
	isLoading: boolean
	error: string | null
	reload: () => Promise<void>
}

export function useDashboard(): UseDashboardReturn {
	const { user } = useAuth()
	const [data, setData] = useState<DashboardData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const load = useCallback(async () => {
		if (!user) return
		try {
			setIsLoading(true)
			setError(null)

			const now = new Date()
			const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

			// Ejecutar todas las queries en paralelo
			const [salesSnap, lotsSnap, productsSnap, creditsSnap, ordersSnap, activeTill] =
				await Promise.all([
					getDocs(
						query(
							collection(db!, "sales"),
							where("createdAt", ">=", Timestamp.fromDate(startOfDay)),
							where("status", "!=", "cancelled")
						)
					),
					getDocs(query(collection(db!, "lots"), where("isActive", "==", true))),
					getDocs(collection(db!, "products")),
					getDocs(query(collection(db!, "credits"), where("status", "==", "pending"))),
					getDocs(
						query(
							collection(db!, "orders"),
							where("status", "in", ["pending", "in_transit"])
						)
					),
					TillService.getActive(user.id)
				])

			// Procesar ventas del día
			let todaySales = 0
			let todayCash = 0
			let todayCard = 0
			let todayCredit = 0
			const todayTransactions = salesSnap.docs.length

			salesSnap.docs.forEach((d) => {
				const sale = d.data()
				todaySales += sale.totalPrice ?? 0
				if (sale.paymentMethod === "cash") todayCash += sale.totalPrice ?? 0
				if (sale.paymentMethod === "card") todayCard += sale.totalPrice ?? 0
				if (sale.paymentMethod === "credit") todayCredit += sale.totalPrice ?? 0
			})

			// Procesar alertas de inventario
			const productMap = new Map<string, Product>(
				productsSnap.docs
					.map(
						(d) =>
							({
								id: d.id,
								...d.data()
							}) as Product
					)
					.map((p) => [p.id, p])
			)

			const lowStockLots: DashboardData["lowStockLots"] = []
			const expiringLots: DashboardData["expiringLots"] = []

			lotsSnap.docs.forEach((d) => {
				const lot = { id: d.id, ...d.data() } as Lot
				const product = productMap.get(lot.productId)
				if (!product) return

				// Stock bajo
				if (lot.stock <= product.minStock) {
					lowStockLots.push({ lot, product })
				}

				// Por vencer
				const expDate = lot.expirationDate.toDate()
				if (expDate <= in30Days && expDate > now) {
					const daysLeft = Math.ceil(
						(expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
					)
					expiringLots.push({ lot, product, daysLeft })
				}
			})

			// Ordenar por urgencia
			lowStockLots.sort((a, b) => a.lot.stock - b.lot.stock)
			expiringLots.sort((a, b) => a.daysLeft - b.daysLeft)

			setData({
				todaySales,
				todayTransactions,
				todayCash,
				todayCard,
				todayCredit,
				lowStockLots: lowStockLots.slice(0, 10),
				expiringLots: expiringLots.slice(0, 10),
				pendingCredits: creditsSnap.docs.length,
				pendingOrders: ordersSnap.docs.length,
				activeTill
			})
		} catch (err) {
			setError("Error al cargar el dashboard")
			notify.error(err, "Error al cargar el dashboard")
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}, [user])

	useEffect(() => {
		load()
	}, [load])

	return { data, isLoading, error, reload: load }
}
