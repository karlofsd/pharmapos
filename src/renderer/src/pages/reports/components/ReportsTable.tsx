import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@renderer/components/ui/table"
import React from "react"

export interface Column<T> {
	key: keyof T | string
	label: string
	align?: "left" | "right" | "center"
	render?: (row: T) => React.ReactNode
}

interface ReportTableProps<T> {
	columns: Column<T>[]
	data: T[]
	emptyMessage?: string
}

export function ReportTable<T extends object>({
	columns,
	data,
	emptyMessage = "No hay datos"
}: ReportTableProps<T>): React.ReactElement {
	return (
		<div className="overflow-auto rounded-lg border border-slate-200">
			<Table>
				<TableHeader>
					<TableRow className="bg-slate-50">
						{columns.map((col) => (
							<TableHead
								key={String(col.key)}
								className={col.align === "right" ? "text-right" : ""}
							>
								{col.label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="text-center text-slate-400 py-12"
							>
								{emptyMessage}
							</TableCell>
						</TableRow>
					) : (
						data.map((row, i) => (
							<TableRow key={i} className="hover:bg-slate-50">
								{columns.map((col) => (
									<TableCell
										key={String(col.key)}
										className={col.align === "right" ? "text-right" : ""}
									>
										{col.render
											? col.render(row)
											: String(
													(row as Record<string, unknown>)[
														String(col.key)
													] ?? "-"
												)}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	)
}
