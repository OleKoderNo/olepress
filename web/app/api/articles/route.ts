import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { categoryArticlesQuery } from "@/lib/sanity/queries";
import type { ArticlePreview } from "@/lib/types";

// Articles API route
// Returns paginated articles for one category

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const category = searchParams.get("category");
	const offset = Number(searchParams.get("offset") || "0");
	const limit = Number(searchParams.get("limit") || "9");

	if (!category) {
		return NextResponse.json({ error: "Missing category parameter" }, { status: 400 });
	}

	const articles = await client.fetch<ArticlePreview[]>(categoryArticlesQuery, {
		category,
		start: offset,
		end: offset + limit,
	});

	return NextResponse.json(articles);
}
