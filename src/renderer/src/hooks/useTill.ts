/* eslint-disable react-hooks/set-state-in-effect */
import { CashMovement, TillBalance } from "@renderer/types"
import { useAuth } from "./useAuth"
import { useCallback, useEffect, useState } from "react"
import { TillService } from "@renderer/services/tillService"

interface UseTillState {
	tills: TillBalance[]
	activeTill: TillBalance | null
	movements: CashMovement[]
	selectedTill: TillBalance | null
	isLoading: boolean
	error: string | null
}

interface UseTillReturn extends UseTillState {
	load: () => Promise<void>
	selectTill: (till: TillBalance) => void
	openTill: (openingAmount: number) => Promise<void>
	addMovement: (
		type: CashMovement["type"],
		direction: "in" | "out",
		amount: number,
		reason: string
	) => Promise<void>
	closeTill: (amount: number) => Promise<number>
}

export function useTill(): UseTillReturn {
	const { user } = useAuth()
	const [state, setState] = useState<UseTillState>({
		tills: [],
		activeTill: null,
		movements: [],
		selectedTill: null,
		isLoading: true,
		error: null
	})

	const load = useCallback(async () => {
		if (!user) return
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const [tills, activeTill] = await Promise.all([
				TillService.getAll(),
				TillService.getActive(user.id)
			])
			setState((prev) => ({
				...prev,
				tills,
				activeTill,
				isLoading: false
			}))
		} catch {
			setState((prev) => ({
				...prev,
				error: "Error al cargar la caja",
				isLoading: false
			}))
		}
	}, [user])

	useEffect(() => {
		load()
	}, [load])

	async function selectTill(till: TillBalance): Promise<void> {
		const movements = await TillService.getMovements(till.id)
		setState((prev) => ({ ...prev, selectedTill: till, movements }))
	}

	async function openTill(openingAmount: number): Promise<void> {
		if (!user) return
		const till = await TillService.open(user.id, openingAmount)
		setState((prev) => ({
			...prev,
			activeTill: till,
			tills: [till, ...prev.tills]
		}))
	}

	async function addMovement(
		type: CashMovement["type"],
		direction: "in" | "out",
		amount: number,
		reason: string
	): Promise<void> {
		if (!user || !state.activeTill) return
		await TillService.addMovement({
			tillId: state.activeTill.id,
			type,
			direction,
			amount,
			reason,
			userId: user.id
		})
		await load()
		if (state.selectedTill?.id === state.activeTill.id) {
			await selectTill(state.activeTill)
		}
	}

	async function closeTill(closingAmount: number): Promise<number> {
		if (!user || !state.activeTill) return 0
		const difference = await TillService.close(state.activeTill.id, closingAmount, user.id)
		await load()
		return difference
	}

	return {
		...state,
		load,
		selectTill,
		openTill,
		addMovement,
		closeTill
	}
}
