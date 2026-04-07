import Link from "next/link";

// Premium article notice
// Displays a locked content message for premium articles

export function PremiumArticleNotice() {
	return (
		<div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8">
			<p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
				Premium article
			</p>

			<h2 className="text-2xl font-semibold tracking-tight text-white">This article is locked</h2>

			<p className="mt-4 max-w-2xl text-base leading-8 text-neutral-300">
				This article is available for premium readers. Later, this can be unlocked through your
				premium system or app access workflow.
			</p>

			<div className="mt-6 flex flex-wrap gap-3">
				<Link
					href="/contact"
					className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
				>
					Contact me
				</Link>

				<Link
					href="/projects"
					className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
				>
					Browse more articles
				</Link>
			</div>
		</div>
	);
}
