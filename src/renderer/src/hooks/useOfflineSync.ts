import { useEffect } from "react"
import { collection, query, onSnapshot, enableNetwork, disableNetwork } from "firebase/firestore"
import { db } from "@renderer/services/firebase"
import { useSyncStore } from "@renderer/store/syncStore"

const MONITORED_COLLECTIONS = ["sales", "cashMovements", "tillBalance", "credits", "orders"]

export function useOfflineSync(): void {
	const { setSyncing, setSynced, setPending, setError, setOnline } = useSyncStore()

	// Manejo de conexión/desconexión
	useEffect(() => {
		async function handleOnline(): Promise<void> {
			try {
				setOnline(true)
				setSyncing()
				await enableNetwork(db!)
				setSynced()
			} catch {
				setError()
			}
		}

		async function handleOffline(): Promise<void> {
			try {
				setOnline(false)
				await disableNetwork(db!)
				setPending(0)
			} catch {
				setError()
			}
		}

		window.addEventListener("online", handleOnline)
		window.addEventListener("offline", handleOffline)

		return () => {
			window.removeEventListener("online", handleOnline)
			window.removeEventListener("offline", handleOffline)
		}
	}, [setSyncing, setSynced, setPending, setError])

	// Monitor de documentos pendientes via hasPendingWrites
	useEffect(() => {
		const pendingByCollection = new Map<string, number>()
		const unsubscribers: (() => void)[] = []

		for (const col of MONITORED_COLLECTIONS) {
			const q = query(collection(db!, col))

			const unsub = onSnapshot(
				q,
				{ includeMetadataChanges: true },
				(snap) => {
					const pending = snap.docs.filter((d) => d.metadata.hasPendingWrites).length
					pendingByCollection.set(col, pending)

					// Recalcula el total sumando todos los valores del map
					let total = 0
					pendingByCollection.forEach((v) => (total += v))

					if (total > 0) {
						setPending(total)
					} else if (!snap.metadata.fromCache) {
						setSynced()
					}
				},
				() => setError()
			)

			unsubscribers.push(unsub)
		}

		return () => unsubscribers.forEach((unsub) => unsub())
	}, [setSynced, setPending, setError])
}
