import Image from "next/image";
import Link from "next/link";
import type { Image as SanityImage } from "sanity";
import { urlFor } from "@/lib/sanity/image";

// Article card component
// Displays an article preview with image, category, excerpt, and technologies

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
		<article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/[0.07]">
			{/* Article image */}
			<div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-white/5">
				{image ? (
					<Image
						src={urlFor(image).width(800).height(500).url()}
						alt={title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-sm text-neutral-500">
						No image added
					</div>
				)}
			</div>

			<div className="p-6">
				{/* Article category */}
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
					{category}
				</p>

				{/* Article title */}
				<h3 className="text-xl font-semibold text-white">
					<Link href={href} className="transition hover:text-neutral-200">
						{title}
					</Link>
				</h3>

				{/* Article excerpt */}
				<p className="mt-3 text-sm leading-7 text-neutral-300">{excerpt}</p>

				{/* Technology tags with hoverable skill level */}
				{technologies.length > 0 ? (
					<div className="mt-5 flex min-h-[56px] flex-wrap content-start gap-2">
						{technologies.map((technology) => (
							<span
								key={technology._id}
								className="group relative inline-flex cursor-default rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200"
							>
								{technology.title}

								{/* Hover tooltip showing skill level */}
								{technology.skillLevel ? (
									<span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg group-hover:block">
										{technology.skillLevel}/5
									</span>
								) : null}
							</span>
						))}
					</div>
				) : (
					<div className="mt-5 min-h-[56px]" />
				)}
			</div>
		</article>
	);
}