// Section component
// Adds vertical spacing between major page sections

type SectionProps = {
	children: React.ReactNode;
	className?: string;
};

export function Section({ children, className }: SectionProps) {
	return (
		// Provides consistent spacing between layout sections
		<section className={`py-16 ${className ?? ""}`}>
			{children}
		</section>
	);
}