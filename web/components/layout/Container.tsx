import { ReactNode } from "react";

// Container component
// Keeps content centered and limits maximum width across pages

type ContainerProps = {
	children: ReactNode;
	className?: string;
};

export function Container({ children, className }: ContainerProps) {
	return (
		<div className={`mx-auto max-w-6xl px-6 ${className ?? ""}`}>
			{children}
		</div>
	);
}