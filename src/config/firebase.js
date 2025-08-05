/** @format */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyDcXEMi4CtFxkLMayE3bUp_EMi7BSMulfQ",
	authDomain: "tokonetwork.online",
	projectId: "toko-network",
	storageBucket: "toko-network.firebasestorage.app",
	messagingSenderId: "1074281422093",
	appId: "1:1074281422093:web:c6f7331e671ff022266444",
	measurementId: "G-8DF56KTCHZ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
