import { Button } from "@renderer/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@renderer/components/ui/card"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@renderer/services/firebase"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

const loginSchema = z.object({
	email: z.email({ message: "Invalid email address" }),
	password: z.string({ message: "Password must be between 6 and 100 characters" }).min(6).max(100)
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = (): React.ReactElement => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(loginSchema) })
	const { state } = useLocation()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)
	const handleLogin = async ({ email, password }: LoginFormData): Promise<void> => {
		setIsLoading(true)
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password)
			console.log("Logged in user:", user)
			reset()
			if (state?.from) {
				navigate(state.from)
			} else {
				navigate("/")
			}
		} catch (error) {
			console.error("Login error:", error)
			setAuthError("Invalid email or password")
			reset({ password: "" })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader className="text-center">
					<div className="text-4xl mb-2">💊</div>
					<CardTitle className="text-2xl">Farmacia POS</CardTitle>
					<CardDescription>Ingresa tus credenciales para continuar</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(handleLogin)}>
						<div className="mb-4">
							<Label htmlFor="email">Email</Label>
							<Input {...register("email")} type="email" id="email" disabled={isLoading} onChange={() => authError && setAuthError(null)} />
							{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
						</div>
						<div className="mb-6">
							<Label htmlFor="password">Password</Label>
							<Input {...register("password")} type="password" id="password" placeholder="••••••••" disabled={isLoading} onChange={() => authError && setAuthError(null)} />
							{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
						</div>
						{authError && <p className="mb-4 text-sm text-red-500">{authError}</p>}
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default LoginPage
