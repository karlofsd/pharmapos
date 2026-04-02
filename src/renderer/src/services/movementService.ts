import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { Movement } from "@renderer/types"

export interface MovementsFilters {
	dateFrom?: Date
	dateTo?: Date
	type?: string
	productId?: string
}

export const MovementsService = {
	async getAll(filters: MovementsFilters = {}): Promise<Movement[]> {
		const q = query(collection(db, "movements"), orderBy("createdAt", "desc"))

		const snapshot = await getDocs(q)
		let movements = snapshot.docs.map(
			(d) =>
				({
					id: d.id,
					...d.data()
				}) as Movement
		)

		if (filters.dateFrom) {
			movements = movements.filter((m) => m.createdAt.toDate() >= filters.dateFrom!)
		}
		if (filters.dateTo) {
			const to = new Date(filters.dateTo)
			to.setHours(23, 59, 59)
			movements = movements.filter((m) => m.createdAt.toDate() <= to)
		}
		if (filters.type) {
			movements = movements.filter((m) => m.type === filters.type)
		}
		if (filters.productId) {
			movements = movements.filter((m) => m.productId === filters.productId)
		}

		return movements
	}
}
