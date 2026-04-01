// Footer component
// Displays copyright and site ownership information

import { Container } from "../Container";

export function Footer() {
	return (
		<footer className="border-t border-white/10 py-10 text-sm text-neutral-400">

			<Container>

				{/* Dynamic year ensures footer stays updated automatically */}
				<p>
					© {new Date().getFullYear()} OlePress — Built by OleKoderNo
				</p>

			</Container>

		</footer>
	);
}