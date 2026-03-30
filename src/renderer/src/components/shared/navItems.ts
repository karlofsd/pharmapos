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
	Pill
} from "lucide-react"
import { Role } from "@renderer/types"

export interface NavItem {
	label: string
	path: string
	icon: LucideIcon
	allowedRoles: Role[]
}

export const navItems: NavItem[] = [
	{ label: "POS", path: "/pos", icon: ShoppingCart, allowedRoles: ["admin", "cashier"] },
	{ label: "Inventario", path: "/inventory", icon: Package, allowedRoles: ["admin", "cashier"] },
	{
		label: "Movimientos",
		path: "/movements",
		icon: ArrowLeftRight,
		allowedRoles: ["admin", "cashier"]
	},
	{ label: "Ventas", path: "/sales", icon: Receipt, allowedRoles: ["admin", "cashier"] },
	{ label: "Caja", path: "/till", icon: Landmark, allowedRoles: ["admin", "cashier"] },
	{ label: "Créditos", path: "/credits", icon: CreditCard, allowedRoles: ["admin", "cashier"] },
	{ label: "Clientes", path: "/admin/clients", icon: Users, allowedRoles: ["admin"] },
	{ label: "Productos", path: "/admin/products", icon: Pill, allowedRoles: ["admin"] },
	{ label: "Proveedores", path: "/admin/suppliers", icon: Truck, allowedRoles: ["admin"] },
	{ label: "Pedidos", path: "/admin/orders", icon: ClipboardList, allowedRoles: ["admin"] },
	{ label: "Reportes", path: "/admin/reports", icon: BarChart2, allowedRoles: ["admin"] },
	{ label: "Configuración", path: "/admin/settings", icon: Settings, allowedRoles: ["admin"] }
]
