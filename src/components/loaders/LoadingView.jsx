/** @format */

import { Container, Spinner } from "react-bootstrap";

const LoadingView = () => {
	return (
		<Container>
			<div className="d-flex justify-content-center align-items-center min-vh-100">
				<section className="w-100 text-center">
					<div className="d-flex flex-column align-items-center">
						<Spinner
							animation="border"
							variant="primary"
						/>
					</div>
				</section>
			</div>
		</Container>
	);
};

export default LoadingView;
