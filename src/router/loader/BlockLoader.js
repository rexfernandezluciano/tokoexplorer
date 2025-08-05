/** @format */

import APIClient from "../../client/APIClient";

export default async function BlockLoader({ params }) {
  const client = APIClient.getClient();
  const id = params.id;

  try {
    const res = await client.get(`/chain/block/${id}`);

    if (res.data?.status === "ok") {
      const block = res.data?.response?.block;
      const operations = block.operations;

      // Extract transaction hashes from operations
      const transactionHashes = operations.flatMap(op =>
        op.transactions.flatMap(tx => tx) // Flatten the nested array
      );

      // Create an array of promises to fetch each transaction
      const transactionPromises = transactionHashes.map(hash =>
        client.get(`/transactions/${hash}`)
      );

      // Wait for all transaction requests to complete
      const transactions = await Promise.all(transactionPromises);

      // Process the responses and extract the transaction data
      const transactionData = transactions.map(txRes => {
        if (txRes.data?.status === "ok") {
          return txRes.data?.response?.transaction;
        } else {
          console.error(`Error fetching transaction: ${txRes.data?.response?.error}`);
          return null; // Or handle the error as needed (e.g., throw an error, return a default value)
        }
      }).filter(tx => tx !== null); // Remove any failed transaction fetches

      console.log(`Transactions: ${JSON.stringify(transactionData, null, 2)}`); // Log the transaction data

      return {
        block,
        transactions: transactionData,
        operations,
        status: "success",
      };
    } else {
      return {
        status: "error",
        error: res.data?.response?.error,
      };
    }
  } catch (e) {
    return {
      status: "error",
      error: "Invalid request: " + e.message,
    };
  }
}