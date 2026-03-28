/* eslint-disable react-refresh/only-export-components */
import { auth, db } from "@renderer/services/firebase"
import { User } from "@renderer/types"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { createContext, useEffect, useState } from "react"
import { ReactNode } from "react"

export interface AuthContextType {
	user: User | null
	isLoading: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const [{ user, isLoading }, setState] = useState<{ user: User | null; isLoading: boolean }>({
		user: null,
		isLoading: true
	})

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			const state: { user: User | null; isLoading: boolean } = { user: null, isLoading: true }
			try {
				if (authUser) {
					const userRef = await getDoc(doc(db, "users", authUser.uid))
					if (userRef.exists()) {
						state.user = { id: userRef.id, ...userRef.data() } as User
					}
				}
			} catch (error) {
				console.error("Error fetching user data:", error)
			} finally {
				state.isLoading = false
				setState(state)
			}
		})

		return () => unsubscribe()
	}, [])

	const login = async (email: string, password: string): Promise<void> => {
		await signInWithEmailAndPassword(auth, email, password)
	}

	const logout = async (): Promise<void> => {
		await auth.signOut()
		setState((prev) => ({ ...prev, user: null }))
	}

	return (
		<AuthContext.Provider value={{ user, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
