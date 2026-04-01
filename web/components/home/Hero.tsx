import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

// Hero component
// Introduces the site and gives the visitor clear entry points

export function Hero() {
	return (
		<Section className="py-24 sm:py-32">
			<Container>
				<div className="max-w-3xl">
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
						OleKoderNo presents
					</p>

					<h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
						OlePress
					</h1>

					<p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
						A newspaper-style portfolio where I write about frontend projects,
						development ideas, reviews, and personal interests.
					</p>

					<div className="mt-8 flex flex-wrap gap-4">
						<Button href="/projects">Explore projects</Button>
						<Button href="/about" className="bg-transparent">
							About OleKoderNo
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	);
}