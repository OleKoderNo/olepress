import type { MetadataRoute } from "next";

// Site URL helper
// Uses your configured public site URL and falls back to localhost in development

function getSiteUrl() {
	return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

// Robots
// Allows search engines to crawl the public site and points them to the sitemap

export default function robots(): MetadataRoute.Robots {
	const siteUrl = getSiteUrl();

	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl,
	};
}
