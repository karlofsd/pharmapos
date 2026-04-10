import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TillStoreState {
	isOpen: boolean
	tillId: string | null
	openTill: (tillId: string) => void
	closeTill: () => void
}

export const useTillStore = create<TillStoreState>()(
	persist(
		(set) => ({
			isOpen: false,
			tillId: null,
			openTill: (tillId) => set({ isOpen: true, tillId }),
			closeTill: () => set({ isOpen: false, tillId: null })
		}),
		{ name: "pharmapos-till" }
	)
)
