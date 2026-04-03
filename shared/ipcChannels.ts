export const IPC_CHANNELS = {
	// Impresión
	PRINT_RECEIPT: "print:receipt",
	PRINT_STATUS: "print:status",

	// Caja registradora
	OPEN_DRAWER: "drawer:open",

	// Backup
	BACKUP_START: "backup:start",
	BACKUP_STATUS: "backup:status",
	BACKUP_CONFIGURE: "backup:configure",

	// API call
	QUERY_DOCUMENT: "document:query"
} as const

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS]
