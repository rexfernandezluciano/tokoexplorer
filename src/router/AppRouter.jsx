/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import HomePageLoader from "../router/loader/HomePageLoader";
import ViewBlockPageLoader from "../router/loader/ViewBlockPageLoader";

const RootLayout = lazy(() => import("../RootLayout.jsx"));
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const AboutPage = lazy(() => import("../pages/AboutPage.jsx"));
const LoadingView = lazy(() => import("../components/loaders/LoadingView.jsx"));
const SplashView = lazy(() => import("../components/loaders/SplashView.jsx"));
const ErrorPage = lazy(() => import("../pages/ErrorPage.jsx"));
const ViewBlockPage = lazy(() => import("../pages/ViewBlockPage.jsx"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<LoadingView />}>
				<RootLayout />
			</Suspense>
		),
		errorElement: <ErrorPage />,
		hydrateFallbackElement: <SplashView />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoadingView />}>
						<HomePage />
					</Suspense>
				),
				loader: HomePageLoader,
			},
			{
				path: "block/:id",
				element: (
					<Suspense fallback={<LoadingView />}>
						<ViewBlockPage />
					</Suspense>
				),
				loader: ViewBlockPageLoader,
			},
			{
				path: "about",
				element: (
					<Suspense fallback={<LoadingView />}>
						<AboutPage />
					</Suspense>
				),
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
