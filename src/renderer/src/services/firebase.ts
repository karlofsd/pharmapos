import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { initializeFirestore, persistentLocalCache, Firestore } from "firebase/firestore"
import { getAuth, Auth } from "firebase/auth"
import { FirebaseConfig } from "@renderer/store/firebaseStore"

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

export function initializeFirebase(config: FirebaseConfig): void {
	if (getApps().length > 0) return // ya inicializado

	app = initializeApp(config)
	auth = getAuth(app)
	db = initializeFirestore(app, {
		localCache: persistentLocalCache({
			cacheSizeBytes: 100 * 1024 * 1024
		})
	})
}

export function getDb(): Firestore {
	if (!db) throw new Error("Firebase no inicializado")
	return db
}

export function getAuthInstance(): Auth {
	if (!auth) throw new Error("Firebase no inicializado")
	return auth
}

// Compatibilidad con imports existentes
export { db, auth }
