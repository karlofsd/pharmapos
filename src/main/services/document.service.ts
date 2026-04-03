import { ipcMain } from "electron"
import { IPC_CHANNELS } from "../../../shared/ipcChannels"

export function registerDocumentHandlers(): void {
	ipcMain.handle(
		IPC_CHANNELS.QUERY_DOCUMENT,
		async (_event, type: "dni" | "ruc", number: string, apiKey: string) => {
			try {
				const urls: Record<string, string> = {
					dni: `https://api.decolecta.com/v1/reniec/dni?numero=${number}`,
					ruc: `https://api.decolecta.com/v1/sunat/ruc?numero=${number}`
				}

				const response = await fetch(urls[type], {
					headers: {
						Authorization: `Bearer ${apiKey}`,
						"Content-Type": "application/json"
					}
				})

				console.log(response)

				if (!response.ok) {
					return { success: false, error: "Documento no encontrado" }
				}

				const data = await response.json()
				return { success: true, data }
			} catch {
				return { success: false, error: "Error al consultar el documento" }
			}
		}
	)
}
