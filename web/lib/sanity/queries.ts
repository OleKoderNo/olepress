import { groq } from "next-sanity";

// Sanity queries
// Stores reusable GROQ queries for homepage, category pages, and article pages

// Homepage query
// Fetches the latest articles for the landing page

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    isProject,
    isPremium,
    githubUrl,
    liveUrl,
    "category": category->{
      title,
      "slug": slug.current
    },
    "author": author->{
      name
    },
    "technologies": technologies[]->{
      _id,
      title,
      "slug": slug.current,
      skillLevel
    }
  }
`;

// Category articles query
// Fetches a paginated batch of articles for one category page

export const categoryArticlesQuery = groq`
  *[
    _type == "article" &&
    category->slug.current == $category
  ] | order(publishedAt desc)[$start...$end] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    isProject,
    isPremium,
    githubUrl,
    liveUrl,
    "category": category->{
      title,
      "slug": slug.current
    },
    "author": author->{
      name
    },
    "technologies": technologies[]->{
      _id,
      title,
      "slug": slug.current,
      skillLevel
    }
  }
`;

// Category metadata query
// Fetches the title and description for a single category page

export const categoryMetaQuery = groq`
  *[
    _type == "category" &&
    slug.current == $category
  ][0]{
    title,
    description,
    "slug": slug.current
  }
`;

// Category article count query
// Counts how many articles exist in one category

export const categoryArticleCountQuery = groq`
  count(
    *[
      _type == "article" &&
      category->slug.current == $category
    ]
  )
`;

// Single article query
// Fetches one article using both category slug and article slug

export const articleByCategoryAndSlugQuery = groq`
  *[
    _type == "article" &&
    slug.current == $slug &&
    category->slug.current == $category
  ][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    mainImage,
    publishedAt,
    isProject,
    isPremium,
    githubUrl,
    liveUrl,
    "category": category->{
      title,
      "slug": slug.current
    },
    "author": author->{
      name
    },
    "technologies": technologies[]->{
      _id,
      title,
      "slug": slug.current,
      skillLevel
    }
  }
`;