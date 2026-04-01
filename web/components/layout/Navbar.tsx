// Navbar component
// Displays site title and main navigation links

import Link from "next/link";
import { Container } from "./Container";

export function Navbar() {
	return (
		<header className="border-b border-white/10">

			<Container className="flex h-16 items-center justify-between">

				{/* Logo / site title */}
				<Link
					href="/"
					className="text-lg font-semibold tracking-wide"
				>
					OlePress
				</Link>

				{/* Primary navigation links */}
				<nav className="flex gap-6 text-sm text-neutral-300">

					<Link href="/category/projects">Projects</Link>

					<Link href="/category/development">Development</Link>

					<Link href="/category/reviews">Reviews</Link>

					<Link href="/category/travel">Travel</Link>

				</nav>

			</Container>

		</header>
	);
}