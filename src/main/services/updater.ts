import { ipcMain, BrowserWindow } from "electron"
import { autoUpdater } from "electron-updater"
import { IPC_CHANNELS } from "../../../shared/ipcChannels"

export type UpdateStatus =
	| { type: "checking" }
	| { type: "available"; version: string }
	| { type: "not-available" }
	| { type: "downloading"; percent: number }
	| { type: "downloaded"; version: string }
	| { type: "error"; message: string }

export function registerUpdaterHandlers(mainWindow: BrowserWindow): void {
	// Configuración
	autoUpdater.logger = console as any
	autoUpdater.autoDownload = false
	autoUpdater.autoInstallOnAppQuit = true
	autoUpdater.allowPrerelease = false

	// Enviar estado al renderer
	function sendStatus(status: UpdateStatus): void {
		if (mainWindow.isDestroyed()) return
		mainWindow.webContents.send(IPC_CHANNELS.UPDATE_STATUS, status)
	}

	// Eventos del autoUpdater
	autoUpdater.on("checking-for-update", () => {
		sendStatus({ type: "checking" })
	})

	autoUpdater.on("update-available", (info) => {
		sendStatus({ type: "available", version: info.version })
	})

	autoUpdater.on("update-not-available", () => {
		sendStatus({ type: "not-available" })
	})

	autoUpdater.on("download-progress", (progress) => {
		sendStatus({ type: "downloading", percent: Math.round(progress.percent) })
	})

	autoUpdater.on("update-downloaded", (info) => {
		sendStatus({ type: "downloaded", version: info.version })
	})

	autoUpdater.on("error", (error) => {
		sendStatus({ type: "error", message: error.message })
	})

	// Handlers IPC
	ipcMain.handle(IPC_CHANNELS.UPDATE_CHECK, async () => {
		try {
			await autoUpdater.checkForUpdates()
			return { success: true }
		} catch (error) {
			sendStatus({ type: "error", message: String(error) })
			return { success: false, error: String(error) }
		}
	})

	ipcMain.handle(IPC_CHANNELS.UPDATE_DOWNLOAD, async () => {
		try {
			await autoUpdater.downloadUpdate()
		} catch (error) {
			sendStatus({ type: "error", message: String(error) })
		}
	})

	ipcMain.handle(IPC_CHANNELS.UPDATE_INSTALL, () => {
		autoUpdater.quitAndInstall(false, true)
	})

	// Verificar actualizaciones al iniciar (después de 3 segundos) como respaldo.
	setTimeout(() => {
		autoUpdater.checkForUpdates().catch((error) => {
			console.error("Error al verificar actualizaciones al iniciar:", error)
		})
	}, 3000)
}
