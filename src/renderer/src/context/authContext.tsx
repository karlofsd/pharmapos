import { auth, db } from "@renderer/services/firebase"
import { User } from "@renderer/types"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { createContext, useEffect, useState } from "react"
import { ReactNode } from "react"

interface AuthContextType {
	user: User | null
	isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setIsLoading(true)
			if (user) {
				const userRef = await getDoc(doc(db, "users", user.uid))
				if (!userRef.exists()) {
					setUser(null)
					setIsLoading(false)
					return
				}
				const userData = userRef.data() as User
				setUser(userData)
			} else {
				setUser(null)
			}
			setIsLoading(false)
		})

		return () => unsubscribe()
	}, [])

	return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
}
