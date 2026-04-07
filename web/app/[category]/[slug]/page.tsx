import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Image as SanityImage, PortableTextBlock } from "sanity";

import { BackToArchive } from "@/components/article/BackToArchive";
import { RelatedProjects } from "@/components/article/RelatedProjects";
import { portableTextComponents } from "@/components/article/PortableTextComponents";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { getReadingTime } from "@/lib/utils/readingTime";
import { articleByCategoryAndSlugQuery, relatedArticlesQuery } from "@/lib/sanity/queries";
import type { ArticlePreview, Technology } from "@/lib/types";

// Article type
// Describes the article data returned from Sanity

type Article = {
	_id: string;
	title: string;
	slug: string;
	excerpt?: string;
	body?: PortableTextBlock[];
	mainImage?: SanityImage;
	publishedAt?: string;
	isProject?: boolean;
	githubUrl?: string;
	liveUrl?: string;
	category: {
		title: string;
		slug: string;
	};
	author?: {
		name?: string;
	};
	technologies?: Technology[];
};

// Page props
// In Next.js 16, params is a Promise in server page files

type Props = {
	params: Promise<{
		category: string;
		slug: string;
	}>;
};

// Helper
// Builds the full public URL for the current site

function getSiteUrl() {
	return process.env.NEXT_PUBLIC_SITE_URL || "https://olepress.vercel.app/";
}

// Page metadata
// Generates SEO and social sharing metadata for each article page

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category, slug } = await params;

	const article = await client.fetch<Article | null>(articleByCategoryAndSlugQuery, {
		category,
		slug,
	});

	if (!article) {
		return {
			title: "Article not found | OlePress",
			description: "The requested article could not be found.",
		};
	}

	const siteUrl = getSiteUrl();
	const articleUrl = `${siteUrl}/${article.category.slug}/${article.slug}`;
	const title = `${article.title} | OlePress`;
	const description = article.excerpt || "Read this article on OlePress.";
	const ogImage = article.mainImage
		? urlFor(article.mainImage).width(1200).height(630).url()
		: `${siteUrl}/opengraph-image.png`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: articleUrl,
			siteName: "OlePress",
			type: "article",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: article.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

// Article page
// Displays a single article using /category/slug structure

export default async function ArticlePage({ params }: Props) {
	const { category, slug } = await params;

	// Fetch article and related articles at the same time
	const [article, relatedArticles] = await Promise.all([
		client.fetch<Article | null>(articleByCategoryAndSlugQuery, {
			category,
			slug,
		}),
		client.fetch<ArticlePreview[]>(relatedArticlesQuery, {
			category,
			slug,
		}),
	]);

	if (!article) {
		notFound();
	}

	const readingTime = getReadingTime(article.body);

	return (
		<main>
			<Section>
				<Container className="max-w-4xl">
					<article>
						{/* Back to archive link */}
						<BackToArchive
							categorySlug={article.category.slug}
							categoryTitle={article.category.title}
						/>

						{/* Category label */}
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
							{article.category.title}
						</p>

						{/* Title */}
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
							{article.title}
						</h1>

						{/* Excerpt */}
						{article.excerpt ? (
							<p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-300">{article.excerpt}</p>
						) : null}

						{/* Author, publish date, and reading time */}
						<div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-400">
							{article.author?.name ? <span>By {article.author.name}</span> : null}

							{article.publishedAt ? (
								<span>{new Date(article.publishedAt).toLocaleDateString()}</span>
							) : null}

							{readingTime ? <span>{readingTime}</span> : null}
						</div>

						{/* Hero image */}
						{article.mainImage ? (
							<div className="relative mt-10 mb-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
								<Image
									src={urlFor(article.mainImage).width(1400).height(788).url()}
									alt={article.title}
									fill
									className="object-cover"
								/>
							</div>
						) : null}

						{/* Project links */}
						{article.isProject ? (
							<div className="mb-8 flex flex-wrap gap-3">
								{article.githubUrl ? (
									<a
										href={article.githubUrl}
										target="_blank"
										rel="noreferrer"
										className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
									>
										GitHub repository
									</a>
								) : null}

								{article.liveUrl ? (
									<a
										href={article.liveUrl}
										target="_blank"
										rel="noreferrer"
										className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
									>
										Live demo
									</a>
								) : null}
							</div>
						) : null}

						{/* Technology badges */}
						{article.technologies?.length ? (
							<div className="mb-10 flex flex-wrap gap-2 overflow-visible">
								{article.technologies.map((technology) => (
									<TechnologyBadge
										key={technology._id}
										title={technology.title}
										skillLevel={technology.skillLevel}
									/>
								))}
							</div>
						) : null}

						{/* Article body */}
						{article.body?.length ? (
							<div className="prose prose-invert max-w-none">
								<PortableText value={article.body} components={portableTextComponents} />
							</div>
						) : null}
					</article>

					{/* Related projects section */}
					<RelatedProjects articles={relatedArticles} />
				</Container>
			</Section>
		</main>
	);
}
