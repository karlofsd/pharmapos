import admin from "firebase-admin"
import serviceAccount from "../service-account.json"
import { DCI_DATA } from "../src/renderer/src/core/constants"

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

const db = admin.firestore()

async function seedDCI(): Promise<void> {
	const batch = db.batch()

	DCI_DATA.forEach(({ name, categories }) => {
		const docRef = db.collection("dci").doc()
		batch.set(docRef, {
			name,
			categories,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			isActive: true
		})
	})

	await batch.commit()
	console.log("DCI data seeded successfully.")
}

seedDCI().catch((error) => {
	console.error("Error seeding DCI data:", error)
	process.exit(1)
})
