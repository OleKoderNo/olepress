import { defineField, defineType } from "sanity";

export const articleType = defineType({
	name: "article",
	title: "Article",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required().min(5).max(120),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			rows: 3,
			validation: (rule) => rule.max(220),
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "array",
			of: [{ type: "block" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "author" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "isPremium",
			title: "Premium article",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "isProject",
			title: "Project article",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "category.title",
			media: "mainImage",
		},
		prepare({ title, subtitle, media }) {
			return {
				title,
				subtitle: subtitle ? `Category: ${subtitle}` : "No category",
				media,
			};
		},
	},
});