/** @format */
import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Alert, Card } from "react-bootstrap";
import { HouseDoor, ExclamationTriangle, ArrowCounterclockwise, QuestionCircle } from "react-bootstrap-icons";

import Layout from "../components/Layout";
import Header from "../components/Header";
import Navigation from "../components/navs/Navigation";
import Paragraph from "../components/Paragraph";

const ErrorPage = () => {
	const navigate = useNavigate();
	const error = useRouteError();
	const isDev = process.env.NODE_ENV === "development";

	const getErrorDetails = () => {
		if (error?.status === 404) {
			return {
				title: "Page Not Found",
				message: "The page you're looking for doesn't exist or has been moved.",
				icon: (
					<QuestionCircle
						size={48}
						className="text-danger mb-3"
					/>
				),
			};
		}

		return {
			title: "Something Went Wrong",
			message: "An unexpected error occurred while loading this page.",
			icon: (
				<ExclamationTriangle
					size={48}
					className="text-danger mb-3"
				/>
			),
		};
	};

	const { title, message, icon } = getErrorDetails();

	return (
		<>
			<Navigation />
			<Layout className="text-center px-4 py-5">
				<div className="mb-4">
					{icon}
					<Header
						type="h1"
						className="text-danger mb-3">
						{title}
					</Header>
					<Paragraph className="lead text-muted mb-4">{message}</Paragraph>
				</div>

				<Card
					className="border-0 shadow-sm mb-4 mx-auto"
					style={{ maxWidth: "500px" }}>
					<Card.Body className="text-start">
						<Header
							type="h5"
							className="text-secondary mb-3">
							Possible Solutions:
						</Header>
						<ul className="list-unstyled mb-0">
							<li className="mb-2 d-flex align-items-start">
								<span className="badge bg-light text-primary me-2 mt-1">1</span>
								<span>Check the URL for typos</span>
							</li>
							<li className="mb-2 d-flex align-items-start">
								<span className="badge bg-light text-primary me-2 mt-1">2</span>
								<span>Refresh the page</span>
							</li>
							<li className="d-flex align-items-start">
								<span className="badge bg-light text-primary me-2 mt-1">3</span>
								<span>Return to the homepage</span>
							</li>
						</ul>
					</Card.Body>
				</Card>

				<div className="d-flex justify-content-center gap-3">
					<Button
						variant="outline-primary"
						onClick={() => window.location.reload()}
						className="d-flex align-items-center gap-2">
						<ArrowCounterclockwise color="#007ead" />
						Refresh Page
					</Button>
					<Button
						variant="primary"
						onClick={() => navigate("/")}
						className="d-flex align-items-center gap-2">
						<HouseDoor color="#ffffff" />
						Go Home
					</Button>
				</div>

				{isDev && error && (
					<Alert
						variant="danger"
						className="mt-4 text-start">
						<Alert.Heading>Error Details (Development Only)</Alert.Heading>
						<pre className="mb-0 small overflow-auto">{JSON.stringify(error, null, 2)}</pre>
					</Alert>
				)}
			</Layout>
		</>
	);
}

export default ErrorPage;
