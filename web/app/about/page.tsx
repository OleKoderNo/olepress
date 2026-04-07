import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/home/SectionHeading";

// About page
// Presents background, work experience, values, and the thinking behind OlePress

const workExperience = [
	{
		company: "Skavl Media AS",
		role: "Intern",
		date: "20.03.24 – 28.06.24",
		summary: "Worked on updating and standardising the Midtsiden.no codebase.",
		details:
			"I updated and standardised the codebase for Midtsiden.no using tools such as Next.js, TypeScript, Tailwind, and Copilot. The work was done independently and supported through code reviews, which gave me useful experience with structured frontend workflows and maintaining an existing codebase.",
	},
	{
		company: "Kodeverket Bergen",
		role: "Intern / Tech-lead",
		date: "28.10.22 – 31.05.23",
		summary: "Worked in a startup environment with both static and dynamic websites.",
		details:
			"I worked in a startup environment building both static and dynamic websites with CMS solutions. My responsibilities included bug fixing, code reviews, code structure, and creating learning tasks for other practice candidates. This gave me early experience with both technical responsibility and helping others learn.",
	},
	{
		company: "Bjørnafjorden Næringsråd",
		role: "Intern",
		date: "20.09.22 – 31.10.22",
		summary: "Redesigned their website using Wix.",
		details:
			"I redesigned their website in Wix and gained a stronger understanding of no-code frameworks, content structure, and how visual layout decisions affect usability and presentation.",
	},
	{
		company: "Octaos",
		role: "Intern",
		date: "20.06.22 – 20.09.22",
		summary: "Developed a customer overview with React, Google Maps integration, and Firebase.",
		details:
			"I worked on a customer overview using ReactJS, Google Maps integration, and Firebase. This gave me valuable practical experience with JavaScript, component-based UI thinking, and integrating external services into a working frontend solution.",
	},
];

export default function AboutPage() {
	return (
		<main>
			{/* Intro section */}
			<Section>
				<Container className="max-w-5xl">
					<SectionHeading
						eyebrow="About me"
						title="Frontend developer focused on structure, accessibility, and readable code"
						description="I’m Ole Håvard Furuseth Bergan, a frontend developer from Bergen, Norway. OlePress is my portfolio and publication space, where I document projects, technical ideas, and the thinking behind the work I build."
						level="h1"
					/>
				</Container>
			</Section>

			{/* Professional background section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="background-heading">
						<h2
							id="background-heading"
							className="text-2xl font-semibold tracking-tight text-white"
						>
							Professional background
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								I work in frontend development and have built experience through education, practice
								placements, and project work. My background includes HTML, CSS, JavaScript,
								TypeScript, React, Next.js, Tailwind, Sanity, Firebase, and API integration.
							</p>

							<p>
								I care about building interfaces that are clear, maintainable, and accessible. I am
								especially interested in the relationship between frontend structure, usability, and
								the long-term quality of a codebase.
							</p>
						</div>
					</section>
				</Container>
			</Section>

			{/* Work experience section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-5xl">
					<section aria-labelledby="experience-heading">
						<h2
							id="experience-heading"
							className="text-2xl font-semibold tracking-tight text-white"
						>
							Work experience
						</h2>

						<div className="mt-8 grid gap-6">
							{workExperience.map((job) => (
								<article
									key={`${job.company}-${job.date}`}
									className="rounded-2xl border border-white/10 bg-white/5 p-6"
								>
									<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
										<div>
											<h3 className="text-xl font-semibold text-white">{job.company}</h3>

											<p className="mt-1 text-sm text-neutral-400">{job.role}</p>
										</div>

										<p className="text-sm text-neutral-400">{job.date}</p>
									</div>

									<p className="mt-4 text-base leading-8 text-neutral-300">{job.summary}</p>

									<details className="group mt-4">
										<summary className="cursor-pointer list-none text-sm font-medium text-white transition hover:text-neutral-300">
											<span className="group-open:hidden">Read more</span>
											<span className="hidden group-open:inline">Read less</span>
										</summary>

										<p className="mt-4 text-base leading-8 text-neutral-300">{job.details}</p>
									</details>
								</article>
							))}
						</div>
					</section>
				</Container>
			</Section>

			{/* Qualifications section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="qualifications-heading">
						<h2
							id="qualifications-heading"
							className="text-2xl font-semibold tracking-tight text-white"
						>
							Qualifications
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								My development path has been shaped by both formal learning and practical work. I
								have completed the AMO course Kodehode and continue building my frontend foundation
								through structured learning and hands-on projects.
							</p>

							<p>
								I also have training in universal design through a course in universell utforming av
								IKT for developers and test leaders based on WCAG 2.1. Accessibility is something I
								take seriously, and it continues to shape how I think about frontend work.
							</p>
						</div>
					</section>
				</Container>
			</Section>

			{/* Focus areas section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-5xl">
					<section aria-labelledby="focus-heading">
						<h2 id="focus-heading" className="text-2xl font-semibold tracking-tight text-white">
							What I focus on
						</h2>

						<div className="mt-8 grid gap-6 md:grid-cols-2">
							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Readable code</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I like building projects with naming, structure, and reusable components that make
									the codebase easier to understand and maintain over time.
								</p>
							</article>

							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Accessibility</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I care about making interfaces more usable and inclusive. I try to think about
									accessibility early, not as something added at the end.
								</p>
							</article>

							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Reusable systems</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I enjoy creating reusable UI patterns, content structures, and component systems
									that make projects easier to scale and iterate on.
								</p>
							</article>

							<article className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h3 className="text-xl font-semibold text-white">Editorial presentation</h3>

								<p className="mt-3 text-base leading-8 text-neutral-300">
									I want to present projects in a way that explains the work, the reasoning, and the
									process behind them, not only the final result.
								</p>
							</article>
						</div>
					</section>
				</Container>
			</Section>

			{/* Outside work section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="outside-heading">
						<h2 id="outside-heading" className="text-2xl font-semibold tracking-tight text-white">
							Outside work
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								Outside development, volunteering has been an important part of my life for several
								years. It has given me experience with responsibility, communication, cooperation,
								and contributing to something larger than myself.
							</p>

							<p>
								I also enjoy traveling and use games mainly as a way to relax and disconnect in my
								free time. For me, that is personal recreation rather than part of my professional
								identity.
							</p>
						</div>
					</section>
				</Container>
			</Section>

			{/* OlePress section */}
			<Section className="border-t border-white/10">
				<Container className="max-w-4xl">
					<section aria-labelledby="olepress-heading">
						<h2 id="olepress-heading" className="text-2xl font-semibold tracking-tight text-white">
							Why I built OlePress
						</h2>

						<div className="mt-6 space-y-6 text-lg leading-9 text-neutral-200">
							<p>
								I did not want a portfolio that only listed projects and links. I wanted a space
								where I could show both the work itself and the thinking behind it.
							</p>

							<p>
								OlePress is my way of combining a portfolio with a more editorial format. It gives
								me room to document projects, explain technical choices, write reflections, and
								present my work in a way that feels more complete than a traditional portfolio page.
							</p>
						</div>
					</section>
				</Container>
			</Section>
		</main>
	);
}
