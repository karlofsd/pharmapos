import { toast } from "sonner"

function getErrorMessage(error: unknown, fallback = "Ocurrió un error"): string {
	if (typeof error === "string") return error
	if (error instanceof Error) return error.message
	return fallback
}

export const notify = {
	success: (message: string): void => {
		toast.success(message)
	},
	error: (error: unknown, fallback = "Ocurrió un error"): void => {
		toast.error(getErrorMessage(error, fallback))
	},
	info: (message: string): void => {
		toast(message)
	},
	loading: (message: string): void => {
		toast(message, { duration: 0 })
	},
	dismiss: (id?: string | number): void => {
		toast.dismiss(id)
	}
}
