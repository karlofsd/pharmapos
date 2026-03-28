import { Button } from "@renderer/components/ui/button"
import { auth } from "@renderer/services/firebase"

const DashboardPage = (): React.ReactElement => {
	return (
		<>
			<div>DashboardPage</div>
			<Button variant="outline" onClick={() => auth.signOut()}>
				Logout
			</Button>
		</>
	)
}

export default DashboardPage
