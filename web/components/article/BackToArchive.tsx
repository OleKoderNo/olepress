import Link from "next/link";

// Back to archive component
// Shows a link back to the current category archive page

type BackToArchiveProps = {
	categorySlug: string;
	categoryTitle?: string;
};

export function BackToArchive({ categorySlug, categoryTitle }: BackToArchiveProps) {
	return (
		<div className="mb-8">
			<Link
				href={`/${categorySlug}`}
				className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
			>
				<span aria-hidden="true">←</span>
				<span>Back to {categoryTitle || "archive"}</span>
			</Link>
		</div>
	);
}
