"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchResultCard } from "@/components/search/SearchResultCard";
import type { ArticlePreview } from "@/lib/types";

// Search results component
// Filters article metadata client-side and keeps search + filters in the URL

type SearchResultsProps = {
	articles: ArticlePreview[];
};

type TechnologyGroup = {
	group: string;
	items: {
		slug: string;
		title: string;
	}[];
};

// Formats stored Sanity category values into user-friendly labels
function formatTechnologyCategoryLabel(value: string) {
	switch (value) {
		case "frontend":
			return "Frontend";
		case "backend":
			return "Backend";
		case "styling":
			return "Styling";
		case "cms":
			return "CMS";
		case "database":
			return "Database";
		case "devops":
			return "DevOps";
		case "tooling":
			return "Tooling";
		case "accessibility":
			return "Accessibility";
		default:
			return value.charAt(0).toUpperCase() + value.slice(1);
	}
}

export function SearchResults({ articles }: SearchResultsProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get("q") || "";
	const selectedCategory = searchParams.get("category") || "";
	const selectedTechnology = searchParams.get("technology") || "";

	const [isTechnologyPanelOpen, setIsTechnologyPanelOpen] = useState(false);
	const [technologySearch, setTechnologySearch] = useState("");

	// Builds the list of unique categories from the article data
	const categories = useMemo(() => {
		const uniqueCategories = new Map<string, string>();

		articles.forEach((article) => {
			uniqueCategories.set(article.category.slug, article.category.title);
		});

		return Array.from(uniqueCategories.entries())
			.map(([slug, title]) => ({ slug, title }))
			.sort((a, b) => a.title.localeCompare(b.title));
	}, [articles]);

	// Builds grouped technology options from technologies actually attached to articles
	// This automatically excludes unused technologies and empty groups
	const technologyGroups = useMemo<TechnologyGroup[]>(() => {
		const groups = new Map<string, Map<string, string>>();

		articles.forEach((article) => {
			article.technologies?.forEach((technology) => {
				const groupKey = technology.category || "other";

				if (!groups.has(groupKey)) {
					groups.set(groupKey, new Map<string, string>());
				}

				groups.get(groupKey)!.set(technology.slug, technology.title);
			});
		});

		const normalizedTechnologySearch = technologySearch.trim().toLowerCase();

		return Array.from(groups.entries())
			.map(([groupKey, itemsMap]) => ({
				group: formatTechnologyCategoryLabel(groupKey),
				items: Array.from(itemsMap.entries())
					.map(([slug, title]) => ({ slug, title }))
					.filter((item) =>
						!normalizedTechnologySearch
							? true
							: item.title.toLowerCase().includes(normalizedTechnologySearch),
					)
					.sort((a, b) => a.title.localeCompare(b.title)),
			}))
			.filter((group) => group.items.length > 0)
			.sort((a, b) => a.group.localeCompare(b.group));
	}, [articles, technologySearch]);

	// Finds the currently selected technology label for the dropdown button
	const selectedTechnologyLabel = useMemo(() => {
		if (!selectedTechnology) {
			return "All technologies";
		}

		for (const article of articles) {
			for (const technology of article.technologies || []) {
				if (technology.slug === selectedTechnology) {
					return technology.title;
				}
			}
		}

		return "All technologies";
	}, [articles, selectedTechnology]);

	// Updates one search parameter in the URL
	function updateSearchParam(key: string, value: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (value.trim()) {
			params.set(key, value.trim());
		} else {
			params.delete(key);
		}

		const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

		router.replace(nextUrl, { scroll: false });
	}

	// Clears all search filters at once
	function clearFilters() {
		setTechnologySearch("");
		setIsTechnologyPanelOpen(false);
		router.replace(pathname, { scroll: false });
	}

	const filteredArticles = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return articles.filter((article) => {
			const matchesQuery =
				!normalizedQuery ||
				article.title.toLowerCase().includes(normalizedQuery) ||
				(article.excerpt?.toLowerCase() || "").includes(normalizedQuery) ||
				article.category.title.toLowerCase().includes(normalizedQuery) ||
				(article.technologies || []).some((technology) =>
					technology.title.toLowerCase().includes(normalizedQuery),
				);

			const matchesCategory = !selectedCategory || article.category.slug === selectedCategory;

			const matchesTechnology =
				!selectedTechnology ||
				(article.technologies || []).some((technology) => technology.slug === selectedTechnology);

			return matchesQuery && matchesCategory && matchesTechnology;
		});
	}, [articles, query, selectedCategory, selectedTechnology]);

	const hasActiveFilters =
		Boolean(query.trim()) || Boolean(selectedCategory) || Boolean(selectedTechnology);

	return (
		<div>
			{/* Main search input */}
			<div className="mb-8">
				<label htmlFor="article-search" className="sr-only">
					Search articles
				</label>

				<input
					id="article-search"
					type="search"
					value={query}
					onChange={(event) => updateSearchParam("q", event.target.value)}
					placeholder="Search articles, categories, or technologies"
					className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20"
				/>
			</div>

			{/* Category filters */}
			<div className="mb-8">
				<p className="mb-3 text-sm font-medium text-neutral-300">Category</p>

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => updateSearchParam("category", "")}
						className={`rounded-md border px-3 py-1.5 text-sm transition ${
							!selectedCategory
								? "border-white/20 bg-white/10 text-white"
								: "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
						}`}
					>
						All
					</button>

					{categories.map((category) => (
						<button
							key={category.slug}
							type="button"
							onClick={() => updateSearchParam("category", category.slug)}
							className={`rounded-md border px-3 py-1.5 text-sm transition ${
								selectedCategory === category.slug
									? "border-white/20 bg-white/10 text-white"
									: "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
							}`}
						>
							{category.title}
						</button>
					))}
				</div>
			</div>

			{/* Technology dropdown filter */}
			<div className="mb-8">
				<p className="mb-3 text-sm font-medium text-neutral-300">Technology</p>

				<button
					type="button"
					onClick={() => setIsTechnologyPanelOpen((previousState) => !previousState)}
					className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
					aria-expanded={isTechnologyPanelOpen}
				>
					<span>{selectedTechnologyLabel}</span>
					<span aria-hidden="true">{isTechnologyPanelOpen ? "−" : "+"}</span>
				</button>

				{isTechnologyPanelOpen ? (
					<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
						{/* Dropdown search */}
						<div className="mb-5">
							<label htmlFor="technology-search" className="sr-only">
								Search technologies
							</label>

							<input
								id="technology-search"
								type="search"
								value={technologySearch}
								onChange={(event) => setTechnologySearch(event.target.value)}
								placeholder="Search technologies"
								className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20"
							/>
						</div>

						{/* Reset option */}
						<div className="mb-5">
							<button
								type="button"
								onClick={() => updateSearchParam("technology", "")}
								className={`rounded-md border px-3 py-1.5 text-sm transition ${
									!selectedTechnology
										? "border-white/20 bg-white/10 text-white"
										: "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
								}`}
							>
								All technologies
							</button>
						</div>

						{/* Grouped technologies */}
						<div className="space-y-5">
							{technologyGroups.length > 0 ? (
								technologyGroups.map((group) => (
									<div key={group.group}>
										<h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-400">
											{group.group}
										</h3>

										<div className="flex flex-wrap gap-2">
											{group.items.map((technology) => (
												<button
													key={technology.slug}
													type="button"
													onClick={() => {
														updateSearchParam("technology", technology.slug);
														setIsTechnologyPanelOpen(false);
													}}
													className={`rounded-md border px-3 py-1.5 text-sm transition ${
														selectedTechnology === technology.slug
															? "border-white/20 bg-white/10 text-white"
															: "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
													}`}
												>
													{technology.title}
												</button>
											))}
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-neutral-400">No matching technologies found.</p>
							)}
						</div>
					</div>
				) : null}
			</div>

			{/* Search summary */}
			<div className="mb-8 flex flex-wrap items-center gap-3">
				<p className="text-sm text-neutral-400">
					{filteredArticles.length} result
					{filteredArticles.length === 1 ? "" : "s"}
				</p>

				{hasActiveFilters ? (
					<button
						type="button"
						onClick={clearFilters}
						className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
					>
						Clear filters
					</button>
				) : null}
			</div>

			{/* Search results */}
			{filteredArticles.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{filteredArticles.map((article) => (
						<SearchResultCard key={article._id} article={article} query={query} />
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
