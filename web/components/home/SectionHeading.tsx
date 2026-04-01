// SectionHeading component
// Reusable heading block for homepage sections

type SectionHeadingProps = {
	eyebrow?: string;
	title: string;
	description?: string;
};

export function SectionHeading({
	eyebrow,
	title,
	description,
}: SectionHeadingProps) {
	return (
		<div className="max-w-2xl">
			{eyebrow ? (
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
					{eyebrow}
				</p>
			) : null}

			<h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
				{title}
			</h2>

			{description ? (
				<p className="mt-4 text-base leading-7 text-neutral-300">{description}</p>
			) : null}
		</div>
	);
}