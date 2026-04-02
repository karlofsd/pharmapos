import { useState } from "react"
import { Landmark } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription
} from "@renderer/components/ui/card"

interface CashRegisterGateProps {
	onOpen: (amount: number) => Promise<void>
}

export function CashRegisterGate({ onOpen }: CashRegisterGateProps): React.ReactElement {
	const [amount, setAmount] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	async function handleOpen(): Promise<void> {
		const parsed = parseFloat(amount)
		if (isNaN(parsed) || parsed < 0) return
		setIsLoading(true)
		try {
			await onOpen(parsed)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex items-center justify-center h-full bg-slate-50">
			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-2">
						<Landmark size={32} className="text-slate-600" />
					</div>
					<CardTitle>Abrir caja</CardTitle>
					<CardDescription>
						Ingresa el monto inicial para comenzar el turno
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<Label>Monto inicial (S/.)</Label>
						<Input
							type="number"
							min={0}
							step={0.01}
							placeholder="0.00"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleOpen()}
						/>
					</div>
					<Button
						onClick={handleOpen}
						disabled={isLoading || amount === ""}
						className="w-full"
					>
						{isLoading ? "Abriendo..." : "Abrir caja"}
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
