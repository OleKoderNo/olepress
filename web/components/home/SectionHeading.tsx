// SectionHeading component
// Reusable heading block for homepage sections

type SectionHeadingProps = {
	eyebrow?: string;
	title: string;
	description?: string;
	level?: "h1" | "h2";
};

// Section heading component
// Reusable heading block for page sections and archive headers
// Supports semantic heading levels depending on page context

export function SectionHeading({ eyebrow, title, description, level = "h2" }: SectionHeadingProps) {
	const HeadingTag = level;

	return (
		<div className="max-w-2xl">
			{eyebrow ? (
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
					{eyebrow}
				</p>
			) : null}

			<HeadingTag className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
				{title}
			</HeadingTag>

			{description ? (
				<p className="mt-5 text-lg leading-8 text-neutral-300">{description}</p>
			) : null}
		</div>
	);
}
