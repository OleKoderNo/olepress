import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

// Not found page
// Shown when a page or article does not exist

export default function NotFoundPage() {
	return (
		<main>
			<Section>
				<Container className="max-w-3xl">
					<div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
							404
						</p>

						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
							Page not found
						</h1>

						<p className="mt-6 text-lg leading-8 text-neutral-300">
							The page you are looking for does not exist, may have been moved, or has not been
							published yet.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/"
								className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
							>
								Go home
							</Link>

							<Link
								href="/projects"
								className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
							>
								Browse projects
							</Link>
						</div>
					</div>
				</Container>
			</Section>
		</main>
	);
}
