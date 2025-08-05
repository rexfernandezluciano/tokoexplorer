/** @format */

export default function LoadingPage() {
	return (
		<div className="container">
			<div className="d-flex justify-content-center align-items-center vh-100">
				<section className="w-100 text-center">
					<div className="d-flex flex-column align-items-center">
						<img
							src={require("../contents/images/toko.png")}
							alt="Toko Logo"
							className="logo mb-4"
						/>
						<div
							className="spinner-border text-primary mt-5"
							role="status"
						></div>
					</div>
				</section>
			</div>
		</div>
	);
}