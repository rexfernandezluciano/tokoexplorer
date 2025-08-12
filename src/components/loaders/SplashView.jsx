/** @format */

import { Container, Spinner, Image } from "react-bootstrap";

const SplashView = () => {
	return (
		<Container>
			<div className="d-flex justify-content-center align-items-center min-vh-100">
				<section className="w-100 text-center">
					<div className="d-flex flex-column align-items-center">
						<Image
							src={require("../../contents/images/toko.png")}
							alt="Toko Logo"
							className="logo mb-4"
							fluid
						/>
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

export default SplashView;
