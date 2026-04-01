import { ReactNode } from "react";

// Section component
// Adds reusable vertical spacing between page sections

type SectionProps = {
	children: ReactNode;
	className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
	return <section className={`py-16 ${className}`}>{children}</section>;
}