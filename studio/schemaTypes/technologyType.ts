import { defineField, defineType } from "sanity";

export const technologyType = defineType({
	name: "technology",
	title: "Technology",
	type: "document",

	fields: [
		defineField({
			name: "title",
			title: "Technology name",
			type: "string",
			description: "Example: Next.js, TypeScript, Tailwind",
			validation: (rule) => rule.required().min(2).max(50),
		}),

		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "Used for filtering and routing later",
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
			description: "Your experience level from 1 (basic) to 5 (expert)",
			options: {
				list: [
					{ title: "1 / 5 — Basic familiarity", value: 1 },
					{ title: "2 / 5 — Beginner working knowledge", value: 2 },
					{ title: "3 / 5 — Comfortable production usage", value: 3 },
					{ title: "4 / 5 — Strong professional experience", value: 4 },
					{ title: "5 / 5 — Expert level", value: 5 },
				],
				layout: "radio",
			},
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: "category",
			title: "Technology category",
			type: "string",
			description: "Optional grouping (Frontend, Backend, DevOps, CMS, etc.)",
			options: {
				list: [
					{ title: "Frontend", value: "frontend" },
					{ title: "Backend", value: "backend" },
					{ title: "Styling", value: "styling" },
					{ title: "CMS", value: "cms" },
					{ title: "Database", value: "database" },
					{ title: "DevOps", value: "devops" },
					{ title: "Tooling", value: "tooling" },
					{ title: "Accessibility", value: "accessibility" },
				],
				layout: "dropdown",
			},
		}),

		defineField({
			name: "featured",
			title: "Featured technology",
			type: "boolean",
			description:
				"Enable if this should appear in homepage skill highlights",
			initialValue: false,
		}),

		defineField({
			name: "orderRank",
			title: "Display order",
			type: "number",
			description:
				"Lower numbers appear first when listing technologies",
			initialValue: 100,
		}),
	],

	orderings: [
		{
			title: "Skill level (highest first)",
			name: "skillDesc",
			by: [{ field: "skillLevel", direction: "desc" }],
		},
		{
			title: "Manual order",
			name: "manualOrder",
			by: [{ field: "orderRank", direction: "asc" }],
		},
	],

	preview: {
		select: {
			title: "title",
			skillLevel: "skillLevel",
			category: "category",
		},

		prepare({ title, skillLevel, category }) {
			return {
				title,
				subtitle: `${category ?? "General"} • Skill: ${skillLevel}/5`,
			};
		},
	},
});