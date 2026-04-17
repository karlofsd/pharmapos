import { useState, useEffect } from "react"
import { IPC_CHANNELS } from "../../../../shared/ipcChannels"

export type UpdateStatus =
	| { type: "idle" }
	| { type: "checking" }
	| { type: "available"; version: string }
	| { type: "not-available" }
	| { type: "downloading"; percent: number }
	| { type: "downloaded"; version: string }
	| { type: "error"; message: string }

type UseUpdaterReturn = {
	status: UpdateStatus
	checkForUpdates: () => Promise<void>
	downloadUpdate: () => Promise<void>
	installUpdate: () => Promise<void>
}

export function useUpdater(): UseUpdaterReturn {
	const [status, setStatus] = useState<UpdateStatus>({ type: "idle" })

	useEffect(() => {
		const unsubscribe = window.electron.ipcRenderer.on(
			IPC_CHANNELS.UPDATE_STATUS,
			(_event: unknown, newStatus: UpdateStatus) => {
				setStatus(newStatus)
			}
		)

		void window.electron.ipcRenderer.invoke(IPC_CHANNELS.UPDATE_CHECK).catch((error) => {
			console.error("Error iniciando la comprobación de actualizaciones:", error)
		})

		return () => unsubscribe?.()
	}, [])

	async function checkForUpdates(): Promise<void> {
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.UPDATE_CHECK)
	}

	async function downloadUpdate(): Promise<void> {
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.UPDATE_DOWNLOAD)
	}

	async function installUpdate(): Promise<void> {
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.UPDATE_INSTALL)
	}

	return { status, checkForUpdates, downloadUpdate, installUpdate }
}
