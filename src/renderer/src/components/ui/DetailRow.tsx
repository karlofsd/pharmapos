interface DetailRowProps {
	label: string
	value: React.ReactNode
}

export function DetailRow({ label, value }: DetailRowProps): React.ReactElement {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
			<div className="text-sm text-slate-800">{value}</div>
		</div>
	)
}
