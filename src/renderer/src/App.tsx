import { HashRouter, Outlet, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute"
import LoginPage from "./pages/login/LoginPage"
import NotFoundPage from "./pages/notfound/NotFoundPage"
import Unauthorized from "./pages/unauthorized/Unauthorized"
import RoleRoute from "./components/shared/RoleRoute/RoleRoute"
import ReportsPage from "./pages/reports/ReportsPage"
import ProductsPage from "./pages/products/ProductsPage"
import ClientsPage from "./pages/clients/ClientsPage"
import SuppliersPage from "./pages/suppliers/SuppliersPage"
import OrdersPage from "./pages/orders/OrdersPage"
import UsersPage from "./pages/users/UsersPage"
import SettingsPage from "./pages/settings/SettingsPage"
import DashboardPage from "./pages/dashboard/DashboardPage"
import POSPage from "./pages/pos/POSPage"
import InventoryPage from "./pages/inventory/InventoryPage"
import SalesPage from "./pages/sales/SalesPage"
import CreditsPage from "./pages/credits/CreditsPage"
import TillsPage from "./pages/tills/TillsPage"
import AppLayout from "./components/shared/layouts/AppLayout"
import MovementsPage from "./pages/movements/MovementsPage"
import { SetupPage } from "./pages/setup/SetupPage"
import { useFirebaseStore } from "./store/firebaseStore"
import { AuthProvider } from "./context/authContext"
import { useOfflineSync } from "./hooks/useOfflineSync"
import DocumentsPage from "./pages/documents/DocumentsPage"

function AppContent(): React.ReactElement {
	useOfflineSync()
	return (
		<HashRouter>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route element={<RoleRoute allowedRoles={["admin", "cashier"]} />}>
							<Route path="pos" element={<POSPage />} />
							<Route path="inventory" element={<InventoryPage />} />
							<Route path="sales" element={<SalesPage />} />
							<Route path="credits" element={<CreditsPage />} />
							<Route path="movements" element={<MovementsPage />} />
							<Route path="till" element={<TillsPage />}>
								<Route path="opening" element={<TillsPage />} />
							</Route>
						</Route>
						<Route element={<RoleRoute allowedRoles={["cashier"]} />}>
							<Route path="cashier" element={<DashboardPage />} />
						</Route>
						<Route element={<RoleRoute allowedRoles={["admin"]} />}>
							<Route path="dashboard" element={<DashboardPage />} />
							<Route path="admin" element={<Outlet />}>
								<Route path="reports" element={<ReportsPage />} />
								<Route path="products" element={<ProductsPage />} />
								<Route path="clients" element={<ClientsPage />} />
								<Route path="suppliers" element={<SuppliersPage />} />
								<Route path="orders" element={<OrdersPage />} />
								<Route path="users" element={<UsersPage />} />
								<Route path="documents" element={<DocumentsPage />} />
								<Route path="settings" element={<SettingsPage />} />
							</Route>
						</Route>
					</Route>
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</AuthProvider>
		</HashRouter>
	)
}

function App(): React.ReactElement {
	const { isConfigured } = useFirebaseStore()
	console.log("Firebase is configured: ", isConfigured)
	// Si no hay credenciales configuradas, mostrar pantalla de setup
	if (!isConfigured) {
		console.log("Redirigiendo a configuracion")
		return <SetupPage />
	}

	return <AppContent />
}

export default App
