import Link from "next/link";
import { ReactNode } from "react";

// Button component
// Reusable button that can render as either a link or a button

type ButtonProps = {
	children: ReactNode;
	href?: string;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	className?: string;
};

export function Button({
	children,
	href,
	type = "button",
	onClick,
	className = "",
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10";

	if (href) {
		return (
			<Link href={href} className={`${baseStyles} ${className}`}>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} onClick={onClick} className={`${baseStyles} ${className}`}>
			{children}
		</button>
	);
}