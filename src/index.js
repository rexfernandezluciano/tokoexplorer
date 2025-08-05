/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./contents/css/toko.css";
import "./config/firebase.js";
import AppRouter from "./router/AppRouter";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={AppRouter} />
	</React.StrictMode>,
);
