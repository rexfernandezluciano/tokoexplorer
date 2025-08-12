/** @format */

import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Card, Badge, Tab, Tabs, Spinner, Row, Col } from "react-bootstrap";
import { CurrencyExchange, ListCheck, ShieldCheck, Clock, Person, ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import { truncate, formatDate, formatCompact } from "../utils/formatters";

const ITEMS_LIMIT = 10;

const ViewBlockPage = () => {
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

	useEffect(() => {
		setIsLoading(false);
	}, []);

	const renderHeader = tab => {
		const config = headerConfig[tab];
		if (!config) return null;

		return (
			<div className="list-header d-none d-md-flex bg-light p-3 rounded-top fw-semibold">
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
			<h6 className="text-muted px-3 py-2 mb-0">
				{activeTab === "transactions" ? (
					<>
						<CurrencyExchange className="me-1 text-primary" /> Transactions
					</>
				) : (
					<>
						<ListCheck className="me-1 text-primary" /> Operations
					</>
				)}
			</h6>
		</div>
	);

	const renderBadge = (value, map, icon) => {
		const bg = map[value] || "secondary";
		return (
			<Badge
				bg={bg}
				className="text-uppercase d-inline-flex align-items-center gap-1">
				{icon} {value}
			</Badge>
		);
	};

	const getStatusBgClass = status => {
		switch (status) {
			case "SUCCESS":
				return "bg-success-subtle";
			case "PENDING":
				return "bg-warning-subtle";
			case "FAILED":
				return "bg-danger-subtle";
			default:
				return "";
		}
	};

	const renderNoBlockFound = () => (
		<Card>
			<Card.Body>
				<Header
					type="h3"
					className="text-primary">
					Block Not Found
				</Header>
				<Paragraph>The Block {id} was not found.</Paragraph>
			</Card.Body>
		</Card>
	);

	const renderTransactionItem = tx => (
		<div
			key={tx.id}
			className={`list-item p-3 border-bottom ${getStatusBgClass(tx.status)}`}>
			{/* Mobile view */}
			<div className="d-md-none mb-2">
				<div className="text-muted small">Transaction Hash</div>
				<div className="text-monospace">{formatCompact(tx.id ?? "No hash")}</div>
			</div>

			{/* Desktop + shared */}
			<div className="d-flex flex-column flex-md-row align-items-md-center">
				<div className="d-none d-md-block flex-grow-1 text-monospace">{truncate(tx.id, 16)}</div>

				<div className="flex-grow-1">
					<div className="d-md-none">
						<div className="text-muted small">
							<ArrowLeft className="me-1" /> From
						</div>
						<div className="text-monospace">{formatCompact(tx.from ?? "No sender")}</div>
					</div>
					<div className="d-none d-md-block text-monospace">{truncate(tx.from ?? "No sender", 8)}</div>
				</div>

				<div className="flex-grow-1">
					<div className="d-md-none">
						<div className="text-muted small">
							<ArrowRight className="me-1" /> To
						</div>
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
					{renderBadge(
						tx.status ?? "SUCCESS",
						{
							SUCCESS: "success",
							PENDING: "warning",
							FAILED: "danger",
						},
						<ShieldCheck />,
					)}
				</div>

				<div className="col-md-2 d-none d-md-block">
					<Clock className="me-1" /> {formatDate(tx.timestamp)}
				</div>
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
				<div className="flex-grow-1 d-none d-md-block text-monospace">{Array.isArray(op.transactions) ? op.transactions.length : 0}</div>
				<div className="col-3">
					{renderBadge(
						op.type ?? "TRANSFER",
						{
							TRANSFER: "success",
							CLAIM_REWARD: "warning",
							DEFAULT: "danger",
						},
						<ListCheck />,
					)}
				</div>
			</div>
		</div>
	);

	const renderList = (items, type) => {
		if (isLoading) {
			return (
				<div className="text-center py-4">
					<Spinner animation="border" />
				</div>
			);
		}
		if (!items?.length) {
			return <div className="p-4 text-center text-muted">No {type} available.</div>;
		}
		return (
			<div className="list-container">
				{renderHeader(type)}
				{renderMobileHeader()}
				<div className="list-content">
					{items.slice(0, ITEMS_LIMIT).map(item => (type === "transactions" ? renderTransactionItem(item) : renderOperationItem(item)))}
				</div>
			</div>
		);
	};

	return (
		<div className="pb-4">
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
										<ListCheck className="me-2" /> Block #{block?.number}
									</Header>

									<Row className="g-3 w-100">
										<Col md={6}>
											<div className="detail-item gap-2">
												<span className="text-muted me-1">Hash</span>
												<span className="text-break text-monospace">
													<span className="d-none d-md-inline">{block?.hash}</span>
													<span className="d-md-none">{formatCompact(block?.hash)}</span>
												</span>
											</div>
										</Col>
										<Col md={6}>
											<div className="detail-item gap-2">
												<span className="text-muted me-1">
													<Clock className="me-1" /> Timestamp
												</span>
												<span>{formatDate(block?.timestamp)}</span>
											</div>
										</Col>
										<Col md={6}>
											<div className="detail-item gap-2">
												<span className="text-muted">
													<Person className="me-1" /> Miner
												</span>
												<span className="ms-1 text-break text-monospace">
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
									title={
										<>
											<CurrencyExchange className="me-1" /> Transactions ({Math.min(transactions?.length || 0, ITEMS_LIMIT)})
										</>
									}>
									{renderList(transactions, "transactions")}
								</Tab>
								<Tab
									eventKey="operations"
									title={
										<>
											<ListCheck className="me-1" /> Operations ({Math.min(operations?.length || 0, ITEMS_LIMIT)})
										</>
									}>
									{renderList(operations, "operations")}
								</Tab>
							</Tabs>
						</Card.Body>
					</Card>
				</>
			)}
		</div>
	);
};

export default ViewBlockPage;
