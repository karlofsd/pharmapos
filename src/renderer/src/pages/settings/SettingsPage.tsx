import { Tabs, TabsContent, TabsList, TabsTrigger } from "@renderer/components/ui/tabs"
import { ThemeTab } from "./tabs/ThemeTab"
import { LanguageTab } from "./tabs/LanguageTab"
import { AccessibilityTab } from "./tabs/AccessibilityTab"
import { CatalogsTab } from "./tabs/CatalogsTab"
import { UsersTab } from "./tabs/UsersTab"
import { PermissionsTab } from "./tabs/PermissionsTab"
import { HardwareTab } from "./tabs/HardwareTab"
import { BusinessTab } from "./tabs/BusinessTab"
import { SoftwareTab } from "./tabs/SoftwareTab"

export default function SettingsPage(): React.ReactElement {
	return (
		<div className="flex flex-col p-6 gap-4">
			<div>
				<h1 className="text-xl font-bold text-slate-800">Configuración</h1>
				<p className="text-sm text-slate-500">
					Personaliza el sistema según tus necesidades
				</p>
			</div>

			<Tabs defaultValue="theme" className="flex-1 flex flex-col">
				<TabsList className="flex flex-wrap h-auto gap-1 justify-start bg-slate-100 p-1">
					<TabsTrigger value="theme">Tema</TabsTrigger>
					<TabsTrigger value="language">Idioma</TabsTrigger>
					<TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
					<TabsTrigger value="catalogs">Catálogos</TabsTrigger>
					<TabsTrigger value="users">Usuarios</TabsTrigger>
					<TabsTrigger value="permissions">Permisos</TabsTrigger>
					<TabsTrigger value="hardware">Hardware</TabsTrigger>
					<TabsTrigger value="software">Software</TabsTrigger>
					<TabsTrigger value="business">Negocio</TabsTrigger>
				</TabsList>

				<div className="flex-1 overflow-y-auto pt-6">
					<TabsContent value="theme">
						<ThemeTab />
					</TabsContent>
					<TabsContent value="language">
						<LanguageTab />
					</TabsContent>
					<TabsContent value="accessibility">
						<AccessibilityTab />
					</TabsContent>
					<TabsContent value="catalogs">
						<CatalogsTab />
					</TabsContent>
					<TabsContent value="users">
						<UsersTab />
					</TabsContent>
					<TabsContent value="permissions">
						<PermissionsTab />
					</TabsContent>
					<TabsContent value="hardware">
						<HardwareTab />
					</TabsContent>
					<TabsContent value="software">
						<SoftwareTab />
					</TabsContent>
					<TabsContent value="business">
						<BusinessTab />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	)
}
