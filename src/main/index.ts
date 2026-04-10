import { app, shell, BrowserWindow, ipcMain } from "electron"
import { join } from "path"
import { electronApp, optimizer, is } from "@electron-toolkit/utils"
import icon from "../../resources/icon.png?asset"
import { registerPrinterHandlers } from "./services/printer"
import { registerDocumentHandlers } from "./services/document.service"
import { registerUpdaterHandlers } from "./services/updater"
import { exec } from "child_process"

function createWindow(): BrowserWindow {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		fullscreen: true,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, "../preload/index.js"),
			sandbox: false
		}
	})

	mainWindow.on("ready-to-show", () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: "deny" }
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
	}

	ipcMain.handle("window:kiosk", (_event, enabled: boolean) => {
		const win = BrowserWindow.getAllWindows()[0]
		if (!win) return
		win.setKiosk(enabled)
	})

	ipcMain.handle("system:shutdown", async () => {
		try {
			const command =
				process.platform === "win32"
					? "shutdown /s /t 0"
					: process.platform === "darwin"
						? "sudo shutdown -h now"
						: "shutdown -h now"

			exec(command, (error) => {
				if (error) {
					return { success: false, error: "Sin permisos para apagar el equipo" }
				}
			})
			return { success: true }
		} catch (error) {
			return { success: false, error: String(error) }
		}
	})

	ipcMain.handle("system:close", () => {
		app.quit()
	})

	return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId("com.electron")

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// IPC test
	ipcMain.on("ping", () => console.log("pong"))

	const mainWindow = createWindow()
	// createWindow()

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})

	registerPrinterHandlers()
	registerDocumentHandlers()
	registerUpdaterHandlers(mainWindow)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
