import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute"
import LoginPage from "./pages/login/LoginPage"

function App(): React.ReactElement {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/*" element={<div>Protected Content</div>} />
			</Route>
		</Routes>
	)
}

export default App
