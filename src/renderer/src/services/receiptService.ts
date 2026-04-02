import { IPC_CHANNELS } from "../../../../shared/ipcChannels"
import { Receipt } from "shared/types/receipt.type"

export const ReceiptService = {
	async print(data: Receipt): Promise<void> {
		// Envía los datos al proceso principal via IPC
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.PRINT_RECEIPT, data)
	},

	async openDrawer(): Promise<void> {
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.OPEN_DRAWER)
	}
}
