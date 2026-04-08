import {
	collection,
	doc,
	getDocs,
	updateDoc,
	query,
	orderBy,
	serverTimestamp
} from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "@renderer/services/firebase"
import { User, Role, PermissionLevel } from "@renderer/types"

const COLLECTION = "users"

export interface CreateUserDTO {
	name: string
	lastname: string
	email: string
	password: string
	role: Role
	level: PermissionLevel
	phoneNumber: { code: string; number: string }
	document: Record<string, string>
}

export interface UpdateUserDTO {
	name?: string
	lastname?: string
	role?: Role
	level?: PermissionLevel
	isActive?: boolean
	phoneNumber?: { code: string; number: string }
}

export const UserService = {
	async getAll(): Promise<User[]> {
		const q = query(collection(db, COLLECTION), orderBy("name", "asc"))
		const snapshot = await getDocs(q)
		return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as User)
	},

	async create(data: CreateUserDTO): Promise<User> {
		const { user: firebaseUser } = await createUserWithEmailAndPassword(
			auth,
			data.email,
			data.password
		)
		const payload = {
			name: data.name,
			lastname: data.lastname,
			email: data.email,
			role: data.role,
			level: data.level,
			phoneNumber: data.phoneNumber,
			document: data.document,
			isActive: true,
			createdAt: serverTimestamp()
		}
		const { setDoc } = await import("firebase/firestore")
		await setDoc(doc(db, COLLECTION, firebaseUser.uid), payload)
		return { id: firebaseUser.uid, ...payload } as User
	},

	async update(id: string, data: UpdateUserDTO): Promise<void> {
		await updateDoc(doc(db, COLLECTION, id), {
			...data,
			updatedAt: serverTimestamp()
		})
	},

	async deactivate(id: string): Promise<void> {
		await updateDoc(doc(db, COLLECTION, id), {
			isActive: false,
			updatedAt: serverTimestamp()
		})
	}
}
