import { Button } from "@renderer/components/ui/button"
import { useNavigate } from "react-router-dom"

const Unauthorized = (): React.ReactElement => {
	const navigate = useNavigate()

	return (
		<div>
			<h1 className="text-3xl font-bold">Unauthorized</h1>
			<p className="mt-4 text-lg">You do not have permission to access this page.</p>
			<Button className="mt-6" onClick={() => navigate(-1)}>
				Go Back
			</Button>
		</div>
	)
}

export default Unauthorized
