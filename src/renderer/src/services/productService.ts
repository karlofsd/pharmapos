import { Product } from "@renderer/types"
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
	updateDoc,
	where
} from "firebase/firestore"
import { db } from "./firebase"

const COLLECTION = "products"

export type CreateProductDTO = Omit<Product, "id" | "createdAt" | "updatedAt">
export type UpdateProductDTO = Partial<Omit<Product, "id" | "createdAt">>

export const ProductService = {
	async getAll(): Promise<Product[]> {
		const q = query(collection(db!, COLLECTION), orderBy("brand", "asc"))
		const snapshot = await getDocs(q)
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product)
	},

	async getById(id: string): Promise<Product | null> {
		const snapshot = await getDoc(doc(db!, COLLECTION, id))
		if (!snapshot.exists()) return null
		return { id: snapshot.id, ...snapshot.data() } as Product
	},

	async getByBarcode(barcode: string): Promise<Product | null> {
		const q = query(
			collection(db!, COLLECTION),
			where("barcode", "==", barcode),
			where("isActive", "==", true)
		)
		const snapshot = await getDocs(q)
		if (snapshot.empty) return null
		const doc = snapshot.docs[0]
		return { id: doc.id, ...doc.data() } as Product
	},

	async getByAltcode(altcode: string): Promise<Product | null> {
		const q = query(
			collection(db!, COLLECTION),
			where("altcode", "array-contains", altcode),
			where("isActive", "==", true)
		)
		const snapshot = await getDocs(q)
		if (snapshot.empty) return null
		const doc = snapshot.docs[0]
		return { id: doc.id, ...doc.data() } as Product
	},

	async create(data: CreateProductDTO): Promise<Product> {
		const payload = {
			...data,
			createdAt: serverTimestamp()
		}
		const docRef = await addDoc(collection(db!, COLLECTION), payload)
		return { id: docRef.id, ...payload, createdAt: Timestamp.now() } as Product
	},

	async update(id: string, data: UpdateProductDTO): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), { ...data, updatedAt: serverTimestamp() })
	},

	async deactivate(id: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), { isActive: false, updatedAt: serverTimestamp() })
	},

	async activate(id: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), { isActive: true, updatedAt: serverTimestamp() })
	},

	async search(query: string): Promise<Product[]> {
		const normalizedQuery = query.trim().toLowerCase()
		const allProducts = await ProductService.getAll()
		return allProducts.filter(
			(product) =>
				product.brand.toLowerCase().includes(normalizedQuery) ||
				product.manufacturer.toLowerCase().includes(normalizedQuery) ||
				product.barcode.toLowerCase().includes(normalizedQuery) ||
				product.dci.some((dci) => dci.name.toLowerCase().includes(normalizedQuery))
		)
	}
}
