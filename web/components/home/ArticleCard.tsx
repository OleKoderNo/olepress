import Image from "next/image";
import Link from "next/link";
import type { Image as SanityImage } from "sanity";
import { urlFor } from "@/lib/sanity/image";

// ArticleCard component
// Displays preview of an article with image, category, excerpt,
// and technology badges with hoverable skill levels

type Technology = {
	_id: string;
	title: string;
	slug?: {
		current?: string;
	};
	skillLevel?: number;
};

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
		// Entire card acts as clickable link
		<Link href={href} className="group block">
			<article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]">

				{/* Article image */}
				<div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-white/5">
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

				<div className="p-6">
					{/* Category label */}
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
						{category}
					</p>

					{/* Article title */}
					<h3 className="text-xl font-semibold text-white transition group-hover:text-neutral-200">
						{title}
					</h3>

					{/* Article excerpt */}
					<p className="mt-3 text-sm leading-7 text-neutral-300">
						{excerpt}
					</p>

					{/* Technology badges */}
					{/* Tooltips appear only when hovering each badge */}
					{technologies.length > 0 ? (
						<div className="mt-5 flex min-h-[56px] flex-wrap content-start gap-2">
							{technologies.map((technology) => (
								<span
									key={technology._id}
									className="group/tech relative inline-flex cursor-default rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200"
								>
									{technology.title}

									{/* Skill level tooltip */}
									{technology.skillLevel ? (
										<span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg group-hover/tech:block">
											{technology.skillLevel}/5
										</span>
									) : null}
								</span>
							))}
						</div>
					) : (
						// Keeps consistent card height if no technologies exist
						<div className="mt-5 min-h-[56px]" />
					)}
				</div>
			</article>
		</Link>
	);
}