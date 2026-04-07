import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { adminAuth, adminDb } from "@/lib/firebase/admin";

// Premium profile API
// Updates the current user's premiumEnabled setting

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get("session")?.value;

		if (!sessionCookie) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
		const { premiumEnabled } = await request.json();

		await adminDb
			.collection("users")
			.doc(decoded.uid)
			.set(
				{
					premiumEnabled: Boolean(premiumEnabled),
					updatedAt: new Date().toISOString(),
				},
				{ merge: true },
			);

		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json({ error: "Failed to update premium setting" }, { status: 500 });
	}
}
