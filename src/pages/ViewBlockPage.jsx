/** @format */

import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Card, Badge, Tab, Tabs, Spinner, Row, Col } from "react-bootstrap";

import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import { truncate, formatDate, formatCompact } from "../utils/formatters";

import "../contents/css/ViewBlockPage.css"; // Import custom styles

export default function ViewBlockPage() {
	const { status, block, transactions, operations } = useLoaderData();
	const { id } = useParams();

	const [activeTab, setActiveTab] = useState("transactions");
	const [isLoading, setIsLoading] = useState(true);

	const headerConfig = {
		transactions: [
			{ label: "Hash", className: "flex-grow-1" },
			{ label: "From", className: "flex-grow-1" },
			{ label: "To", className: "flex-grow-1" },
			{ label: "Amount", className: "col-2" },
			{ label: "Fee", className: "col-2 d-none d-md-block" },
			{ label: "Status", className: "col-2" },
			{ label: "Timestamp", className: "col-2 d-none d-md-block" },
		],
		operations: [
			{ label: "Transactions", className: "flex-grow-1" },
			{ label: "Type", className: "col-3 d-none d-md-block" },
		],
	};

	const renderHeader = tab => {
		const config = headerConfig[tab];
		if (!config) return null;

		return (
			<div className="list-header d-none d-md-flex bg-light p-3 rounded-top">
				{config.map((item, index) => (
					<div
						key={index}
						className={item.className}>
						{item.label}
					</div>
				))}
			</div>
		);
	};

	const renderMobileHeader = () => (
		<div className="d-md-none mb-2">
			<h6 className="text-muted px-3 py-2">{activeTab === "transactions" ? "Transactions" : "Operations"}</h6>
		</div>
	);

	const renderNoBlockFound = () => (
		<Card>
			<Card.Body>
				<Header
					type="3"
					className="text-primary">
					Block Not Found
				</Header>
				<Paragraph>{`The Block ${id} is not found.`}</Paragraph>
			</Card.Body>
		</Card>
	);

	const renderTransactionItem = tx => (
		<div
			key={tx.id}
			className="list-item p-3 border-bottom">
			<div className="d-md-none mb-2">
				<div className="text-muted small">Transaction Hash</div>
				<div className="text-monospace">{formatCompact(tx.id ?? "No hash")}</div>
			</div>

			<div className="d-flex flex-column flex-md-row">
				<div className="d-none d-md-block flex-grow-1 text-monospace">{truncate(tx.id, 16)}</div>

				<div className="flex-grow-1">
					<div className="d-md-none">
						<div className="text-muted small">From</div>
						<div className="text-monospace">{formatCompact(tx.from ?? "No sender")}</div>
					</div>
					<div className="d-none d-md-block text-monospace">{truncate(tx.from ?? "No sender", 8)}</div>
				</div>

				<div className="flex-grow-1">
					<div className="d-md-none">
						<div className="text-muted small">To</div>
						<div className="text-monospace">{formatCompact(tx.to ?? "No recipient")}</div>
					</div>
					<div className="d-none d-md-block text-monospace">{truncate(tx.to ?? "No recipient", 8)}</div>
				</div>

				<div className="col-md-2">
					<div className="d-md-none">
						<div className="text-muted small">Amount</div>
						<div>{tx.value}</div>
					</div>
					<div className="d-none d-md-block">{tx.amount}</div>
				</div>

				<div className="col-md-2 d-none d-md-block">{tx?.fee ?? 0.01}</div>

				<div className="col-md-2">
					<Badge bg={tx.status === "SUCCESS" ? "success" : tx.status === "PENDING" ? "warning" : "danger"}>{tx.status ?? "SUCESS"}</Badge>
				</div>

				<div className="col-md-2 d-none d-md-block">{formatDate(tx.timestamp)}</div>
			</div>
		</div>
	);

	const renderOperationItem = op => (
		<div
			key={op.id}
			className="list-item p-3 border-bottom">
			<div className="d-md-none mb-2">
				<div className="text-muted small">Transactions</div>
				<div className="text-monospace">{Array.isArray(op.transactions) ? op.transactions.length : 0}</div>
			</div>

			<div className="d-flex flex-column flex-md-row w-100">
				<div className="flex-grow-1 d-none d-md-block">
					<div className="text-monospace">{Array.isArray(op.transactions) ? op.transactions.length : 0}</div>
				</div>
				<div className="col-3">
					<div className="d-md-none">
						<div className="text-muted small">Type</div>
						<Badge bg={op.type === "TRANSFER" ? "success" : op.type === "CLAIM_REWARD" ? "warning" : "danger"}>{op.type ?? "TRANSFER"}</Badge>
					</div>
					<div className="d-none d-md-block">
						<Badge bg={op.type === "TRANSFER" ? "success" : op.type === "CLAIM_REWARD" ? "warning" : "danger"}>{op.type ?? "TRANSFER"}</Badge>
					</div>
				</div>
			</div>
		</div>
	);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div className="pb-4 view-block-page">
			{status === "error" ? (
				renderNoBlockFound()
			) : (
				<>
					<Row className="mb-4">
						<Col
							lg={8}
							className="mb-4 mb-lg-0">
							<Card className="h-100">
								<Card.Body>
									<Header
										type="h2"
										className="text-primary mb-4">
										Block #{block?.number}
									</Header>

									<Row className="g-3">
										<Col md={6}>
											<div className="detail-item">
												<span className="text-muted">Hash</span>
												<span className="text-break text-monospace">
													<span className="d-none d-md-inline">{block?.hash}</span>
													<span className="d-md-none">{formatCompact(block?.hash)}</span>
												</span>
											</div>
										</Col>
										<Col md={6}>
											<div className="detail-item">
												<span className="text-muted">Timestamp</span>
												<span>{formatDate(block?.timestamp)}</span>
											</div>
										</Col>
										<Col md={6}>
											<div className="detail-item">
												<span className="text-muted">Miner</span>
												<span className="text-break text-monospace">
													<span className="d-none d-md-inline">{block?.miner}</span>
													<span className="d-md-none">{formatCompact(block?.miner)}</span>
												</span>
											</div>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Card>
						<Card.Body className="p-0">
							<Tabs
								activeKey={activeTab}
								onSelect={k => setActiveTab(k)}
								className="px-3 pt-2"
								id="block-details-tabs">
								<Tab
									eventKey="transactions"
									title={`Transactions (${Math.min(transactions?.length || 0, 10)})`}>
									{isLoading ? (
										<div className="text-center py-4">
											<Spinner animation="border" />
										</div>
									) : (
										<div className="list-container">
											{renderHeader("transactions")}
											{renderMobileHeader()}
											<div className="list-content">{transactions?.slice(0, 10).map(tx => renderTransactionItem(tx))}</div>
										</div>
									)}
								</Tab>
								<Tab
									eventKey="operations"
									title={`Operations (${Math.min(operations?.length || 0, 10)})`}>
									{isLoading ? (
										<div className="text-center py-4">
											<Spinner animation="border" />
										</div>
									) : (
										<div className="list-container">
											{renderHeader("operations")}
											{renderMobileHeader()}
											<div className="list-content">{operations?.slice(0, 10).map(op => renderOperationItem(op))}</div>
										</div>
									)}
								</Tab>
							</Tabs>
						</Card.Body>
					</Card>
				</>
			)}
		</div>
	);
}
