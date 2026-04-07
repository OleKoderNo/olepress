import Image from "next/image";
import Link from "next/link";

import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";
import { urlFor } from "@/lib/sanity/image";
import type { ArticlePreview } from "@/lib/types";
import { getReadingTime } from "@/lib/utils/readingTime";

// Featured article component
// Displays a larger homepage spotlight card for one featured article

type FeaturedArticleProps = {
	article: ArticlePreview;
};

export function FeaturedArticle({ article }: FeaturedArticleProps) {
	const readingTime = getReadingTime(article.body);

	return (
		<section className="mb-20">
			<div className="mb-8 max-w-2xl">
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
					Featured story
				</p>

				<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Featured work</h2>

				<p className="mt-5 text-lg leading-8 text-neutral-300">
					A highlighted article from OlePress, selected to sit at the front of the portfolio.
				</p>
			</div>

			<Link href={`/${article.category.slug}/${article.slug}`} className="group block">
				<article className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07] lg:grid-cols-[1.2fr_1fr]">
					{/* Featured image */}
					<div className="relative min-h-80 overflow-hidden border-b border-white/10 bg-white/5 lg:min-h-120 lg:border-b-0 lg:border-r">
						{article.mainImage ? (
							<Image
								src={urlFor(article.mainImage).width(1400).height(900).url()}
								alt={article.title}
								fill
								className="object-cover transition duration-300 group-hover:scale-[1.02]"
							/>
						) : (
							<div className="flex h-full items-center justify-center text-sm text-neutral-500">
								No image added
							</div>
						)}
					</div>

					{/* Featured content */}
					<div className="flex flex-col justify-between p-8 lg:p-10">
						<div>
							<div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
								<span>{article.category.title}</span>
								{readingTime ? <span>• {readingTime}</span> : null}
							</div>

							{/* Premium badge */}
							{article.isPremium ? (
								<div className="mb-4">
									<PremiumBadge />
								</div>
							) : null}

							<h3 className="text-3xl font-bold tracking-tight text-white transition group-hover:text-neutral-200 sm:text-4xl">
								{article.title}
							</h3>

							{article.excerpt ? (
								<p className="mt-6 max-w-xl text-lg leading-8 text-neutral-300">
									{article.excerpt}
								</p>
							) : null}
						</div>

						<div className="mt-8">
							{article.technologies?.length ? (
								<div className="mb-6 flex flex-wrap gap-2">
									{article.technologies.map((technology) => (
										<TechnologyBadge
											key={technology._id}
											title={technology.title}
											skillLevel={technology.skillLevel}
										/>
									))}
								</div>
							) : null}

							<span className="inline-flex rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition group-hover:bg-white/10">
								Read article
							</span>
						</div>
					</div>
				</article>
			</Link>
		</section>
	);
}
