import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { Catalogs } from "@renderer/types"

const COLLECTION = "settings"
const CATALOGS_DOC = "catalogs"

export const SettingsService = {
	async getCatalogs(): Promise<Catalogs> {
		const snapshot = await getDoc(doc(db!, COLLECTION, CATALOGS_DOC))
		if (!snapshot.exists()) {
			const defaults: Catalogs = { labs: [], units: ["mg", "ml", "g"], categories: [] }
			await setDoc(doc(db!, COLLECTION, CATALOGS_DOC), defaults)
			return defaults
		}
		return snapshot.data() as Catalogs
	},

	async addLab(lab: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, CATALOGS_DOC), {
			labs: arrayUnion(lab)
		})
	},

	async addCategory(category: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, CATALOGS_DOC), {
			categories: arrayUnion(category)
		})
	},

	async addUnit(unit: string): Promise<void> {
		await updateDoc(doc(db!, COLLECTION, CATALOGS_DOC), {
			units: arrayUnion(unit)
		})
	}
}
