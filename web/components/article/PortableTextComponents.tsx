import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";

// Portable text components
// Adds custom styling for headings, paragraphs, lists, and links in article content

export const portableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="mb-6 text-lg leading-9 text-neutral-200">{children}</p>
		),

		h1: ({ children }) => (
			<h1 className="mb-6 mt-12 text-4xl font-bold tracking-tight text-white">
				{children}
			</h1>
		),

		h2: ({ children }) => (
			<h2 className="mb-4 mt-12 text-3xl font-semibold tracking-tight text-white">
				{children}
			</h2>
		),

		h3: ({ children }) => (
			<h3 className="mb-4 mt-10 text-2xl font-semibold text-white">
				{children}
			</h3>
		),

		h4: ({ children }) => (
			<h4 className="mb-3 mt-8 text-xl font-semibold text-white">
				{children}
			</h4>
		),

		blockquote: ({ children }) => (
			<blockquote className="my-8 border-l-4 border-white/20 pl-6 italic text-neutral-300">
				{children}
			</blockquote>
		),
	},

	list: {
		bullet: ({ children }) => (
			<ul className="mb-6 ml-6 list-disc space-y-3 text-lg leading-9 text-neutral-200">
				{children}
			</ul>
		),

		number: ({ children }) => (
			<ol className="mb-6 ml-6 list-decimal space-y-3 text-lg leading-9 text-neutral-200">
				{children}
			</ol>
		),
	},

	listItem: {
		bullet: ({ children }) => <li>{children}</li>,
		number: ({ children }) => <li>{children}</li>,
	},

	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-white">{children}</strong>
		),

		em: ({ children }) => <em className="italic">{children}</em>,

		link: ({ children, value }) => {
			const href = value?.href || "#";
			const isExternal = href.startsWith("http");

			if (isExternal) {
				return (
					<a
						href={href}
						target="_blank"
						rel="noreferrer"
						className="underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
					>
						{children}
					</a>
				);
			}

			return (
				<Link
					href={href}
					className="underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
				>
					{children}
				</Link>
			);
		},
	},
};