import Link from "next/link";
import { Container } from "./Container";

// Navbar component
// Displays the site brand and the main navigation links

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/development", label: "Development" },
	{ href: "/reviews", label: "Reviews" },
	{ href: "/travel", label: "Travel" },
];

export function Navbar() {
	return (
		<header className="border-b border-white/10 bg-neutral-950/95 backdrop-blur">
			<Container className="flex min-h-16 items-center justify-between gap-6">
				{/* Brand / site title */}
				<Link href="/" className="text-lg font-semibold tracking-wide text-white">
					OlePress
				</Link>

				{/* Main navigation */}
				<nav className="hidden items-center gap-6 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-neutral-300 transition hover:text-white"
						>
							{link.label}
						</Link>
					))}
				</nav>
			</Container>
		</header>
	);
}