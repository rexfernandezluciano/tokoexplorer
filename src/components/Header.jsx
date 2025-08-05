/** @format */

export default function Header({ children, type = "h1", className, ...params }) {
	switch (type) {
		case "h1":
			return (
				<h1
					className={`h1 ${className}`}
					{...params}
				>
					{children}
				</h1>
			);
		case "h2":
			return (
				<h2
					className={`h2 ${className}`}
					{...params}
				>
					{children}
				</h2>
			);
		case "h3":
			return (
				<h3
					className={`h3 ${className}`}
					{...params}
				>
					{children}
				</h3>
			);

		case "h4":
			return (
				<h4
					className={`h4 ${className}`}
					{...params}
				>
					{children}
				</h4>
			);

		case "h5":
			return (
				<h5
					className={`h5 ${className}`}
					{...params}
				>
					{children}
				</h5>
			);
		default:
			return (
				<h1
					className={`h1 ${className}`}
					{...params}
				>
					{children}
				</h1>
			);
	}
}
