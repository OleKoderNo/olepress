"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase/client";

// Sign out button
// Signs out client-side and clears the server session cookie

export function SignOutButton() {
	const router = useRouter();

	async function handleSignOut() {
		await signOut(auth);
		await fetch("/api/auth/logout", { method: "POST" });
		router.push("/");
		router.refresh();
	}

	return (
		<button
			type="button"
			onClick={handleSignOut}
			className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
		>
			Sign out
		</button>
	);
}
