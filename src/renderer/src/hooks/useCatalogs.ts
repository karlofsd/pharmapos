import { useState, useEffect } from "react"
import { Catalogs } from "@renderer/types"
import { SettingsService } from "@renderer/services/settingsService"

interface UseCatalogsReturn {
	catalogs: Catalogs
	isLoading: boolean
	addLab: (lab: string) => Promise<void>
	addCategory: (category: string) => Promise<void>
}

export function useCatalogs(): UseCatalogsReturn {
	const [catalogs, setCatalogs] = useState<Catalogs>({ labs: [], units: [], categories: [] })
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		SettingsService.getCatalogs()
			.then(setCatalogs)
			.finally(() => setIsLoading(false))
	}, [])

	async function addLab(lab: string): Promise<void> {
		await SettingsService.addLab(lab)
		setCatalogs((prev) => ({
			...prev,
			labs: Array.from(new Set([...prev.labs, lab])).sort()
		}))
	}

	async function addCategory(category: string): Promise<void> {
		await SettingsService.addCategory(category)
		setCatalogs((prev) => ({
			...prev,
			categories: Array.from(new Set([...prev.categories, category])).sort()
		}))
	}

	return { catalogs, isLoading, addLab, addCategory }
}
