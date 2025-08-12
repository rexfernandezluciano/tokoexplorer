/** @format */

import React from "react";
import ReactDOM from "react-dom/client";

import "./contents/css/toko.css";
import "./config/firebase.js";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import AppRouter from "./router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>,
);
