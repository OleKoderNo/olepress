import { groq } from "next-sanity";

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{
      title,
      slug
    },
    "author": author->{
      name
    }
  }
`;