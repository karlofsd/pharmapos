import { Client } from "@renderer/types"
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	QueryConstraint,
	serverTimestamp,
	startAfter,
	Timestamp,
	updateDoc
} from "firebase/firestore"
import { db } from "./firebase"
import { PaginationParams, PaginationResult, getNextCursor, hasMoreItems, trimToPageSize } from "@renderer/lib/pagination"

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

	async getPage(params: PaginationParams): Promise<PaginationResult<Client>> {
		const constraints: QueryConstraint[] = [
			orderBy("name", "asc"),
			limit(params.pageSize + 1)
		]

		if (params.cursor) {
			const decodedCursor = Buffer.from(params.cursor, "base64").toString("utf-8")
			const docRef = doc(db!, COLLECTION, decodedCursor)
			const docSnapshot = await getDoc(docRef)
			if (docSnapshot.exists()) {
				constraints.push(startAfter(docSnapshot))
			}
		}

		const q = query(collection(db!, COLLECTION), ...constraints)
		const snapshot = await getDocs(q)
		const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Client)

		const hasMore = hasMoreItems(docs.length, params.pageSize)
		const items = trimToPageSize(docs, params.pageSize)
		const nextCursor = getNextCursor(items)

		return {
			items,
			nextCursor,
			hasMore
		}
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
