import { Client } from "@renderer/types"
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
	updateDoc
} from "firebase/firestore"
import { db } from "./firebase"

const COLLECTION = "clients"

export type CreateClientDTO = Omit<
	Client,
	"id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
>
export type UpdateClientDTO = Partial<Omit<Client, "id" | "createdAt" | "createdBy">>

export const ClientService = {
	async getAll(): Promise<Client[]> {
		const q = query(collection(db!, COLLECTION), orderBy("name", "asc"))
		const snapshot = await getDocs(q)
		console.log("Clients: ", snapshot.docs)
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Client)
	},

	async getById(id: string): Promise<Client | null> {
		const snapshot = await getDoc(doc(db!, COLLECTION, id))
		if (!snapshot.exists()) return null
		return { id: snapshot.id, ...snapshot.data() } as Client
	},

	async create(data: CreateClientDTO, userId: string): Promise<Client> {
		const payload = {
			...data,
			createdAt: serverTimestamp()
		}
		const docRef = await addDoc(collection(db!, COLLECTION), payload)
		return {
			id: docRef.id,
			...payload,
			createdAt: Timestamp.now(),
			createdBy: userId
		} as Client
	},

	async update(id: string, data: UpdateClientDTO, userId: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), {
			...data,
			updatedAt: serverTimestamp(),
			updatedBy: userId
		})
	},

	async deactivate(id: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), { isActive: false, updatedAt: serverTimestamp() })
	},

	async activate(id: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, id), { isActive: true, updatedAt: serverTimestamp() })
	},

	async search(query: string): Promise<Client[]> {
		const normalizedQuery = query.trim().toLowerCase()
		const allClients = await ClientService.getAll()
		return allClients.filter(
			(client) =>
				client.name.toLowerCase().includes(normalizedQuery) ||
				Object.values(client.document).some((doc) => doc.includes(normalizedQuery))
		)
	}
}
