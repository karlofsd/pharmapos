import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"
import { Separator } from "@renderer/components/ui/separator"
import { FirebaseConfig, useFirebaseStore } from "@renderer/store/firebaseStore"
import { initializeFirebase } from "@renderer/services/firebase"
import { Eye, EyeOff, Flame } from "lucide-react"
import { notify } from "@renderer/lib/notify"

const schema = z.object({
	apiKey: z.string().min(1, "Requerido"),
	authDomain: z.string().min(1, "Requerido"),
	projectId: z.string().min(1, "Requerido"),
	storageBucket: z.string().min(1, "Requerido"),
	messagingSenderId: z.string().min(1, "Requerido"),
	appId: z.string().min(1, "Requerido")
})

type FormData = z.infer<typeof schema>

export function SetupPage(): React.ReactElement {
	const { setConfig } = useFirebaseStore()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showKeys, setShowKeys] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(schema) })

	async function handleFormSubmit(data: FormData): Promise<void> {
		setIsSubmitting(true)
		setError(null)
		try {
			// Verificar que las credenciales son válidas intentando inicializar Firebase
			initializeFirebase(data as FirebaseConfig)

			// Guardar en el store persistido
			setConfig(data as FirebaseConfig)

			notify.success("Credenciales guardadas. Recargando aplicación...")
			setTimeout(() => window.location.reload(), 300)
		} catch (error) {
			notify.error(error, "Credenciales inválidas. Verifica los datos de Firebase.")
			setError("Credenciales inválidas. Verifica los datos de Firebase.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
				{/* Header */}
				<div className="bg-slate-900 px-6 py-8 text-center">
					<div className="flex justify-center mb-3">
						<div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
							<Flame size={24} className="text-white" />
						</div>
					</div>
					<h1 className="text-xl font-bold text-white">Configuración inicial</h1>
					<p className="text-slate-400 text-sm mt-1">
						Ingresa las credenciales de Firebase para tu farmacia
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
							Credenciales de Firebase
						</p>
						<button
							type="button"
							onClick={() => setShowKeys(!showKeys)}
							className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600"
						>
							{showKeys ? <EyeOff size={12} /> : <Eye size={12} />}
							{showKeys ? "Ocultar" : "Mostrar"}
						</button>
					</div>

					{[
						{ name: "apiKey", label: "API Key", placeholder: "AIzaSy..." },
						{
							name: "authDomain",
							label: "Auth Domain",
							placeholder: "tu-proyecto.firebaseapp.com"
						},
						{ name: "projectId", label: "Project ID", placeholder: "tu-proyecto" },
						{
							name: "storageBucket",
							label: "Storage Bucket",
							placeholder: "tu-proyecto.appspot.com"
						},
						{
							name: "messagingSenderId",
							label: "Messaging Sender ID",
							placeholder: "123456789"
						},
						{ name: "appId", label: "App ID", placeholder: "1:123:web:abc..." }
					].map((field) => (
						<div key={field.name} className="flex flex-col gap-1">
							<Label className="text-xs">{field.label}</Label>
							<Input
								{...register(field.name as keyof FormData)}
								type={showKeys ? "text" : "password"}
								placeholder={field.placeholder}
								className="text-xs font-mono"
							/>
							{errors[field.name as keyof FormData] && (
								<p className="text-xs text-red-500">
									{errors[field.name as keyof FormData]?.message}
								</p>
							)}
						</div>
					))}

					{error && (
						<div className="bg-red-50 rounded-lg px-3 py-2">
							<p className="text-xs text-red-600">{error}</p>
						</div>
					)}

					<Separator />

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? "Conectando..." : "Guardar y conectar"}
					</Button>

					<p className="text-xs text-slate-400 text-center">
						Encuentra estas credenciales en{" "}
						<span className="font-medium">
							Firebase Console → Configuración del proyecto
						</span>
					</p>
				</form>
			</div>
		</div>
	)
}
