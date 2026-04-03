export function StatCard({
	label,
	value,
	sub,
	icon: Icon,
	color = "text-slate-800"
}: {
	label: string
	value: string
	sub?: string
	icon: React.ElementType
	color?: string
}): React.ReactElement {
	return (
		<div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<p className="text-sm text-slate-500">{label}</p>
				<Icon size={16} className="text-slate-400" />
			</div>
			<p className={`text-2xl font-bold ${color}`}>{value}</p>
			{sub && <p className="text-xs text-slate-400">{sub}</p>}
		</div>
	)
}
