"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArticleCard } from "@/components/home/ArticleCard";
import type { ArticlePreview } from "@/lib/types";

// Search results component
// Filters article metadata client-side and keeps the search query in the URL

type SearchResultsProps = {
	articles: ArticlePreview[];
};

export function SearchResults({ articles }: SearchResultsProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get("q") || "";

	function handleSearch(value: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (value.trim()) {
			params.set("q", value.trim());
		} else {
			params.delete("q");
		}

		const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

		router.replace(nextUrl, { scroll: false });
	}

	const filteredArticles = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		if (!normalizedQuery) {
			return articles;
		}

		return articles.filter((article) => {
			const title = article.title.toLowerCase();
			const excerpt = article.excerpt?.toLowerCase() || "";
			const category = article.category.title.toLowerCase();

			const technologies = article.technologies?.map((t) => t.title.toLowerCase()) || [];

			return (
				title.includes(normalizedQuery) ||
				excerpt.includes(normalizedQuery) ||
				category.includes(normalizedQuery) ||
				technologies.some((tech) => tech.includes(normalizedQuery))
			);
		});
	}, [articles, query]);

	return (
		<div>
			{/* Search input */}
			<div className="mb-10">
				<label htmlFor="article-search" className="sr-only">
					Search articles
				</label>

				<input
					id="article-search"
					type="search"
					value={query}
					onChange={(event) => handleSearch(event.target.value)}
					placeholder="Search articles, categories, or technologies"
					className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20"
				/>
			</div>

			{/* Result count */}
			<p className="mb-8 text-sm text-neutral-400">
				{filteredArticles.length} result
				{filteredArticles.length === 1 ? "" : "s"}
			</p>

			{/* Results */}
			{filteredArticles.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{filteredArticles.map((article) => (
						<ArticleCard
							key={article._id}
							title={article.title}
							excerpt={article.excerpt || "No excerpt added yet."}
							body={article.body}
							category={article.category.title}
							href={`/${article.category.slug}/${article.slug}`}
							image={article.mainImage}
							technologies={article.technologies || []}
						/>
					))}
				</div>
			) : (
				<div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-neutral-300">
					No matching articles found.
				</div>
			)}
		</div>
	);
}
