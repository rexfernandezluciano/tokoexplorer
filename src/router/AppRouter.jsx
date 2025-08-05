/** @format */

import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import MetricsLoader from "../router/loader/MetricsLoader";
import BlockLoader from "../router/loader/BlockLoader";

const RootLayout = lazy(() => import("../RootLayout.jsx"));
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const LoadingPage = lazy(() => import("../pages/LoadingPage.jsx"));
const ErrorPage = lazy(() => import("../pages/ErrorPage.jsx"));
const ViewBlockPage = lazy(() => import("../pages/ViewBlockPage.jsx"));

const AppRouter = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<RootLayout />
			</Suspense>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
				loader: MetricsLoader,
			},
			{
				path: "block/:id",
				element: <ViewBlockPage />,
				loader: BlockLoader,
			},
		],
	},
]);

export default AppRouter;
