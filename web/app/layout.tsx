import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Root layout
// Wraps every page with the shared site navigation and footer

export const metadata: Metadata = {
	title: "OlePress",
	description: "A newspaper-style portfolio by OleKoderNo.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-neutral-950 text-white antialiased">
				{/* Global site navigation */}
				<Navbar />

				{/* Main page content */}
				{children}

				{/* Global footer */}
				<Footer />
			</body>
		</html>
	);
}