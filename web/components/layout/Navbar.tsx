"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";

// Navbar component
// Displays the site brand and main navigation links
// Includes a mobile hamburger menu for smaller screens

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About me" },
	{ href: "/reviews", label: "Reviews" },
	{ href: "/travel", label: "Travel" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	// Toggles the mobile menu open and closed
	function toggleMenu() {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	}

	// Closes the mobile menu after a link is clicked
	function closeMenu() {
		setIsOpen(false);
	}

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur">
			<Container className="py-4">
				<div className="flex items-center justify-between gap-6">
					{/* Brand / site title */}
					<Link
						href="/"
						className="text-lg font-semibold tracking-wide text-white"
						onClick={closeMenu}
					>
						OlePress
					</Link>

					{/* Desktop navigation */}
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

					{/* Mobile menu button */}
					<button
						type="button"
						onClick={toggleMenu}
						className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-neutral-300 transition hover:bg-white/5 hover:text-white md:hidden"
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
						aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
					>
						<span className="sr-only">
							{isOpen ? "Close menu" : "Open menu"}
						</span>

						<div className="flex h-5 w-5 flex-col items-center justify-center gap-1">
							<span
								className={`block h-0.5 w-5 bg-current transition ${
									isOpen ? "translate-y-1.5 rotate-45" : ""
								}`}
							/>
							<span
								className={`block h-0.5 w-5 bg-current transition ${
									isOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`block h-0.5 w-5 bg-current transition ${
									isOpen ? "-translate-y-1.5 -rotate-45" : ""
								}`}
							/>
						</div>
					</button>
				</div>

				{/* Mobile navigation */}
				{isOpen ? (
					<nav
						id="mobile-menu"
						className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 md:hidden"
					>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={closeMenu}
								className="rounded-md px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
							>
								{link.label}
							</Link>
						))}
					</nav>
				) : null}
			</Container>
		</header>
	);
}