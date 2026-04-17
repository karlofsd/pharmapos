import { Button } from "@renderer/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@renderer/components/ui/card"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from "@renderer/services/firebase"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "@renderer/hooks/useAuth"
import { notify } from "@renderer/lib/notify"
import { Logo } from "@renderer/components/shared/logo"

const loginSchema = z.object({
	username: z.string().min(5, "Requerido"),
	password: z
		.string()
		.min(6, { message: "Password must be between 6 and 100 characters" })
		.max(100)
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = (): React.ReactElement => {
	const { login } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({ resolver: zodResolver(loginSchema), mode: "onSubmit" })

	const { state } = useLocation()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)

	const handleLogin = async ({ username, password }: LoginFormData): Promise<void> => {
		setIsLoading(true)
		try {
			await login(username, password)
			notify.success("Inicio de sesión correcto")
			setTimeout(() => {
				setIsLoading(false)
				if (state?.from) {
					navigate(state.from, { replace: true })
				} else {
					navigate("/dashboard", { replace: true })
				}
			}, 5000)
		} catch (error) {
			console.error("Login error:", error)
			notify.error(error, "Usuario o contraseña inválidos")
			setAuthError("Invalid email or password")
			reset({ password: "" })
			setIsLoading(false)
		}
	}

	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader className="flex flex-col items-center text-center">
					<Logo />
					<CardTitle className="text-2xl">Farmacia POS</CardTitle>
					<CardDescription>Ingresa tus credenciales para continuar</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(handleLogin)}>
						<div className="mb-4">
							<Label htmlFor="username">Usuario</Label>
							<Input
								{...register("username", {
									onChange: () => authError && setAuthError(null)
								})}
								id="username"
								disabled={isLoading}
							/>
							{errors.username && (
								<p className="text-sm text-red-500">{errors.username.message}</p>
							)}
						</div>
						<div className="mb-6">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								{...register("password", {
									onChange: () => authError && setAuthError(null)
								})}
								type="password"
								id="password"
								placeholder="••••••••"
								disabled={isLoading}
							/>
							{errors.password && (
								<p className="text-sm text-red-500">{errors.password.message}</p>
							)}
						</div>
						{authError && <p className="mb-4 text-sm text-red-500">{authError}</p>}
						<Button type="submit" disabled={isLoading} className="w-full">
							{isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default LoginPage
