import Image from "next/image";
import Link from "next/link";

import { HighlightedText } from "@/components/search/HighlightedText";
import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";
import { urlFor } from "@/lib/sanity/image";
import { getReadingTime } from "@/lib/utils/readingTime";
import type { ArticlePreview } from "@/lib/types";

// Search result card
// Displays a search result with highlighted matching text

type SearchResultCardProps = {
	article: ArticlePreview;
	query: string;
};

export function SearchResultCard({ article, query }: SearchResultCardProps) {
	const readingTime = getReadingTime(article.body);

	return (
		<Link href={`/${article.category.slug}/${article.slug}`} className="group block h-full">
			<article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]">
				{/* Article image */}
				<div className="relative aspect-16/10 w-full overflow-hidden border-b border-white/10 bg-white/5">
					{article.mainImage ? (
						<Image
							src={urlFor(article.mainImage).width(800).height(500).url()}
							alt={article.title}
							fill
							className="object-cover transition group-hover:scale-[1.02]"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-sm text-neutral-500">
							No image added
						</div>
					)}
				</div>

				<div className="flex flex-1 flex-col p-6">
					{/* Category and reading time */}
					<div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
						<span>
							<HighlightedText text={article.category.title} query={query} />
						</span>
						{readingTime ? <span>• {readingTime}</span> : null}
					</div>

					{/* Premium badge */}
					{article.isPremium ? (
						<div className="mb-4">
							<PremiumBadge />
						</div>
					) : null}

					{/* Title */}
					<h3 className="text-xl font-semibold text-white transition group-hover:text-neutral-200">
						<HighlightedText text={article.title} query={query} />
					</h3>

					{/* Excerpt */}
					<p className="mt-3 min-h-28 overflow-hidden text-sm leading-7 text-neutral-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
						<HighlightedText text={article.excerpt || "No excerpt added yet."} query={query} />
					</p>

					{/* Technology badges */}
					<div className="mt-5 min-22 overflow-visible">
						{article.technologies?.length ? (
							<div className="flex flex-wrap content-start gap-2 overflow-visible">
								{article.technologies.map((technology) => (
									<TechnologyBadge
										key={technology._id}
										title={technology.title}
										skillLevel={technology.skillLevel}
									/>
								))}
							</div>
						) : null}
					</div>
				</div>
			</article>
		</Link>
	);
}
