/** @format */
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, Badge, Placeholder, Nav, Row, Col, Container, ListGroup } from "react-bootstrap";

import Header from "../components/Header";
import { truncate } from "../utils/formatters";

export default function HomePage() {
	const { status, metrics, stats } = useLoaderData();
	const [activeTab, setActiveTab] = useState("blocks");
	const [data, setData] = useState(null);
	const [loading] = useState(false);

	useEffect(() => {
		if (status === "success") {
			setData(metrics);
		}
	}, [data, status, metrics]);

	let p = 0;
	const placeholderData = {
		latestBlocks: Array(5).fill({
			height: 12345,
			hash: "0x4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f",
			prevHash: "0x4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f",
			operations: 3,
			timestamp: new Date().toISOString(),
		}),
		latestTransactions: Array(5).fill({
			id: "0x8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d",
			type: "transfer",
			from: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
			to: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
			amount: 42.5,
			timestamp: new Date().toISOString(),
		}),
		latestOperations: Array(5).fill({
			id: p++,
			type: "batch",
			transactions: 2,
			blockHeight: 12344,
			timestamp: new Date().toISOString(),
		}),
	};

	const dataFields = {
		blocks: [
			{ key: "height", label: "Height" },
			{ key: "prevHash", label: "Prev. Hash", truncate: { desktop: 15, mobile: 8 } },
			{ key: "operations", label: "Operations" },
			{ key: "timestamp", label: "Timestamp" },
		],
		transactions: [
			{ key: "id", label: "ID", truncate: { desktop: 15, mobile: 8 } },
			{ key: "type", label: "Type", badge: { variant: "info" } },
			{ key: "from", label: "Account", truncate: { desktop: 10, mobile: 6 } },
			{ key: "timestamp", label: "Timestamp" },
		],
		operations: [
			{ key: "id", label: "ID" },
			{ key: "blockHeight", label: "Block" },
			{ key: "type", label: "Type", badge: { variant: "primary" } },
			{ key: "transactions", label: "Transactions" },
		],
	};

	const renderDataList = (items, fields) => {
		return (
			<>
				<div className="w-100">
					<Row className="d-flex align-items-center justify-content-between mb-2">
						{fields.map(i => (
							<Col
								key={i.label}
								xs={6}
								md={3}
								className="text-truncate">
								{i.label}
							</Col>
						))}
					</Row>
					<div>
						<ListGroup
							variant="flush"
							className="w-100">
							{items.map((item, index) => (
								<ListGroup.Item
									key={index}
									className="py-3 px-0 w-100">
									<Row>
										{fields.map(field => (
											<Col
												key={field.key}
												xs={6}
												md={3}
												className="text-truncate">
												{field.badge ? (
													<Badge bg={field.badge.variant}>{item[field.key]}</Badge>
												) : field.truncate ? (
													<>
														<span className="d-none d-md-inline">{truncate(item[field.key], field.truncate.desktop)}</span>
														<span className="d-inline d-md-none">{truncate(item[field.key], field.truncate.mobile)}</span>
													</>
												) : (
													item[field.key]
												)}
											</Col>
										))}
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					</div>
				</div>
			</>
		);
	};

	return (
		<Container
			fluid
			className="px-0">
			{/* Metrics Grid */}
			{data && (
				<Card className="mb-4">
					<Card.Body>
						<div className="ms-sm-auto">
							<Header
								type="h3"
								className="text-primary mb-3">
								Mainnet Metrics
							</Header>
						</div>
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
									className="mb-3 mb-md-0">
									<div className="d-flex flex-column">
										<small className="text-muted">{metric.label}</small>
										<span className="fw-bold">{metric.value?.toLocaleString() || "N/A"}</span>
									</div>
								</Col>
							))}
						</Row>
						<div className="ms-sm-auto">
							<Header
								type="h3"
								className="text-primary mt-3 mb-3">
								Overall Fees
							</Header>
						</div>
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
									className="mb-3 mb-md-0">
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
									{renderDataList(placeholderData.latestBlocks, dataFields.blocks)}
								</>
							)}

							{activeTab === "transactions" && (
								<>
									<Header
										type="h5"
										className="mb-3">
										Recent Transactions
									</Header>
									{renderDataList(placeholderData.latestTransactions, dataFields.transactions)}
								</>
							)}

							{activeTab === "operations" && (
								<>
									<Header
										type="h5"
										className="mb-3">
										Recent Operations
									</Header>
									{renderDataList(placeholderData.latestOperations, dataFields.operations)}
								</>
							)}
						</>
					)}
				</Card.Body>
			</Card>
		</Container>
	);
}
