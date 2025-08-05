/** @format */

export default function Paragraph({ children, className, ...params }) {
	return (
		<p
			className={`lead ${className}`}
			{...params}
		>
			{children}
		</p>
	);
}
