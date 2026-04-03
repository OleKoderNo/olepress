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

// Category page props
// Receives the category slug from the route

type CategoryPageProps = {
	params: Promise<{
		category: string;
	}>;
};

// Category page
// Shows all articles in one category and lazy loads more as needed

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;

	const [categoryMeta, initialArticles, totalCount] = await Promise.all([
		client.fetch(categoryMetaQuery, { category }),
		client.fetch(categoryArticlesQuery, {
			category,
			start: 0,
			end: 9,
		}),
		client.fetch(categoryArticleCountQuery, { category }),
	]);

	if (!categoryMeta) {
		notFound();
	}

	return (
		<main>
			<Section>
				<Container>
					<SectionHeading
						eyebrow="Category"
						title={categoryMeta.title}
						description={
							categoryMeta.description || "Articles from this section of OlePress."
						}
					/>

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