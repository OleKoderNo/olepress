import { Suspense } from "react";

import { SearchResults } from "@/components/search/SearchResults";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

import { client } from "@/lib/sanity/client";
import { searchArticlesQuery } from "@/lib/sanity/queries";
import type { ArticlePreview } from "@/lib/types";

// Search page
// Loads article metadata from Sanity and passes it to the client-side search UI

export default async function SearchPage() {
	const articles = await client.fetch<ArticlePreview[]>(searchArticlesQuery);

	return (
		<main>
			<Section>
				<Container>
					<SectionHeading
						eyebrow="Search"
						title="Search OlePress"
						description="Search across article titles, excerpts, categories, and technologies."
						level="h1"
					/>

					<div className="mt-10">
						<Suspense fallback={<p className="text-neutral-400">Loading search…</p>}>
							<SearchResults articles={articles} />
						</Suspense>
					</div>
				</Container>
			</Section>
		</main>
	);
}
