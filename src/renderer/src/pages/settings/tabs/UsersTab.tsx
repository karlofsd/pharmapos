import { useState } from "react"
import { Plus, Pencil, UserX } from "lucide-react"
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
import { useUsers } from "@renderer/hooks/useUsers"
import { User, Role } from "@renderer/types"
import { UserForm } from "../components/UserForm"
import { CreateUserDTO, UpdateUserDTO } from "@renderer/services/userService"
import { UserUtils } from "@renderer/types"

const ROLE_CONFIG: Record<Role, { label: string; className: string }> = {
	admin: { label: "Admin", className: "bg-purple-100 text-purple-700 border-purple-200" },
	cashier: { label: "Cajero", className: "bg-blue-100 text-blue-700 border-blue-200" },
	supervisor: { label: "Supervisor", className: "bg-green-100 text-green-700 border-green-200" }
}

export function UsersTab(): React.ReactElement {
	const { users, isLoading, createUser, updateUser, deactivateUser } = useUsers()
	const [showForm, setShowForm] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)

	async function handleSubmit(data: CreateUserDTO | UpdateUserDTO): Promise<void> {
		if (editingUser) {
			await updateUser(editingUser.id, data as UpdateUserDTO)
		} else {
			await createUser(data as CreateUserDTO)
		}
		setShowForm(false)
		setEditingUser(null)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-semibold text-slate-700">
					{users.length} usuarios registrados
				</p>
				<Button
					size="sm"
					onClick={() => {
						setEditingUser(null)
						setShowForm(true)
					}}
				>
					<Plus size={14} />
					Nuevo usuario
				</Button>
			</div>

			{isLoading ? (
				<p className="text-slate-400 text-sm">Cargando...</p>
			) : (
				<div className="rounded-lg border border-slate-200 overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="bg-slate-50">
								<TableHead>Nombre</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Rol</TableHead>
								<TableHead>Nivel</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead className="text-right">Acciones</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user) => {
								const roleConfig = ROLE_CONFIG[user.role]
								return (
									<TableRow key={user.id}>
										<TableCell className="font-medium text-slate-800">
											{UserUtils.getFullname(user)}
										</TableCell>
										<TableCell className="text-sm text-slate-600">
											{user.email}
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className={`text-xs ${roleConfig.className}`}
											>
												{roleConfig.label}
											</Badge>
										</TableCell>
										<TableCell className="text-sm text-slate-600">
											Nivel {user.level}
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className={
													user.isActive
														? "bg-green-50 text-green-700 border-green-200"
														: "bg-slate-100 text-slate-500"
												}
											>
												{user.isActive ? "Activo" : "Inactivo"}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center justify-end gap-1">
												<Button
													size="icon"
													variant="ghost"
													className="h-7 w-7"
													onClick={() => {
														setEditingUser(user)
														setShowForm(true)
													}}
												>
													<Pencil size={13} />
												</Button>
												{user.isActive && (
													<Button
														size="icon"
														variant="ghost"
														className="h-7 w-7 text-red-400 hover:text-red-600"
														onClick={() => deactivateUser(user.id)}
													>
														<UserX size={13} />
													</Button>
												)}
											</div>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			)}

			<Dialog open={showForm} onOpenChange={(open) => !open && setShowForm(false)}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>
							{editingUser ? "Editar usuario" : "Nuevo usuario"}
						</DialogTitle>
					</DialogHeader>
					<UserForm
						user={editingUser ?? undefined}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}
