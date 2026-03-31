import admin from "firebase-admin"
import serviceAccount from "../service-account.json"
import { PRODUCTS } from "../src/renderer/src/core/constants"

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

const db = admin.firestore()

async function seedProducts(): Promise<void> {
	const batch = db.batch()

	PRODUCTS.forEach(
		({
			brand,
			dci,
			manufacturer,
			categories,
			minStock,
			barcode,
			altcode,
			isActive,
			dataSource,
			presentation,
			requiredPrescription
		}) => {
			const docRef = db.collection("products").doc()
			batch.set(docRef, {
				brand,
				dci,
				manufacturer,
				categories,
				minStock,
				barcode,
				altcode,
				isActive,
				dataSource,
				presentation,
				requiredPrescription,
				createdAt: admin.firestore.FieldValue.serverTimestamp()
			})
		}
	)

	await batch.commit()
	console.log("Products seeded successfully.")
}

seedProducts().catch((error) => {
	console.error("Error seeding products:", error)
	process.exit(1)
})
