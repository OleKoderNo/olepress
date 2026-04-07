"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth, googleProvider } from "@/lib/firebase/client";

// Google sign-in button
// Signs in with Google, then exchanges the ID token for a server session

export function GoogleSignInButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	async function handleSignIn() {
		setIsLoading(true);

		try {
			const result = await signInWithPopup(auth, googleProvider);
			const idToken = await result.user.getIdToken();

			const response = await fetch("/api/auth/session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ idToken }),
			});

			if (!response.ok) {
				throw new Error("Failed to create session");
			}

			router.push("/profile");
			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<button
			type="button"
			onClick={handleSignIn}
			disabled={isLoading}
			className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-60"
		>
			{isLoading ? "Signing in..." : "Continue with Google"}
		</button>
	);
}
