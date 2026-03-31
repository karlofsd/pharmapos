import admin from "firebase-admin"
import serviceAccount from "../service-account.json"
import { DCI_CATEGORIES, LABS } from "../src/renderer/src/core/constants"

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

const db = admin.firestore()

async function seedCatalogs(): Promise<void> {
	const catalogs = {
		categories: DCI_CATEGORIES,
		labs: LABS,
		units: ["mg", "ml", "g"]
	}

	await db.collection("settings").doc("catalogs").set(catalogs)
	console.log("Catalogs seeded successfully.")
}

seedCatalogs().catch((error) => {
	console.error("Error seeding catalogs:", error)
	process.exit(1)
})
