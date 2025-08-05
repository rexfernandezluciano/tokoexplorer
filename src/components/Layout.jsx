/** @format */

import Container from "react-bootstrap/Container";

export default function Layout({ children, className, ...params }) {
	return (
		<>
			<div className={`d-flex justify-content-center ms-auto`}>
				<Container
					className={`w-100 ${className}`}
					style={{ paddingTop: "30px", paddingBottom: "20px" }}
					{...params}>
					{children}
				</Container>
			</div>
		</>
	);
}
