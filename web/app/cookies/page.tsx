import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

// Cookie policy page
// Explains which cookies or similar storage technologies OlePress uses
export default function CookiePage() {
	return (
		<main>
			<Section>
				<Container className="max-w-4xl">
					<SectionHeading
						eyebrow="Legal"
						title="Cookie Policy"
						description="How OlePress uses cookies and similar storage technologies."
						level="h1"
					/>
					<div className="mt-10 space-y-8 text-base leading-8 text-neutral-300">
						<section>
							<h2 className="text-2xl font-semibold text-white">Essential cookies</h2>
							<p className="mt-3">
								OlePress uses essential cookies or similar storage machanism to keep users signed in
								and maintain secure account sessions. These are used for core funtionality and are
								required for the login system to work.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Authentication</h2>
							<p className="mt-3">
								When you sign in with Google, OlePress uses authentication-related session handling
								so your account stays active while you use the site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">No advertising cookies</h2>
							<p className="mt-3">
								OlePress do not use advertising cookies or third-party marketing cookies.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Analytics</h2>
							<p className="mt-3">
								At the moment, OlePress does not use analytics cookies for visitor tracking. If that
								changes later, this policy will be updated and any required consent flow will be
								added.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Changes</h2>
							<p className="mt-3">
								This policy may be updated if OlePress adds analytics, prefrences, or other optional
								cookie-based features in the future.
							</p>
						</section>
					</div>
				</Container>
			</Section>
		</main>
	);
}
