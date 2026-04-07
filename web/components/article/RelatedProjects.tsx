import { ArticleCard } from "@/components/home/ArticleCard";
import type { ArticlePreview } from "@/lib/types";

// Related projects section
// Displays 3 additional projects from the same category

type RelatedProjectsProps = {
	articles: ArticlePreview[];
};

export function RelatedProjects({ articles }: RelatedProjectsProps) {
	if (!articles.length) return null;

	return (
		<section className="mt-20 border-t border-white/10 pt-12">
			<h2 className="mb-8 text-2xl font-semibold text-white">More projects</h2>

			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{articles.map((article) => (
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
				))}
			</div>
		</section>
	);
}
