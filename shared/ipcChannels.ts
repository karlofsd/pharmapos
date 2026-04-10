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
	QUERY_DOCUMENT: "document:query",

	UPDATE_CHECK: "update:check",
	UPDATE_DOWNLOAD: "update:download",
	UPDATE_INSTALL: "update:install",
	UPDATE_STATUS: "update:status",

	APPLY_KIOSK: "window:kiosk",

	SHUTDOWN: "system:shutdown",
	CLOSE_APP: "system:close"
} as const

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS]
