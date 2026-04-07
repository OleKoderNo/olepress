import Link from "next/link";

// Technology badge component
// Displays a technology tag with an optional hover tooltip for skill level
// Can optionally render as a link for archive navigation

type TechnologyBadgeProps = {
	title: string;
	skillLevel?: number;
	href?: string;
};

export function TechnologyBadge({ title, skillLevel, href }: TechnologyBadgeProps) {
	const content = (
		<>
			{title}

			{/* Skill level tooltip */}
			{skillLevel ? (
				<span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg group-hover/tech:block">
					{skillLevel}/5
				</span>
			) : null}
		</>
	);

	if (href) {
		return (
			<Link
				href={href}
				className="group/tech relative inline-flex rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 transition hover:bg-white/10 hover:text-white"
			>
				{content}
			</Link>
		);
	}

	return (
		<span className="group/tech relative inline-flex cursor-default rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
			{content}
		</span>
	);
}
