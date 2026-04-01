// Root layout
// Wraps every page with Navbar and Footer

import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-neutral-950 text-white">

				{/* Global navigation */}
				<Navbar />

				{/* Page content injected here */}
				{children}

				{/* Global footer */}
				<Footer />

			</body>
		</html>
	);
}