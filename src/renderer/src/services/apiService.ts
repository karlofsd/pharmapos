export const ApiService = {
	async post(url: string, body: Record<string, unknown>, token?: string) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json"
			},
			body: JSON.stringify(body)
		})

		if (!response.ok) {
			throw new Error(`apisunat HTTP ${response.status}`)
		}

		return response.json()
	}
}
