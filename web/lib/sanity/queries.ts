import { groq } from "next-sanity";

// Sanity queries
// Fetches latest homepage articles including image, category, and technologies

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    isProject,
    isPremium,
    githubUrl,
    liveUrl,

    "category": category->{
      title,
      slug
    },

    "author": author->{
      name
    },

    "technologies": technologies[]->{
      _id,
      title,
      slug,
      skillLevel
    }
  }
`;