import { client } from "../client";

// Updated query for fetching a single post by slug with author and category details
const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      _id,
      name
    },
    categories[]->{
      _id,
      title
    },
    body
}`;

export const getPostBySlug = async (slug: string) => {
    try {
        const post = await client.fetch(query, { slug });
        return post;
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
};
