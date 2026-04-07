import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

// Session API
// Exchanges a Firebase ID token for a secure httpOnly session cookie

export async function POST(request: NextRequest) {
	try {
		const { idToken } = await request.json();

		if (!idToken) {
			return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
		}

		const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

		const sessionCookie = await adminAuth.createSessionCookie(idToken, {
			expiresIn,
		});

		const decoded = await adminAuth.verifyIdToken(idToken);

		const userRef = adminDb.collection("users").doc(decoded.uid);
		const existing = await userRef.get();

		if (!existing.exists) {
			await userRef.set({
				email: decoded.email || "",
				displayName: decoded.name || "",
				photoURL: decoded.picture || "",
				premiumEnabled: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
		} else {
			await userRef.set(
				{
					email: decoded.email || "",
					displayName: decoded.name || "",
					photoURL: decoded.picture || "",
					updatedAt: new Date().toISOString(),
				},
				{ merge: true },
			);
		}

		const response = NextResponse.json({ ok: true });

		response.cookies.set({
			name: "session",
			value: sessionCookie,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: expiresIn / 1000,
		});

		return response;
	} catch (error) {
		console.error("SESSION ROUTE ERROR:", error);

		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Failed to create session",
			},
			{ status: 500 },
		);
	}
}
