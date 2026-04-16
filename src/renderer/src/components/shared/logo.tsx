export const Logo = ({
	size = 32,
	variant = "primary"
}: {
	size?: number
	variant?: "primary" | "secondary"
}): React.ReactElement => {
	return (
		<svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
			<rect
				x="6"
				y="6"
				width="188"
				height="188"
				rx="42"
				fill={variant == "secondary" ? "#fefefe" : "#0f1117"}
			/>

			<rect
				x="8"
				y="8"
				width="184"
				height="184"
				rx="40"
				fill="none"
				stroke="#4ade80"
				strokeWidth="1.5"
				opacity="0.18"
			/>

			<rect x="76" y="34" width="48" height="132" rx="6" fill="#4ade80" />

			<rect x="34" y="76" width="132" height="48" rx="6" fill="#4ade80" />

			<rect x="86" y="76" width="28" height="48" rx="14" fill="#fffb25" />

			<rect x="86" y="98" width="28" height="2" rx="1" fill="#4ade80" opacity="0.7" />
		</svg>
	)
}
