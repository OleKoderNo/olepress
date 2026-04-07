import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TechnologyArticleGrid } from "@/components/technology/TechnologyArticleGrid";

import { client } from "@/lib/sanity/client";
import {
	technologyArticleCountQuery,
	technologyArticlesQuery,
	technologyMetaQuery,
} from "@/lib/sanity/queries";
import type { ArticlePreview, TechnologyMeta } from "@/lib/types";

// Technology page props
// In Next.js 16, params is a Promise in server page files

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

// Technology archive page
// Shows all articles that reference one technology

export default async function TechnologyPage({ params }: Props) {
	const { slug } = await params;

	const [technologyMeta, initialArticles, totalCount] = await Promise.all([
		client.fetch<TechnologyMeta | null>(technologyMetaQuery, { slug }),
		client.fetch<ArticlePreview[]>(technologyArticlesQuery, {
			slug,
			start: 0,
			end: 9,
		}),
		client.fetch<number>(technologyArticleCountQuery, { slug }),
	]);

	if (!technologyMeta) {
		notFound();
	}

	return (
		<main>
			<Section>
				<Container>
					{/* Technology header */}
					<SectionHeading
						eyebrow="Technology"
						title={technologyMeta.title}
						description={`Articles and projects connected to ${technologyMeta.title}.`}
						level="h1"
					/>

					<p className="mt-4 text-sm text-neutral-400">
						{totalCount} article{totalCount === 1 ? "" : "s"}
					</p>

					<div className="mt-10">
						<TechnologyArticleGrid
							initialArticles={initialArticles}
							slug={slug}
							totalCount={totalCount}
						/>
					</div>
				</Container>
			</Section>
		</main>
	);
}
