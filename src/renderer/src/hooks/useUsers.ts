import { useState, useEffect, useCallback } from "react"
import { User } from "@renderer/types"
import { UserService, CreateUserDTO, UpdateUserDTO } from "@renderer/services/userService"

interface UseUsersState {
	users: User[]
	isLoading: boolean
	error: string | null
}

interface UseUsersReturn extends UseUsersState {
	load: () => Promise<void>
	createUser: (data: CreateUserDTO) => Promise<void>
	updateUser: (id: string, data: UpdateUserDTO) => Promise<void>
	deactivateUser: (id: string) => Promise<void>
}

export function useUsers(): UseUsersReturn {
	const [state, setState] = useState<UseUsersState>({
		users: [],
		isLoading: true,
		error: null
	})

	const load = useCallback(async () => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const users = await UserService.getAll()
			setState({ users, isLoading: false, error: null })
		} catch {
			setState((prev) => ({ ...prev, error: "Error al cargar usuarios", isLoading: false }))
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	async function createUser(data: CreateUserDTO): Promise<void> {
		const created = await UserService.create(data)
		setState((prev) => ({ ...prev, users: [...prev.users, created] }))
	}

	async function updateUser(id: string, data: UpdateUserDTO): Promise<void> {
		await UserService.update(id, data)
		setState((prev) => ({
			...prev,
			users: prev.users.map((u) => (u.id === id ? { ...u, ...data } : u))
		}))
	}

	async function deactivateUser(id: string): Promise<void> {
		await UserService.deactivate(id)
		setState((prev) => ({
			...prev,
			users: prev.users.map((u) => (u.id === id ? { ...u, isActive: false } : u))
		}))
	}

	return { ...state, load, createUser, updateUser, deactivateUser }
}
