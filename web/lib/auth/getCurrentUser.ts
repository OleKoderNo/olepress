import { cookies } from "next/headers";

import { adminAuth, adminDb } from "@/lib/firebase/admin";

// Current user helper
// Reads the Firebase session cookie and returns the user profile if available

export type CurrentUserProfile = {
	uid: string;
	email?: string;
	displayName?: string;
	photoURL?: string;
	premiumEnabled?: boolean;
};

export async function getCurrentUser(): Promise<CurrentUserProfile | null> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;

	if (!sessionCookie) {
		return null;
	}

	try {
		const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
		const doc = await adminDb.collection("users").doc(decoded.uid).get();
		const profile = doc.exists ? doc.data() : {};

		return {
			uid: decoded.uid,
			email: decoded.email,
			displayName: decoded.name,
			photoURL: decoded.picture,
			premiumEnabled: Boolean(profile?.premiumEnabled),
		};
	} catch {
		return null;
	}
}
