import { db } from "@renderer/services/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"

interface BusinessState {
	ruc: string
	socialReason: string
	name: string
	address: string
	phoneNumber: string
	department: string
	province: string
	district: string
	isLoading: boolean
}

interface UseBusinessReturn extends BusinessState {
	load: () => Promise<void>
	save: (data: Partial<BusinessState>) => Promise<void>
}

export function UseBusiness(): UseBusinessReturn {
	const [state, setState] = useState<BusinessState>({
		ruc: "",
		socialReason: "",
		name: "",
		address: "",
		phoneNumber: "",
		department: "",
		province: "",
		district: "",
		isLoading: true
	})

	const load = useCallback(async (): Promise<void> => {
		const ref = doc(db!, "settings", "businessConfig")
		const snapshot = await getDoc(ref)
		if (!snapshot.exists) return
		console.log(snapshot.data())
		setState({ ...snapshot.data(), isLoading: false } as BusinessState)
	}, [])

	useEffect(() => {
		load()
	}, [load])

	async function save(data: Partial<BusinessState>): Promise<void> {
		const ref = doc(db!, "settings", "businessConfig")
		await updateDoc(ref, data)
		setState((prev) => ({ ...prev, ...data }))
	}

	return {
		...state,
		load,
		save
	}
}
