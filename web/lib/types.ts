import type { Image as SanityImage, PortableTextBlock } from "sanity";

// Shared frontend types
// Keeps Sanity data types consistent across pages and components

export type Technology = {
	_id: string;
	title: string;
	slug?: string;
	skillLevel?: number;
};

export type ArticleCategory = {
	title?: string;
	slug?: string;
};

export type ArticleAuthor = {
	name?: string;
};

export type ArticlePreview = {
	_id: string;
	title: string;
	excerpt?: string;
	body?: PortableTextBlock[];
	mainImage?: SanityImage;
	slug?: string;
	category?: ArticleCategory;
	author?: ArticleAuthor;
	technologies?: Technology[];
	isProject?: boolean;
	isPremium?: boolean;
	githubUrl?: string;
	liveUrl?: string;
	publishedAt?: string;
};

export type CategoryMeta = {
	title: string;
	description?: string;
	slug: string;
};
