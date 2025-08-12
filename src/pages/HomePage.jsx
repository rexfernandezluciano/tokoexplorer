/** @format */

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, Badge, Placeholder, Nav, Row, Col, ListGroup } from "react-bootstrap";

import Header from "../components/Header";
import { truncate } from "../utils/formatters";

const HomePage = () => {
	const { metrics, stats, blocks, transactions, operations } = useLoaderData();
	const [activeTab, setActiveTab] = useState("blocks");
	const [loading] = useState(false);

	const dataFields = {
		blocks: [
			{ key: "number", label: "Height" },
			{ key: "prevHash", label: "Prev. Hash", truncate: { desktop: 15, mobile: 8 } },
			{ key: "operations", label: "Operations" },
			{ key: "timestamp", label: "Timestamp" },
		],
		transactions: [
			{ key: "id", label: "ID", truncate: { desktop: 15, mobile: 8 } },
			{ key: "type", label: "Type", badge: { variant: "info" } },
			{ key: "from", label: "From", truncate: { desktop: 10, mobile: 6 } },
			{ key: "timestamp", label: "Timestamp" },
		],
		operations: [
			{ key: "blockNumber", label: "Block" },
			{ key: "type", label: "Type", badge: { variant: "primary" } },
			{ key: "transactions", label: "Transactions" },
		],
	};

	const renderDataList = (items, fields) => {
		if (!items?.length) {
			return <div className="text-muted">No data available</div>;
		}

		return (
			<div className="w-100">
				{/* Desktop headers */}
				<Row className="d-none d-md-flex fw-bold border-bottom pb-2 mb-2">
					{fields.map(i => (
						<Col
							key={i.label}
							md={3}
							className="text-truncate">
							{i.label}
						</Col>
					))}
				</Row>

				{/* Rows */}
				<ListGroup
					variant="flush"
					className="w-100">
					{items.map((item, index) => (
						<ListGroup.Item
							key={index}
							className="py-3 px-0 w-100">
							{/* Mobile card style */}
							<div className="d-md-none">
								<Card className="mb-2">
									<Card.Body className="p-2">
										{fields.map((field, fIndex) => {
											let value = item[field.key];
											if (Array.isArray(value)) value = value.length;

											return (
												<div
													key={fIndex}
													className="mb-2">
													<small className="text-muted">{field.label}</small>
													<div>{field.badge ? <Badge bg={field.badge.variant}>{value}</Badge> : field.truncate ? truncate(value, field.truncate.mobile) : value}</div>
												</div>
											);
										})}
									</Card.Body>
								</Card>
							</div>

							{/* Desktop row style */}
							<Row className="d-none d-md-flex">
								{fields.map(field => {
									let value = item[field.key];
									if (Array.isArray(value)) value = value.length;

									return (
										<Col
											key={field.key}
											md={3}
											className="text-truncate">
											{field.badge ? <Badge bg={field.badge.variant}>{value}</Badge> : field.truncate ? truncate(value, field.truncate.desktop) : value}
										</Col>
									);
								})}
							</Row>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
		);
	};

	return (
		<div>
			{/* Metrics Grid */}
			{metrics && (
				<Card className="mb-4">
					<Card.Body>
						<Header
							type="h3"
							className="text-primary mb-3">
							Mainnet Metrics
						</Header>
						<Row>
							{[
								{ label: "Circulating Supply", value: metrics?.circulatingSupply },
								{ label: "Total Blocks", value: metrics?.totalBlocks },
								{ label: "Total Operations", value: metrics?.totalOperations },
								{ label: "Total Transactions", value: metrics?.totalTransactions },
							].map((metric, i) => (
								<Col
									key={i}
									xs={6}
									md={3}
									className="mb-3">
									<div className="d-flex flex-column">
										<small className="text-muted">{metric.label}</small>
										<span className="fw-bold">{metric.value?.toLocaleString() || "N/A"}</span>
									</div>
								</Col>
							))}
						</Row>

						<Header
							type="h3"
							className="text-primary mt-3 mb-3">
							Overall Fees
						</Header>
						<Row>
							{[
								{ label: "Total Fees", value: stats?.totalFees },
								{ label: "High", value: stats?.highestFee },
								{ label: "Low", value: stats?.lowestFee },
								{ label: "Deflated", value: stats?.deflatedFeeCount },
							].map((stat, i) => (
								<Col
									key={i}
									xs={6}
									md={3}
									className="mb-3">
									<div className="d-flex flex-column">
										<small className="text-muted">{stat.label}</small>
										<span className="fw-bold">{stat.value?.toLocaleString() || "N/A"}</span>
									</div>
								</Col>
							))}
						</Row>
					</Card.Body>
				</Card>
			)}

			{/* Tabs Navigation */}
			<Nav
				variant="tabs"
				activeKey={activeTab}
				onSelect={setActiveTab}
				className="mb-3">
				<Nav.Item>
					<Nav.Link eventKey="blocks">Latest Blocks</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="transactions">Latest Transactions</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="operations">Latest Operations</Nav.Link>
				</Nav.Item>
			</Nav>

			{/* Tab Content */}
			<Card>
				<Card.Body>
					{loading ? (
						<Placeholder animation="glow">
							<Placeholder
								xs={12}
								size="lg"
							/>
							<Placeholder xs={12} />
							<Placeholder xs={12} />
						</Placeholder>
					) : (
						<>
							{activeTab === "blocks" && (
								<>
									<Header
										type="h5"
										className="mb-3">
										Recent Blocks
									</Header>
									{renderDataList(blocks, dataFields.blocks)}
								</>
							)}

							{activeTab === "transactions" && (
								<>
									<Header
										type="h5"
										className="mb-3">
										Recent Transactions
									</Header>
									{renderDataList(transactions, dataFields.transactions)}
								</>
							)}

							{activeTab === "operations" && (
								<>
									<Header
										type="h5"
										className="mb-3">
										Recent Operations
									</Header>
									{renderDataList(operations, dataFields.operations)}
								</>
							)}
						</>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default HomePage;
