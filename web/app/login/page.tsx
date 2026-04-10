import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import Link from "next/link";

// Login page
// Lets the user sign in with Google

export default function LoginPage() {
	return (
		<main>
			<Section>
				<Container className="max-w-3xl!">
					<SectionHeading
						eyebrow="Authentication"
						title="Sign in to OlePress"
						description="Use Google sign-in to access your profile and demo premium settings."
						level="h1"
					/>

					<div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
						<GoogleSignInButton />

						<p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-400">
							By signing in, OlePress may store your name, email adress, profile, image,
							authentication identifier, and premium access setting for account and session
							functionality. Read the{" "}
							<Link
								href="/privacy"
								className="underline! decoration-white/30 underline-offset-4 transition hover:decoration-white!"
							>
								Cookie Policy
							</Link>
							.
						</p>
					</div>
				</Container>
			</Section>
		</main>
	);
}
