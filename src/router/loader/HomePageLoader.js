/** @format */

import APIClient from "../../client/APIClient";

const HomePageLoader = async () => {
	const client = APIClient.getClient();

	try {
		// Fetch all in parallel
		const [metricsRes, feesRes, chainRes] = await Promise.all([client.get("/chain/metrics"), client.get("/chain/stats/fees"), client.get("/chain")]);

		// Validate API responses
		if (metricsRes.data?.status !== "ok" || feesRes.data?.status !== "ok" || chainRes.data?.status !== "ok") {
			return {
				status: "error",
				error: "Invalid API response from one or more endpoints.",
			};
		}

		const metrics = metricsRes.data?.response?.metrics || {};
		const stats = feesRes.data?.response?.stats || {};
		const blocks = chainRes.data?.response?.blocks || [];

		// ✅ Get operations with block metadata
		const operations = blocks.flatMap(block =>
			(block.operations || []).map(op => ({
				type: op.type,
				transactions: op.transactions,
				blockNumber: block.number,
				blockHash: block.hash,
				blockTimestamp: block.timestamp,
			})),
		);

		// ✅ Get transaction hashes with block + operation metadata
		const transactionMetaList = blocks.flatMap(block =>
			(block.operations || []).flatMap(op =>
				(op.transactions || []).map(hash => ({
					hash,
					operationType: op.type,
					blockNumber: block.number,
					blockHash: block.hash,
					blockTimestamp: block.timestamp,
				})),
			),
		);

		// Remove duplicates
		const uniqueTransactionMeta = Object.values(
			transactionMetaList.reduce((acc, t) => {
				acc[t.hash] = t;
				return acc;
			}, {}),
		);

		// ✅ Fetch transaction details
		const transactionResponses = await Promise.all(
			uniqueTransactionMeta.map(meta =>
				client
					.get(`/transactions/${meta.hash}`)
					.then(res => ({
						...res?.data?.response?.transaction,
						operationType: meta.operationType,
						blockNumber: meta.blockNumber,
						blockHash: meta.blockHash,
						blockTimestamp: meta.blockTimestamp,
					}))
					.catch(err => {
						console.warn(`Failed to fetch transaction ${meta.hash}:`, err.message);
						return null;
					}),
			),
		);

		const transactions = transactionResponses.filter(Boolean);

		// ✅ Sort separately (newest first)
		const latestTransactions = [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

		const latestOperations = [...operations].sort((a, b) => new Date(b.blockTimestamp || 0) - new Date(a.blockTimestamp || 0));

		return {
			metrics,
			stats,
			blocks,
			transactions: latestTransactions,
			operations: latestOperations,
			status: "success",
		};
	} catch (e) {
		console.error(`Failed to load HomePage data:`, e);
		return {
			status: "error",
			error: "Invalid request: " + e.message,
		};
	}
};

export default HomePageLoader;
