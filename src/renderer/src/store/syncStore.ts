import { create } from "zustand"

type SyncStatus = "synced" | "syncing" | "pending" | "error"

interface SyncStoreState {
	status: SyncStatus
	pendingCount: number
	lastSyncedAt: Date | null
	isOnline: boolean
	setSyncing: () => void
	setSynced: () => void
	setPending: (count: number) => void
	setError: () => void
	setOnline: (online: boolean) => void
}

export const useSyncStore = create<SyncStoreState>()((set) => ({
	status: "synced",
	pendingCount: 0,
	lastSyncedAt: null,
	isOnline: navigator.onLine,

	setSyncing: () => set({ status: "syncing" }),

	setSynced: () =>
		set({
			status: "synced",
			pendingCount: 0,
			lastSyncedAt: new Date()
		}),

	setPending: (count) =>
		set({
			status: count > 0 ? "pending" : "synced",
			pendingCount: count,
			...(count === 0 && { lastSyncedAt: new Date() })
		}),

	setError: () => set({ status: "error" }),

	setOnline: (online) => set({ isOnline: online })
}))
