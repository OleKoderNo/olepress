import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/home/SectionHeading";
import Link from "next/link";

// Contact page
// Displays ways to reach Ole directly through email, LinkedIn, and GitHub

export default function ContactPage() {
	return (
		<main>
			<Section>
				<Container className="max-w-3xl">
					<SectionHeading
						eyebrow="Contact"
						title="Let’s get in touch"
						description="If you are interested in working together, have questions about a project, or just want to reach out, feel free to contact me through one of the channels below."
						level="h1"
					/>

					<div className="mt-10 space-y-6">
						{/* Email */}
						<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
							<h2 className="text-lg font-semibold text-white">Email</h2>

							<p className="mt-2 text-neutral-300">The easiest way to reach me is by email.</p>
							<p className="mt-2 text-sm text-neutral-400">
								I’m currently open to frontend opportunities.
							</p>

							<a
								href="mailto:ohfb96@gmail.com"
								className="mt-3 inline-block text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
							>
								ohfb96@gmail.com
							</a>
						</div>

						{/* LinkedIn */}
						<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
							<h2 className="text-lg font-semibold text-white">LinkedIn</h2>

							<p className="mt-2 text-neutral-300">
								You can also connect with me professionally on LinkedIn.
							</p>

							<Link
								href="https://www.linkedin.com/in/ole-h%C3%A5vard-furuseth-bergan-2a1209255/"
								target="_blank"
								className="mt-3 inline-block text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
							>
								View my LinkedIn profile
							</Link>
						</div>

						{/* GitHub */}
						<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
							<h2 className="text-lg font-semibold text-white">GitHub</h2>

							<p className="mt-2 text-neutral-300">
								If you want to explore my code and projects directly.
							</p>

							<Link
								href="https://github.com/OleKoderNo"
								target="_blank"
								className="mt-3 inline-block text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
							>
								GitHub.com/OleKoderNo
							</Link>
						</div>
					</div>
				</Container>
			</Section>
		</main>
	);
}
