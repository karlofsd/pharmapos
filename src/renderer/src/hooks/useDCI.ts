import { useState, useEffect } from "react"
import { DCI, ProductCategory } from "@renderer/types"
import { DCIService } from "@renderer/services/dciService"

export interface UseDCIReturn {
	dcis: DCI[]
	isLoading: boolean
	createDCI: (name: string, categories: ProductCategory[]) => Promise<DCI>
}

export function useDCI(): UseDCIReturn {
	const [dcis, setDcis] = useState<DCI[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		DCIService.getAll()
			.then(setDcis)
			.finally(() => setIsLoading(false))
	}, [])

	async function createDCI(name: string, categories: ProductCategory[]): Promise<DCI> {
		const created = await DCIService.create({ name, categories })
		setDcis((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
		return created
	}

	return { dcis, isLoading, createDCI }
}
