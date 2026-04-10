import Link from "next/link";
import { Container } from "./Container";

// Footer component
// Displays simple site ownership and closing text

export function Footer() {
	return (
		<footer className="border-t border-white/10">
			<Container className="py-8">
				<div className="flex flex-col gap-4E text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
					<p>© {new Date().getFullYear()} OlePress — Built by OleKoderNo</p>
					<p>A newspaper-style portfolio about projects, ideas, and interests.</p>

					<nav className="flex flex-wrap gap-4 justify-center">
						<Link href="/privacy" className="transition hover:text-white!">
							Privacy Policy
						</Link>
						<Link href="/cookies" className="transition hover:text-white!">
							Cookies
						</Link>
						<Link href="/contact" className="transition hover:text-white!">
							Contact
						</Link>
					</nav>
				</div>
			</Container>
		</footer>
	);
}
