import {
	collection,
	doc,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	query,
	where,
	orderBy,
	serverTimestamp,
	Timestamp
} from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { Supplier } from "@renderer/types"

const COLLECTION = "suppliers"

export type CreateSupplierDTO = Omit<Supplier, "id" | "createdAt" | "updatedAt">
export type UpdateSupplierDTO = Partial<Omit<Supplier, "id" | "createdAt">>

export const SupplierService = {
	async getAll(): Promise<Supplier[]> {
		const q = query(
			collection(db!, COLLECTION),
			where("isActive", "==", true),
			orderBy("name", "asc")
		)
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Supplier)
	},

	async getById(id: string): Promise<Supplier | null> {
		const snapshot = await getDoc(doc(db!, COLLECTION, id))
		if (!snapshot.exists()) return null
		return { id: snapshot.id, ...snapshot.data() } as Supplier
	},

	async search(term: string): Promise<Supplier[]> {
		const all = await SupplierService.getAll()
		const lower = term.toLowerCase()
		return all.filter(
			(s) =>
				s.name.toLowerCase().includes(lower) ||
				s.lastname.toLowerCase().includes(lower) ||
				s.businessName?.toLowerCase()?.includes(lower) ||
				Object.values(s.document).some((v) => v.includes(term)) ||
				s.phoneNumber.number.includes(term)
		)
	},

	async create(data: CreateSupplierDTO): Promise<Supplier> {
		const payload = {
			...data,
			debtBalance: 0,
			favorBalance: 0,
			hasCredit: data.paymentCondition === "credit",
			createdAt: serverTimestamp()
		}
		const ref = await addDoc(collection(db!, COLLECTION), payload)
		return { id: ref.id, ...payload, createdAt: Timestamp.now() } as Supplier
	},

	async update(id: string, data: UpdateSupplierDTO): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), {
			...data,
			updatedAt: serverTimestamp()
		})
	},

	async deactivate(id: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), {
			isActive: false,
			updatedAt: serverTimestamp()
		})
	}
}
