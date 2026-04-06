import Image from "next/image";
import Link from "next/link";
import type { Image as SanityImage } from "sanity";
import type { Technology } from "@/lib/types";
import { urlFor } from "@/lib/sanity/image";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

// ArticleCard component
// Displays preview of an article with image, category, excerpt,
// and technology badges with hoverable skill levels

type ArticleCardProps = {
	title: string;
	excerpt: string;
	category: string;
	href: string;
	image?: SanityImage;
	technologies?: Technology[];
};

export function ArticleCard({
	title,
	excerpt,
	category,
	href,
	image,
	technologies = [],
}: ArticleCardProps) {
	return (
		<Link href={href} className="group block h-full">
			<article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]">
				{/* Article image */}
				<div className="relative aspect-16/10 w-full overflow-hidden border-b border-white/10 bg-white/5">
					{image ? (
						<Image
							src={urlFor(image).width(800).height(500).url()}
							alt={title}
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
					{/* Category label */}
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
						{category}
					</p>

					{/* Article title */}
					<h3 className="text-xl font-semibold text-white transition group-hover:text-neutral-200">
						{title}
					</h3>

					{/* Article excerpt */}
					<p className="mt-3 min-h-28 text-sm leading-7 text-neutral-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">
						{excerpt}
					</p>

					{/* Technology badges */}
					{/* Uses a reserved minimum height, but still allows more rows if needed */}
					<div className="mt-5 min-h-[88px] overflow-visible">
						{technologies.length > 0 ? (
							<div className="flex flex-wrap content-start gap-2 overflow-visible">
								{technologies.map((technology) => (
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
