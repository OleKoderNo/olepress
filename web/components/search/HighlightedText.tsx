// Highlighted text component
// Highlights matching search text inside a string

type HighlightedTextProps = {
	text: string;
	query: string;
};

export function HighlightedText({ text, query }: HighlightedTextProps) {
	if (!query.trim()) {
		return <>{text}</>;
	}

	const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(`(${escapedQuery})`, "gi");
	const parts = text.split(regex);

	return (
		<>
			{parts.map((part, index) =>
				part.toLowerCase() === query.toLowerCase() ? (
					<mark key={`${part}-${index}`} className="rounded-sm text-black">
						{part}
					</mark>
				) : (
					<span key={`${part}-${index}`}>{part}</span>
				),
			)}
		</>
	);
}
