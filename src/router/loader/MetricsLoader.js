/** @format */

import APIClient from "../../client/APIClient";

export default async function MetricsLoader() {
	const client = APIClient.getClient();

	try {
		const res = await client.get("/chain/metrics");
		const res1 = await client.get("/chain/stats/fees");

		if (res.data?.status === "ok" && res1.data?.status === "ok") {
			const metrics = res.data?.response?.metrics;
			const stats = res1.data?.response?.stats;
			return {
				metrics,
				stats,
				status: "success",
			};
		} else {
			return {
				status: "error",
				error: res.data?.response?.error,
			};
		}
	} catch (e) {
		console.error(`Metrics failed to load:`, e);
		return {
			status: "error",
			error: "Invalid request: " + e.message,
		};
	}
}
