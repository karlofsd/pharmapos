import { useState } from "react"
import { Download, Plus, Minus, Lock } from "lucide-react"
import { Button } from "@renderer/components/ui/button"
import { Badge } from "@renderer/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@renderer/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@renderer/components/ui/table"
import { useTill } from "@renderer/hooks/useTill"
import { useAuth } from "@renderer/hooks/useAuth"
import { TillBalance, CashMovementType } from "@renderer/types"
import { TillSummary } from "./components/TillSummary"
import { CashMovementForm } from "./components/CashMovementForm"
import { CloseTillForm } from "./components/CloseTillForm"
import { TillService } from "@renderer/services/tillService"

type DialogType = "deposit" | "withdrawal" | "close" | "none"

export default function TillsPage(): React.ReactElement {
	const { user } = useAuth()
	const {
		tills,
		activeTill,
		movements,
		selectedTill,
		isLoading,
		selectTill,
		addMovement,
		closeTill
	} = useTill()

	const [dialog, setDialog] = useState<DialogType>("none")
	const hasPermission = (user?.level ?? 0) >= 1

	async function handleMovement(
		type: CashMovementType,
		amount: number,
		reason: string,
		direction: "in" | "out"
	): Promise<void> {
		await addMovement(type, direction, amount, reason)
		setDialog("none")
	}

	async function handleClose(closingAmount: number): Promise<void> {
		await closeTill(closingAmount)
		setDialog("none")
	}

	async function handleExport(till: TillBalance): Promise<void> {
		const movs = await TillService.getMovements(till.id)
		await TillService.exportReport(till, movs)
	}

	return (
		<div className="flex h-full">
			{/* Lista de cajas */}
			<div className="flex flex-col flex-1 min-w-0 p-6 gap-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-bold text-slate-800">Caja</h1>
						<p className="text-sm text-slate-500">{tills.length} registros</p>
					</div>
					{activeTill && hasPermission && (
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setDialog("deposit")}
							>
								<Plus size={14} />
								Ingreso
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setDialog("withdrawal")}
							>
								<Minus size={14} />
								Retiro
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => setDialog("close")}
							>
								<Lock size={14} />
								Cerrar caja
							</Button>
						</div>
					)}
				</div>

				{/* Caja activa */}
				{activeTill && (
					<div
						className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-green-100 transition-colors"
						onClick={() => selectTill(activeTill)}
					>
						<div>
							<div className="flex items-center gap-2">
								<Badge className="bg-green-600 text-white text-xs">Activa</Badge>
								<p className="text-sm font-medium text-green-800">Turno actual</p>
							</div>
							<p className="text-xs text-green-600 mt-1">
								Abierta:{" "}
								{activeTill.openedAt.toDate().toLocaleDateString("es-PE", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit"
								})}
							</p>
						</div>
						<div className="text-right">
							<p className="text-xs text-green-600">Total ventas</p>
							<p className="text-lg font-bold text-green-800">
								S/. {activeTill.totalSales.toFixed(2)}
							</p>
						</div>
					</div>
				)}

				{/* Historial */}
				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-slate-400">Cargando...</p>
					</div>
				) : (
					<div className="flex-1 overflow-auto rounded-lg border border-slate-200">
						<Table>
							<TableHeader>
								<TableRow className="bg-slate-50">
									<TableHead>Apertura</TableHead>
									<TableHead>Cierre</TableHead>
									<TableHead className="text-right">Ventas</TableHead>
									<TableHead className="text-right">Efectivo esp.</TableHead>
									<TableHead>Estado</TableHead>
									<TableHead className="text-right">Diferencia</TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tills.filter((t) => t.id !== activeTill?.id).length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={7}
											className="text-center text-slate-400 py-12"
										>
											No hay registros de caja anteriores
										</TableCell>
									</TableRow>
								) : (
									tills
										.filter((t) => t.id !== activeTill?.id)
										.map((till) => {
											const expectedCash =
												till.openingAmount +
												till.totalCash +
												till.totalDeposits -
												till.totalWithdrawals
											const isClosed = till.closedAt !== null

											return (
												<TableRow
													key={till.id}
													className="hover:bg-slate-50 cursor-pointer"
													onClick={() => selectTill(till)}
												>
													<TableCell className="text-sm text-slate-600">
														{till.openedAt
															.toDate()
															.toLocaleDateString("es-PE")}
													</TableCell>
													<TableCell className="text-sm text-slate-600">
														{till.closedAt
															? till.closedAt
																	.toDate()
																	.toLocaleDateString("es-PE")
															: "-"}
													</TableCell>
													<TableCell className="text-right text-sm font-medium text-slate-800">
														S/. {till.totalSales.toFixed(2)}
													</TableCell>
													<TableCell className="text-right text-sm text-slate-600">
														S/. {expectedCash.toFixed(2)}
													</TableCell>
													<TableCell>
														<Badge
															variant={
																isClosed ? "secondary" : "default"
															}
														>
															{isClosed ? "Cerrada" : "Abierta"}
														</Badge>
													</TableCell>
													<TableCell className="text-right">
														{till.difference !== null ? (
															<span
																className={`text-sm font-bold
																${
																	till.difference === 0
																		? "text-green-600"
																		: till.difference > 0
																			? "text-blue-600"
																			: "text-red-600"
																}`}
															>
																{till.difference > 0 ? "+" : ""}
																S/. {till.difference.toFixed(2)}
															</span>
														) : (
															"-"
														)}
													</TableCell>
													<TableCell>
														<Button
															size="sm"
															variant="ghost"
															onClick={(e) => {
																e.stopPropagation()
																handleExport(till)
															}}
														>
															<Download size={13} />
														</Button>
													</TableCell>
												</TableRow>
											)
										})
								)}
							</TableBody>
						</Table>
					</div>
				)}
			</div>

			{/* Panel derecho — detalle */}
			{selectedTill && (
				<div className="w-96 shrink-0 border-l border-slate-200 bg-white overflow-y-auto p-4">
					<TillSummary till={selectedTill} movements={movements} />
				</div>
			)}

			{/* Dialog ingreso */}
			<Dialog open={dialog === "deposit"} onOpenChange={(open) => !open && setDialog("none")}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Registrar ingreso</DialogTitle>
					</DialogHeader>
					<CashMovementForm
						direction="in"
						onSubmit={(type, amount, reason) =>
							handleMovement(type, amount, reason, "in")
						}
						onCancel={() => setDialog("none")}
					/>
				</DialogContent>
			</Dialog>

			{/* Dialog retiro */}
			<Dialog
				open={dialog === "withdrawal"}
				onOpenChange={(open) => !open && setDialog("none")}
			>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Registrar retiro</DialogTitle>
					</DialogHeader>
					<CashMovementForm
						direction="out"
						onSubmit={(type, amount, reason) =>
							handleMovement(type, amount, reason, "out")
						}
						onCancel={() => setDialog("none")}
					/>
				</DialogContent>
			</Dialog>

			{/* Dialog cierre */}
			<Dialog open={dialog === "close"} onOpenChange={(open) => !open && setDialog("none")}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>Cerrar caja</DialogTitle>
					</DialogHeader>
					{activeTill && (
						<CloseTillForm
							till={activeTill}
							onConfirm={handleClose}
							onCancel={() => setDialog("none")}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
