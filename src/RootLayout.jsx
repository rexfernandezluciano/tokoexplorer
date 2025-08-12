/** @format */

import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import Navigation from "./components/navs/Navigation";
import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";

export default function RootLayout() {
	const navigation = useNavigation();

	return (
		<>
			<Navigation />
			<Layout>
				<SearchBar />
				{navigation.state === "loading" ? (
					<div className="d-flex align-items-center justify-content-center">
						<Spinner
							animation="border"
							size="lg"
							variant="primary"
						/>
					</div>
				) : (
						<Outlet />
				)}
			</Layout>
		</>
	);
}
