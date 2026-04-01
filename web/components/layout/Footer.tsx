import { Container } from "./Container";

// Footer component
// Displays simple site ownership and closing text

export function Footer() {
	return (
		<footer className="border-t border-white/10">
			<Container className="py-10">
				<div className="flex flex-col gap-3 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
					<p>© {new Date().getFullYear()} OlePress — Built by OleKoderNo</p>
					<p>A newspaper-style portfolio about projects, ideas, and interests.</p>
				</div>
			</Container>
		</footer>
	);
}