import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { PremiumToggle } from "@/components/profile/PremiumToggle";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";

// Profile page
// Shows the signed-in user's profile and demo premium setting

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<main>
			<Section>
				<Container className="max-w-3xl">
					<SectionHeading
						eyebrow="Profile"
						title={user.displayName || "Your profile"}
						description={user.email || "Signed in user"}
						level="h1"
					/>

					<div className="mt-10 space-y-6">
						<PremiumToggle initialValue={Boolean(user.premiumEnabled)} />

						<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
							<h2 className="text-lg font-semibold text-white">Account</h2>
							<p className="mt-3 text-sm leading-7 text-neutral-300">
								You are signed in with Google. This profile page is used to showcase user settings
								and premium access control.
							</p>

							<div className="mt-6">
								<SignOutButton />
							</div>
						</div>
					</div>
				</Container>
			</Section>
		</main>
	);
}
