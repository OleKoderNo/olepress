import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/home/SectionHeading";
import { CategoryArticleGrid } from "@/components/category/CategoryArticleGrid";
import { client } from "@/lib/sanity/client";
import {
	categoryArticlesQuery,
	categoryArticleCountQuery,
	categoryMetaQuery,
} from "@/lib/sanity/queries";
import type { ArticlePreview, CategoryMeta } from "@/lib/types";

// Category page props
// In Next.js 16, params is a Promise in server page files

type Props = {
	params: Promise<{
		category: string;
	}>;
};

// Category page
// Loads the initial article batch for one category and passes it to the lazy-loading grid

export default async function CategoryPage({ params }: Props) {
	const { category } = await params;

	const [categoryMeta, initialArticles, totalCount] = await Promise.all([
		client.fetch<CategoryMeta | null>(categoryMetaQuery, { category }),
		client.fetch<ArticlePreview[]>(categoryArticlesQuery, {
			category,
			start: 0,
			end: 9,
		}),
		client.fetch<number>(categoryArticleCountQuery, { category }),
	]);

	if (!categoryMeta) {
		notFound();
	}

	return (
		<main>
			<Section>
				<Container>
					{/* Category header */}
					<SectionHeading
						eyebrow="Category"
						title={categoryMeta.title}
						description={categoryMeta.description || "Articles from this section of OlePress."}
					/>

					<p className="mt-4 text-sm text-neutral-400">
						{totalCount} article{totalCount === 1 ? "" : "s"}
					</p>

					<div className="mt-10">
						<CategoryArticleGrid
							initialArticles={initialArticles}
							category={category}
							totalCount={totalCount}
						/>
					</div>
				</Container>
			</Section>
		</main>
	);
}
