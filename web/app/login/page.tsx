import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

// Login page
// Lets the user sign in with Google

export default function LoginPage() {
	return (
		<main>
			<Section>
				<Container className="max-w-3xl">
					<SectionHeading
						eyebrow="Authentication"
						title="Sign in to OlePress"
						description="Use Google sign-in to access your profile and demo premium settings."
						level="h1"
					/>

					<div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
						<GoogleSignInButton />
					</div>
				</Container>
			</Section>
		</main>
	);
}
