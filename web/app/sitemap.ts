import type { MetadataRoute } from "next";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity/client";

// Sitemap data types
// Used to build category and article URLs from Sanity content

type SitemapCategory = {
	slug: string;
};

type SitemapArticle = {
	slug: string;
	publishedAt?: string;
	category: {
		slug: string;
	};
};

// Site URL helper
// Uses your configured public site URL and falls back to localhost in development

function getSiteUrl() {
	return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

// Sitemap
// Generates a dynamic sitemap from static pages, category pages, and article pages

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const siteUrl = getSiteUrl();

	const [categories, articles] = await Promise.all([
		client.fetch<SitemapCategory[]>(
			groq`
				*[_type == "category" && defined(slug.current)]{
					"slug": slug.current
				}
			`,
		),
		client.fetch<SitemapArticle[]>(
			groq`
				*[
					_type == "article" &&
					defined(slug.current) &&
					defined(category->slug.current)
				]{
					"slug": slug.current,
					publishedAt,
					"category": category->{
						"slug": slug.current
					}
				}
			`,
		),
	]);

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: `${siteUrl}/`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${siteUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${siteUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];

	const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
		url: `${siteUrl}/${category.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: category.slug === "projects" ? 0.9 : 0.7,
	}));

	const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
		url: `${siteUrl}/${article.category.slug}/${article.slug}`,
		lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
		changeFrequency: "monthly",
		priority: article.category.slug === "projects" ? 0.8 : 0.6,
	}));

	return [...staticPages, ...categoryPages, ...articlePages];
}
