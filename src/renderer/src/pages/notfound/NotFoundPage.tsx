import { Button } from "@renderer/components/ui/button"

const NotFoundPage = (): React.ReactElement => {
	return (
		<div className="flex h-screen items-center justify-center">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="text-xl text-gray-500">Page Not Found</p>
			<Button className="mt-4" onClick={() => window.history.back()}>
				Go Back
			</Button>
		</div>
	)
}

export default NotFoundPage
