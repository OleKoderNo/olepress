"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ArticleCard } from "@/components/home/ArticleCard";
import type { ArticlePreview } from "@/lib/types";

// Category article grid
// Renders initial category articles and lazy loads more when the user reaches the bottom

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

	// Loads the next batch of articles from the API route
	const loadMoreArticles = useCallback(async () => {
		if (isLoading || !hasMore) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch(
				`/api/articles?category=${category}&offset=${articles.length}&limit=9`,
			);

			if (!response.ok) {
				throw new Error("Failed to load more articles");
			}

			const newArticles: ArticlePreview[] = await response.json();

			if (newArticles.length === 0) {
				setHasMore(false);
				return;
			}

			setArticles((previousArticles) => [...previousArticles, ...newArticles]);

			if (articles.length + newArticles.length >= totalCount) {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error loading more articles:", error);
		} finally {
			setIsLoading(false);
		}
	}, [articles.length, category, hasMore, isLoading, totalCount]);

	useEffect(() => {
		const target = loaderRef.current;

		if (!target || !hasMore) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (!entry.isIntersecting) {
					return;
				}

				void loadMoreArticles();
			},
			{
				rootMargin: "300px",
			},
		);

		observer.observe(target);

		return () => observer.disconnect();
	}, [hasMore, loadMoreArticles]);

	return (
		<div>
			{/* Article grid */}
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
					/>
				))}
			</div>

			{/* Lazy loading trigger */}
			{hasMore ? (
				<div ref={loaderRef} className="py-10 text-center text-sm text-neutral-400">
					{isLoading ? "Loading more projects..." : "Scroll for more"}
				</div>
			) : (
				<div className="py-10 text-center text-sm text-neutral-500">No more articles to load.</div>
			)}
		</div>
	);
}
