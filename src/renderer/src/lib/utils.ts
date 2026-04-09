import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}

export function getQRCommands(data: string): Buffer {
	const utf8Data = Buffer.from(data, "utf-8")
	const store_len = utf8Data.length + 3
	const pl = store_len % 256
	const ph = Math.floor(store_len / 256)

	return Buffer.concat([
		Buffer.from([0x1b, 0x61, 0x01]), // Centrar impresión
		Buffer.from([0x1d, 0x28, 0x6b, 0x04, 0x00, 0x30, 0x41, 0x32, 0x00]), // Model 2 (ISO 18004)
		Buffer.from([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x30, 0x43, 0x05]), // Tamaño de módulo (aprox 4-5cm en 80mm)
		Buffer.from([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x30, 0x45, 0x32]), // Nivel de Error Q (Obligatorio)
		Buffer.from([0x1d, 0x28, 0x6b, pl, ph, 0x30, 0x50, 0x30]), // Preparar almacenamiento
		utf8Data, // Datos en UTF-8
		Buffer.from([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x30, 0x51, 0x30]), // Imprimir QR
		Buffer.from([0x1b, 0x61, 0x00]) // Regresar alineación izquierda
	])
}
