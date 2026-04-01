// Button component
// Reusable button that works as either a link or clickable button

import Link from "next/link";

type ButtonProps = {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
};

export function Button({ children, href, onClick }: ButtonProps) {

	// Shared button styling used for both link and button versions
	const styles =
		"inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition";

	// Render as link if href is provided
	if (href) {
		return (
			<Link href={href} className={styles}>
				{children}
			</Link>
		);
	}

	// Otherwise render as standard button element
	return (
		<button onClick={onClick} className={styles}>
			{children}
		</button>
	);
}