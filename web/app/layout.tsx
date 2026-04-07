import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

// Site metadata
// Provides default SEO and social sharing data for the full site

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "OlePress",
		template: "%s | OlePress",
	},
	description:
		"A newspaper-style portfolio where Ole Håvard Furuseth Bergan writes about frontend projects, technical ideas, reviews, and personal interests.",
	openGraph: {
		title: "OlePress",
		description:
			"A newspaper-style portfolio where Ole Håvard Furuseth Bergan writes about frontend projects, technical ideas, reviews, and personal interests.",
		url: siteUrl,
		siteName: "OlePress",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "OlePress",
		description:
			"A newspaper-style portfolio where Ole Håvard Furuseth Bergan writes about frontend projects, technical ideas, reviews, and personal interests.",
	},
};

// Root layout
// Wraps all pages with shared site structure and global styles

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	return (
		<html lang="en">
			<body className="min-h-screen bg-neutral-950 text-white antialiased">
				<div className="flex min-h-screen flex-col">
					<Navbar
						user={
							user
								? {
										displayName: user.displayName,
									}
								: null
						}
					/>
					<div className="flex-1">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
