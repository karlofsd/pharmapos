import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { DCI, ProductCategory } from "@renderer/types"

const COLLECTION = "dci"

export type CreateDCIDTO = {
	name: string
	categories: ProductCategory[]
}

export const DCIService = {
	async getAll(): Promise<DCI[]> {
		const q = query(collection(db!, COLLECTION), orderBy("name", "asc"))
		const snapshot = await getDocs(q)
		console.log(
			"Fetched DCI data:",
			snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
		)
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as DCI)
	},

	async create(data: CreateDCIDTO): Promise<DCI> {
		const payload = { ...data, createdAt: serverTimestamp() }
		const ref = await addDoc(collection(db!, COLLECTION), payload)
		return { id: ref.id, ...data }
	}
}
