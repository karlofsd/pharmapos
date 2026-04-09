import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FirebaseConfig {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
}

interface FirebaseStoreState {
	config: FirebaseConfig | null
	isConfigured: boolean
	setConfig: (config: FirebaseConfig) => void
	clearConfig: () => void
}

export const useFirebaseStore = create<FirebaseStoreState>()(
	persist(
		(set) => ({
			config: null,
			isConfigured: false,

			setConfig: (config) => set({ config, isConfigured: true }),
			clearConfig: () => set({ config: null, isConfigured: false })
		}),
		{ name: "pharmapos-firebase" }
	)
)
