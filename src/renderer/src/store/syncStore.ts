import { create } from "zustand"

type SyncStatus = "synced" | "syncing" | "pending" | "error"

interface SyncStoreState {
	status: SyncStatus
	pendingCount: number
	lastSyncedAt: Date | null
	setSyncing: () => void
	setSynced: () => void
	setPending: (count: number) => void
	setError: () => void
}

export const useSyncStore = create<SyncStoreState>()((set) => ({
	status: "synced",
	pendingCount: 0,
	lastSyncedAt: null,

	setSyncing: () => set({ status: "syncing" }),
	setSynced: () => set({ status: "synced", pendingCount: 0, lastSyncedAt: new Date() }),
	setPending: (count) => set({ status: "pending", pendingCount: count }),
	setError: () => set({ status: "error" })
}))
