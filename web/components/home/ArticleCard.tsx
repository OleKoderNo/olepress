import Link from "next/link";

// ArticleCard component
// Reusable card for homepage article previews and later category pages

type ArticleCardProps = {
	title: string;
	excerpt: string;
	category: string;
	href: string;
};

export function ArticleCard({
	title,
	excerpt,
	category,
	href,
}: ArticleCardProps) {
	return (
		<article className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/[0.07]">
			<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
				{category}
			</p>

			<h3 className="text-xl font-semibold text-white">
				<Link href={href} className="transition hover:text-neutral-200">
					{title}
				</Link>
			</h3>

			<p className="mt-3 text-sm leading-7 text-neutral-300">{excerpt}</p>
		</article>
	);
}