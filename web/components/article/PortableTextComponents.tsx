import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";

// Portable text components
// Adds custom styling for headings, paragraphs, lists, links,
// inline code, and Sanity code blocks in article content

export const portableTextComponents: PortableTextComponents = {
	block: {
		// Standard paragraph styling for article body text
		normal: ({ children }) => <p className="mb-6 text-lg leading-9 text-neutral-200">{children}</p>,

		// Main heading styles used inside Portable Text content
		h1: ({ children }) => (
			<h1 className="mb-6 mt-12 text-4xl font-bold tracking-tight text-white">{children}</h1>
		),

		h2: ({ children }) => (
			<h2 className="mb-4 mt-12 text-3xl font-semibold tracking-tight text-white">{children}</h2>
		),

		h3: ({ children }) => (
			<h3 className="mb-4 mt-10 text-2xl font-semibold text-white">{children}</h3>
		),

		h4: ({ children }) => (
			<h4 className="mb-3 mt-8 text-xl font-semibold text-white">{children}</h4>
		),

		// Blockquote styling for highlighted quoted content
		blockquote: ({ children }) => (
			<blockquote className="my-8 border-l-4 border-white/20 pl-6 italic text-neutral-300">
				{children}
			</blockquote>
		),
	},

	list: {
		// Unordered list styling
		bullet: ({ children }) => (
			<ul className="mb-6 ml-6 list-disc space-y-3 text-lg leading-9 text-neutral-200">
				{children}
			</ul>
		),

		// Ordered list styling
		number: ({ children }) => (
			<ol className="mb-6 ml-6 list-decimal space-y-3 text-lg leading-9 text-neutral-200">
				{children}
			</ol>
		),
	},

	listItem: {
		// Individual bullet list item
		bullet: ({ children }) => <li>{children}</li>,

		// Individual numbered list item
		number: ({ children }) => <li>{children}</li>,
	},

	types: {
		// Sanity code block styling
		// Used when content is inserted as a "code" block in the editor
		code: ({ value }) => (
			<pre className="my-8 overflow-x-auto rounded-xl border border-white/10 bg-neutral-900 px-5 py-4 text-sm leading-7">
				<code className="font-mono text-sky-400">{value.code}</code>
			</pre>
		),
	},

	marks: {
		// Bold text styling
		strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,

		// Italic text styling
		em: ({ children }) => <em className="italic">{children}</em>,

		// Inline code styling
		// Used for smaller code snippets inside paragraphs
		code: ({ children }) => (
			<code className="rounded-lg border border-white/10 bg-neutral-800 px-3 py-1 font-mono text-sm text-sky-400">
				{children}
			</code>
		),

		// Link styling
		// Handles both internal Next.js links and external links
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
