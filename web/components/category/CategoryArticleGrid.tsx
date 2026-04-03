"use client";

import { useEffect, useRef, useState } from "react";
import { ArticleCard } from "@/components/home/ArticleCard";
import type { ArticlePreview } from "@/lib/types";

// Category article grid
// Renders initial category articles and lazy loads more when needed

type CategoryArticleGridProps = {
	initialArticles: ArticlePreview[];
	category: string;
	totalCount: number;
};

export function CategoryArticleGrid({
	initialArticles,
	category,
	totalCount,
}: CategoryArticleGridProps) {
	const [articles, setArticles] = useState(initialArticles);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(initialArticles.length < totalCount);

	const loaderRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const target = loaderRef.current;

		if (!target || !hasMore || isLoading) {
			return;
		}

		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting || isLoading) {
					return;
				}

				setIsLoading(true);

				try {
					const response = await fetch(
						`/api/articles?category=${category}&offset=${articles.length}&limit=9`
					);

					if (!response.ok) {
						throw new Error("Failed to load more articles");
					}

					const data: ArticlePreview[] = await response.json();

					if (data.length === 0) {
						setHasMore(false);
					} else {
						setArticles((prevArticles) => [...prevArticles, ...data]);

						if (articles.length + data.length >= totalCount) {
							setHasMore(false);
						}
					}
				} catch (error) {
					console.error(error);
				} finally {
					setIsLoading(false);
				}
			},
			{
				rootMargin: "300px",
			}
		);

		observer.observe(target);

		return () => observer.disconnect();
	}, [articles.length, category, hasMore, isLoading, totalCount]);

	return (
		<div>
			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{articles.map((article) => (
					<ArticleCard
						key={article._id}
						title={article.title}
						excerpt={article.excerpt || "No excerpt added yet."}
						category={article.category?.title || "Uncategorized"}
						href={article.slug && article.category?.slug ? `/${article.category.slug}/${article.slug}` : "#"}
						image={article.mainImage}
						technologies={article.technologies || []}
					/>
				))}
			</div>

			{hasMore ? (
				<div ref={loaderRef} className="py-10 text-center text-sm text-neutral-400">
					{isLoading ? "Loading more articles..." : "Scroll for more"}
				</div>
			) : null}
		</div>
	);
}