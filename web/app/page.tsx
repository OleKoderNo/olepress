import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { ArticleCard } from "@/components/home/ArticleCard";
import { Hero } from "@/components/home/Hero";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

import { client } from "@/lib/sanity/client";
import { articlesQuery, featuredArticlesQuery } from "@/lib/sanity/queries";
import type { ArticlePreview } from "@/lib/types";

// Home page
// Fetches featured and latest articles from Sanity and renders them on the homepage

export default async function Home() {
	const [featuredArticles, articles] = await Promise.all([
		client.fetch<ArticlePreview[]>(featuredArticlesQuery),
		client.fetch<ArticlePreview[]>(articlesQuery),
	]);

	const featuredArticle = featuredArticles[0] ?? null;

	return (
		<main>
			{/* Hero section */}
			<Hero />

			{/* Featured article section */}
			{featuredArticle ? (
				<Section>
					<Container>
						<FeaturedArticle article={featuredArticle} />
					</Container>
				</Section>
			) : null}

			{/* Latest stories section */}
			<Section>
				<Container>
					<SectionHeading
						eyebrow="Front page"
						title="Latest stories"
						description="A mix of project breakdowns, technical write-ups, and personal articles published through OlePress."
						level="h2"
					/>

					<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{articles.length > 0 ? (
							articles.map((article) => (
								<ArticleCard
									key={article._id}
									title={article.title}
									excerpt={article.excerpt || "No excerpt added yet."}
									body={article.body}
									category={article.category?.title || "Uncategorized"}
									href={`/${article.category.slug}/${article.slug}`}
									image={article.mainImage}
									technologies={article.technologies || []}
									isPremium={article.isPremium}
								/>
							))
						) : (
							<p className="text-neutral-400">No articles published yet.</p>
						)}
					</div>
				</Container>
			</Section>

			{/* About the site section */}
			<Section className="border-t border-white/10">
				<Container>
					<SectionHeading
						eyebrow="About OlePress"
						title="A portfolio built like a publication"
						description="OlePress is designed like a digital newspaper so I can present projects, ideas, and personal interests in a more editorial and story-driven format."
						level="h2"
					/>
				</Container>
			</Section>
		</main>
	);
}
