import { defineField, defineType } from "sanity";

export const technologyType = defineType({
	name: "technology",
	title: "Technology",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Name",
			type: "string",
			validation: (rule) => rule.required(),
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
			name: "skillLevel",
			title: "Skill level",
			type: "number",
			description: "Rate your experience from 1 (basic) to 5 (expert)",
			validation: (rule) => rule.required().min(1).max(5),
		}),

		defineField({
			name: "featured",
			title: "Featured on homepage",
			type: "boolean",
			initialValue: false,
		}),
	],

	preview: {
		select: {
			title: "title",
			skillLevel: "skillLevel",
		},
		prepare({ title, skillLevel }) {
			return {
				title,
				subtitle: `Skill level: ${skillLevel}/5`,
			};
		},
	},
});