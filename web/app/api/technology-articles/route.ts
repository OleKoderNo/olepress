import { NextRequest, NextResponse } from "next/server";

import { client } from "@/lib/sanity/client";
import { technologyArticlesQuery } from "@/lib/sanity/queries";
import type { ArticlePreview } from "@/lib/types";

// Technology articles API route
// Returns paginated articles for one technology archive page

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const slug = searchParams.get("slug");
	const offset = Number(searchParams.get("offset") || "0");
	const limit = Number(searchParams.get("limit") || "9");

	if (!slug) {
		return NextResponse.json({ error: "Missing technology slug parameter" }, { status: 400 });
	}

	const articles = await client.fetch<ArticlePreview[]>(technologyArticlesQuery, {
		slug,
		start: offset,
		end: offset + limit,
	});

	return NextResponse.json(articles);
}
