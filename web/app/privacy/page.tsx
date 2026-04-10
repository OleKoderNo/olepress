import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

// Privacy policy page
// Explains how OlePRess processes personal data

export default function PrivacyPage() {
	return (
		<main>
			<Section>
				<Container className="max-w-4xl">
					<SectionHeading
						eyebrow="Legal"
						title="Privacy Policy"
						description="How OlePress collects, uses, and stores personal data."
						level="h1"
					/>

					<div className="mt-10 space-y-8 text-base leading-8 text-neutral-300">
						<section>
							<h2 className="text-2xl font-semibold text-white">Data controller</h2>
							<p className="mt-3">
								OlePress is operated by Ole Håvard Furuseth Bergan. If you have questions about
								privacy or data handling, you can use the contact page on this website.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Why this data us used</h2>
							<p className="mt-3">
								This data is used to provide login functionality, maintain your sessiom, store your
								user settings, and control access to premium articles in the OlePress demo system.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Lawful basis</h2>
							<p className="mt-3">
								OlePRess process personal data to provide requested account and session
								functionality, and to operate the platform in a secure and predictable way.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Retention</h2>
							<p className="mt-3">
								Account-related information is kept only as long as needed for the login and
								settings features of OlePress, unless deletion is requested or the project changes
								its functionality.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Your rights</h2>
							<p className="mt-3">
								You may request access, correction, or deletion of your personal data. You may also
								object to processing or request restriction where applicable.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-white">Changes</h2>
							<p className="mt-3">
								This policy may be updated if OlePRess changes how authentication, user accounts, or
								related functionality work.
							</p>
						</section>
					</div>
				</Container>
			</Section>
		</main>
	);
}
