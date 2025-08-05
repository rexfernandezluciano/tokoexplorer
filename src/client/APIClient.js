/** @format */

import axios from "axios";

export default class APIClient {
	static getClient() {
		const instance = axios.create({
			baseURL: "https://chain.tokonetwork.online/api",
			timeout: 60000,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		return instance;
	}
}
