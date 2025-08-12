/** @format */

import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Phone, ShieldLock, Wallet2, Globe, LightningCharge, Snow, Cpu } from "react-bootstrap-icons";

const AboutPage = () => {
	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col lg={8}>
					<h1 className="mb-4 fw-bold text-primary">About TokoChain Explorer</h1>
					<p className="text-muted mb-4">
						Welcome to the TokoChain Explorer — your gateway to exploring the TokoChain network. This explorer lets you browse blocks, transactions, and other
						blockchain data with ease.
					</p>

					<Card className="mb-4 shadow-sm">
						<Card.Body>
							<Card.Title className="h5 fw-semibold">Version</Card.Title>
							<Card.Text className="text-muted">Version: 1.0.0</Card.Text>
						</Card.Body>
					</Card>

					<Card className="mb-4 shadow-sm">
						<Card.Body>
							<Card.Title className="h5 fw-semibold">About TokoChain</Card.Title>
							<Card.Text className="text-muted">
								TokoChain is a fast, lightweight blockchain network designed specifically for mobile-first decentralized applications (dApps) with integrated
								peer-to-peer networking capabilities. Built from the ground up in Java, it focuses on ease of integration, speed, and accessibility for both developers
								and everyday users.
							</Card.Text>
							<Card.Text className="text-muted">
								Our mission is to empower developers and users with a decentralized, efficient, and secure blockchain platform that runs seamlessly across devices and
								networks. TokoChain brings decentralized technology into the hands of users with minimal friction and high performance.
							</Card.Text>
							<Card.Text className="text-muted mb-0">
								<b>Key Use Cases:</b> Secure peer-to-peer payments, decentralized identities, mobile-first infrastructure for dApp developers, payment rails and
								microtransactions for fintech, and a user-friendly crypto experience for everyday users.
							</Card.Text>
						</Card.Body>
					</Card>

					<Card className="mb-4 shadow-sm">
						<Card.Body>
							<Card.Title className="h5 fw-semibold">Key Features</Card.Title>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Phone className="me-2 text-primary" />
									Mobile-first optimization
								</ListGroup.Item>
								<ListGroup.Item>
									<ShieldLock className="me-2 text-primary" />
									Encrypted transactions (AES + PBKDF2)
								</ListGroup.Item>
								<ListGroup.Item>
									<Wallet2 className="me-2 text-primary" />
									Non-custodial wallet (TokoWallet)
								</ListGroup.Item>
								<ListGroup.Item>
									<Globe className="me-2 text-primary" />
									Decentralized peer discovery
								</ListGroup.Item>
								<ListGroup.Item>
									<LightningCharge className="me-2 text-primary" />
									Dynamic miner rewards
								</ListGroup.Item>
								<ListGroup.Item>
									<Snow className="me-2 text-primary" />
									Cold wallet support
								</ListGroup.Item>
								<ListGroup.Item>
									<Cpu className="me-2 text-primary" />
									Validator and mining node separation (upcoming)
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>

					<Card className="shadow-sm">
						<Card.Body>
							<Card.Title className="h5 fw-semibold">Disclaimer</Card.Title>
							<Card.Text className="text-muted">
								This explorer provides information based on data available on the TokoChain blockchain. While we strive for accuracy, we cannot guarantee the
								completeness or accuracy of all information. Use this explorer at your own risk.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutPage;
