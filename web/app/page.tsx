import type { Image as SanityImage } from "sanity";
import { Hero } from "@/components/home/Hero";
import { ArticleCard } from "@/components/home/ArticleCard";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { client } from "@/lib/sanity/client";
import { articlesQuery } from "@/lib/sanity/queries";

// Home page article type
// Describes the article data returned from Sanity

type Technology = {
	_id: string;
	title: string;
	slug?: {
		current?: string;
	};
	skillLevel?: number;
};

type Article = {
	_id: string;
	title: string;
	excerpt?: string;
	mainImage?: SanityImage;
	slug?: {
		current?: string;
	};
	category?: {
		title?: string;
	};
	technologies?: Technology[];
};

// Home page
// Fetches articles from Sanity and renders them as reusable cards

export default async function Home() {
	const articles = await client.fetch<Article[]>(articlesQuery);

	return (
		<main>
			{/* Hero section */}
			<Hero />

			{/* Latest stories section */}
			<Section>
				<Container>
					<SectionHeading
						eyebrow="Front page"
						title="Latest stories"
						description="A mix of project breakdowns, technical write-ups, and personal articles published through OlePress."
					/>

					<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{articles.length > 0 ? (
							articles.map((article) => (
								<ArticleCard
									key={article._id}
									title={article.title}
									excerpt={article.excerpt || "No excerpt added yet."}
									category={article.category?.title || "Uncategorized"}
									href={
										article.slug?.current
											? `/article/${article.slug.current}`
											: "#"
									}
									image={article.mainImage}
									technologies={article.technologies || []}
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
					/>
				</Container>
			</Section>
		</main>
	);
}