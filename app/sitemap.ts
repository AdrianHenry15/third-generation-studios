import { getAllPosts } from "@/sanity/lib/blog/posts/getAllPosts";
import { MetadataRoute } from "next";
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: "https://thirdgenerationstudios.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: "https://thirdgenerationstudios.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: "https://thirdgenerationstudios.com/contact-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
        url: "https://thirdgenerationstudios.com/pricing",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9
    },
    {
        url: "https://thirdgenerationstudios.com/websites",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9
    },
    {
        url: "https://thirdgenerationstudios.com/blog",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8
    }
  ];

  const allPosts = await getAllPosts();

  const sitemap = [
    ...defaultPages,
    ...allPosts.map((e: any)=> ({
        url:`https://thirdgenerationstudios.com/blog/${e.slug}`,
        lastModified: e.publishedAt,
        changeFrequency: "daily",
        priority: 0.8,
    }))
  ];

  return sitemap;
}