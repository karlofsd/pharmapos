import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { IPC_CHANNELS } from "../../../../shared/ipcChannels"
import { Receipt } from "shared/types/receipt.type"
import { db } from "./firebase"

export const ReceiptService = {
	async getAll(): Promise<Receipt[]> {
		const result = await getDocs(collection(db!, "receipts"))
		const receipts = result.docs.map<Receipt>(
			(doc) => ({ id: doc.id, ...doc.data() }) as Receipt
		)
		return receipts
	},

	async create(data: Receipt & { serial: string; serialNumber: number }): Promise<Receipt> {
		const ref = await addDoc(collection(db!, "receipts"), {
			...data,
			createdAt: serverTimestamp()
		})
		return { ...data, id: ref.id }
	},

	async update(id: string, data: Partial<Receipt>): Promise<void> {
		const receiptRef = doc(db!, "receipts", id)
		await updateDoc(receiptRef, data)
	},

	async print(data: Receipt): Promise<void> {
		// Envía los datos al proceso principal via IPC
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.PRINT_RECEIPT, data)
	},

	async openDrawer(): Promise<void> {
		await window.electron.ipcRenderer.invoke(IPC_CHANNELS.OPEN_DRAWER)
	}
}
