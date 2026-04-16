import {
	ShoppingCart,
	Package,
	ArrowLeftRight,
	Receipt,
	Landmark,
	CreditCard,
	Users,
	Truck,
	ClipboardList,
	BarChart2,
	Settings,
	LucideIcon,
	Pill,
	ChartAreaIcon,
	FileText
} from "lucide-react"
import { PermissionLevel, Role } from "@renderer/types"

export interface NavItem {
	label: string
	path: string
	icon: LucideIcon
	allowedRoles: Role[]
	allowedMinLevel: PermissionLevel
}

export const navItems: NavItem[] = [
	{
		label: "Dashboard",
		path: "/dashboard",
		icon: ChartAreaIcon,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "POS",
		path: "/pos",
		icon: ShoppingCart,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "Inventario",
		path: "/inventory",
		icon: Package,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "Movimientos",
		path: "/movements",
		icon: ArrowLeftRight,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "Ventas",
		path: "/sales",
		icon: Receipt,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "Pedidos",
		path: "/admin/orders",
		icon: ClipboardList,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	},
	{
		label: "Productos",
		path: "/admin/products",
		icon: Pill,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	},
	{
		label: "Créditos",
		path: "/credits",
		icon: CreditCard,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "Clientes",
		path: "/admin/clients",
		icon: Users,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	},
	{
		label: "Proveedores",
		path: "/admin/suppliers",
		icon: Truck,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	},
	{
		label: "Reportes",
		path: "/admin/reports",
		icon: BarChart2,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	},
	{
		label: "Documentos",
		path: "/admin/documents",
		icon: FileText,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	},
	{
		label: "Caja",
		path: "/till",
		icon: Landmark,
		allowedRoles: ["admin", "cashier"],
		allowedMinLevel: 1
	},
	{
		label: "Configuración",
		path: "/admin/settings",
		icon: Settings,
		allowedRoles: ["admin"],
		allowedMinLevel: 2
	}
]
