import { groq } from "next-sanity";

// Sanity queries
// Stores reusable GROQ queries for the frontend

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
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