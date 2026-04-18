import { SortOrder } from "@renderer/hooks/useReceipts"
import { TableHead } from "../ui/table"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

function SortIcon<T>({
	field,
	current,
	order
}: {
	field: T
	current: T
	order: "asc" | "desc"
}): React.ReactElement {
	if (field !== current) return <ArrowUpDown size={12} className="text-slate-300" />
	return order === "asc" ? (
		<ArrowUp size={12} className="text-slate-600" />
	) : (
		<ArrowDown size={12} className="text-slate-600" />
	)
}

export function SortableHead<T extends string>({
	field,
	className,
	sortField,
	order,
	label,
	onSort
}: {
	className?: string
	field: T
	sortField: T
	order: SortOrder
	label: string
	onSort: (field: T) => void
}): React.ReactElement {
	return (
		<TableHead
			className={`cursor-pointer select-none hover:text-slate-800 transition-colors ${className ?? ""}`}
			onClick={() => onSort(field)}
		>
			<div className="flex items-center gap-1">
				{label}
				<SortIcon field={field} current={sortField} order={order} />
			</div>
		</TableHead>
	)
}