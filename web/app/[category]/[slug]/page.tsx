import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Image as SanityImage, PortableTextBlock } from "sanity";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RelatedProjects } from "@/components/article/RelatedProjects";
import { portableTextComponents } from "@/components/article/PortableTextComponents";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { articleByCategoryAndSlugQuery, relatedArticlesQuery } from "@/lib/sanity/queries";

import type { Technology, ArticlePreview } from "@/lib/types";

// Article type
// Describes the article data returned from Sanity

type Article = {
	_id: string;
	title: string;
	slug?: string;
	excerpt?: string;
	body?: PortableTextBlock[];
	mainImage?: SanityImage;
	publishedAt?: string;
	isProject?: boolean;
	githubUrl?: string;
	liveUrl?: string;
	category?: {
		title?: string;
		slug?: string;
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

// Article page
// Displays a single article using /category/slug structure

export default async function ArticlePage({ params }: Props) {
	const { category, slug } = await params;

	// Fetch article + related projects at the same time
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

	return (
		<main>
			<Section>
				<Container className="max-w-4xl">
					<article>
						{/* Category label */}
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
							{article.category?.title ?? "Uncategorized"}
						</p>

						{/* Title */}
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
							{article.title}
						</h1>

						{/* Excerpt */}
						{article.excerpt ? (
							<p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-300">{article.excerpt}</p>
						) : null}

						{/* Author and publish date */}
						<div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-400">
							{article.author?.name ? <span>By {article.author.name}</span> : null}

							{article.publishedAt ? (
								<span>{new Date(article.publishedAt).toLocaleDateString()}</span>
							) : null}
						</div>

						{/* Hero image */}
						{article.mainImage ? (
							<div className="relative mt-10 mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
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
