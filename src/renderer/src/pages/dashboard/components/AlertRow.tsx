import { Badge } from "@renderer/components/ui/badge"

export function AlertRow({
	label,
	value,
	onClick,
	urgent = false
}: {
	label: string
	value: string | number
	onClick?: () => void
	urgent?: boolean
}): React.ReactElement {
	return (
		<button
			onClick={onClick}
			className="w-full flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 transition-colors"
		>
			<p className="text-sm text-slate-700">{label}</p>
			<Badge
				variant="outline"
				className={
					urgent
						? "bg-red-50 text-red-600 border-red-200"
						: "bg-yellow-50 text-yellow-700 border-yellow-200"
				}
			>
				{value}
			</Badge>
		</button>
	)
}
