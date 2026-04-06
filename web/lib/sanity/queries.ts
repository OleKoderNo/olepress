import { groq } from "next-sanity";

// Sanity queries
// Stores reusable GROQ queries for homepage, category pages, article pages,
// related content, and featured homepage content

// Shared article fields
// Reused across multiple queries to keep the response shape consistent

const articleFields = groq`
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
`;

// Homepage latest articles query
// Fetches the latest non-featured articles for the landing page grid

export const articlesQuery = groq`
  *[
    _type == "article" &&
    (!defined(featured) || featured != true)
  ] | order(publishedAt desc)[0...6] {
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

// Homepage featured article query
// Fetches the newest featured article for the homepage spotlight section

export const featuredArticlesQuery = groq`
  *[
    _type == "article" &&
    featured == true
  ] | order(publishedAt desc)[0...1] {
    ${articleFields}
  }
`;

// Category articles query
// Fetches a paginated batch of articles for one category page

export const categoryArticlesQuery = groq`
  *[
    _type == "article" &&
    category->slug.current == $category
  ] | order(publishedAt desc)[$start...$end] {
    ${articleFields}
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
    ${articleFields}
  }
`;

// Related articles query
// Fetches 3 other articles from the same category excluding the current article

export const relatedArticlesQuery = groq`
  *[
    _type == "article" &&
    category->slug.current == $category &&
    slug.current != $slug
  ] | order(publishedAt desc)[0...3] {
    ${articleFields}
  }
`;
