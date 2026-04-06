import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

// About page
// Introduces Ole Håvard, explains OlePress, and presents background,
// values, and interests in a semantic page structure

export default function AboutPage() {
	return (
		<main>
			{/* Page introduction */}
			<Section>
				<Container className="max-w-4xl">
					<header className="max-w-3xl">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
							About me
						</p>

						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
							Ole Håvard Furuseth Bergan
						</h1>

						<p className="mt-6 text-lg leading-8 text-neutral-300">
							I am a frontend developer from Bergen, Norway, with a strong interest in accessible
							interfaces, readable code, and structured component-based development.
						</p>
					</header>
				</Container>
			</Section>

			{/* Background section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="background-heading">
						<h2
							id="background-heading"
							className="text-2xl font-semibold tracking-tight text-white"
						>
							Background
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								I started coding in January 2022 and quickly became interested in frontend
								development and how good structure can improve both user experience and
								maintainability. Since then, I have worked on a range of projects, from smaller
								browser-based tools to more structured applications using technologies such as
								Next.js, React, TypeScript, Tailwind CSS, and Sanity.
							</p>

							<p>
								In 2025, I started studying Frontend Development at Noroff to continue strengthening
								my technical foundation and to develop a deeper understanding of modern web
								development.
							</p>

							<p>
								I care about building interfaces that are clear, accessible, and easy to understand.
								I also value code that is readable for other developers, because good frontend work
								is not only about how a product looks, but also about how well it can be maintained
								and improved over time.
							</p>
						</div>
					</section>
				</Container>
			</Section>

			{/* Focus section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="focus-heading">
						<h2 id="focus-heading" className="text-2xl font-semibold tracking-tight text-white">
							What I focus on
						</h2>

						<div className="mt-8 grid gap-6 md:grid-cols-2">
							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Readable code</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I like building projects with clear naming, reusable components, and a structure
									that makes the codebase easier to read and work with.
								</p>
							</article>

							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Accessibility</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I care about making interfaces more usable and inclusive, and I try to approach
									frontend work with accessibility in mind from the beginning.
								</p>
							</article>

							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Reusable systems</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I enjoy creating reusable UI patterns and components that make a project more
									consistent and easier to scale.
								</p>
							</article>

							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Presentation and structure</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I like presenting projects in a way that explains both the result and the thinking
									behind the work, not just the finished interface.
								</p>
							</article>
						</div>
					</section>
				</Container>
			</Section>

			{/* Personal section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="personal-heading">
						<h2 id="personal-heading" className="text-2xl font-semibold tracking-tight text-white">
							Outside development
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								Outside coding, I enjoy traveling and volunteering. Traveling is an important
								personal interest for me and gives me the chance to experience new places, cultures,
								and perspectives.
							</p>

							<p>
								Volunteering has also been a meaningful part of my life for years. It has given me
								experience with responsibility, cooperation, and contributing to something larger
								than myself.
							</p>

							<p>
								I also play video games in my free time, mostly as a way to relax, disconnect, and
								take a break from stress.
							</p>
						</div>
					</section>
				</Container>
			</Section>

			{/* About OlePress section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="olepress-heading">
						<h2 id="olepress-heading" className="text-2xl font-semibold tracking-tight text-white">
							Why I built OlePress
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								I did not want a portfolio that only listed projects and links. I wanted a space
								where I could present work, explain decisions, and show more of the thinking behind
								what I build.
							</p>

							<p>
								OlePress is my way of combining portfolio work with a more editorial format. It
								gives me room to write about projects, process, interests, and ideas in a way that
								feels more personal and complete than a traditional portfolio page.
							</p>
						</div>
					</section>
				</Container>
			</Section>
		</main>
	);
}
