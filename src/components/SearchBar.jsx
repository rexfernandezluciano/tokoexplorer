/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [isInvalid, setIsInvalid] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (!pathname.startsWith("/block/") || !pathname.startsWith("/tx/")) {
			setQuery("");
		}
	}, [pathname]);

	const onSearch = e => {
		e.preventDefault();

		const trimmedQuery = query.trim();

		if (!trimmedQuery) {
			setIsInvalid(true);
			return;
		}

		setIsInvalid(false);

		if (/^\d+$/.test(trimmedQuery)) {
			navigate(`/block/${trimmedQuery}`);
		} else {
			navigate(`/tx/${trimmedQuery}`);
		}
	};

	return (
		<Form
			onSubmit={onSearch}
			className="mb-4">
			<InputGroup hasValidation>
				<Form.Control
					type="text"
					placeholder="Search by block number or transaction hash"
					value={query}
					onChange={e => {
						setQuery(e.target.value);
						setIsInvalid(false);
					}}
					isInvalid={isInvalid}
					className="shadow-none"
					aria-label="Search blockchain"
				/>
				<Button
					variant="primary"
					type="submit"
					disabled={!query.trim()}
					aria-label="Submit search">
					Search
				</Button>
				<Form.Control.Feedback
					type="invalid"
					tooltip>
					Please enter a block number or transaction hash
				</Form.Control.Feedback>
			</InputGroup>
		</Form>
	);
};

export default SearchBar;
