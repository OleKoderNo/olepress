import type { NextConfig } from "next";

// Next.js config
// Allows external images from the Sanity CDN

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
};

export default nextConfig;