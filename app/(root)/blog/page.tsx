import { Metadata } from "next";
import { getAllPosts } from "@/sanity/lib/blog/posts/getAllPosts";
import { Post } from "@/sanity.types";
import PostCard from "./components/post-card";

export const metadata: Metadata = {
  title: "Third Generation Studios Blog | Web Development & Music Production Insights",
  description:
    "Stay informed with the latest tips, news, and updates from Third Generation Studios. Learn about web development, music production, and creative industry trends.",
  openGraph: {
    title: "Third Generation Studios Blog",
    description:
      "Stay informed with the latest tips, news, and updates from Third Generation Studios on web development and music production.",
    url: "https://thirdgenerationstudios.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Third Generation Studios Blog",
    description:
      "Stay informed with the latest tips, news, and updates from Third Generation Studios on web development and music production.",
  },
};

export default async function BlogPage() {
  const posts: Post[] = await getAllPosts();

  if (!posts) return null;

  const webDevPosts = posts.filter((post: any) => post.blogCategories![0].title === "Web Development");

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Latest Blog Posts</h1>
          <p className="text-green-100 max-w-2xl mx-auto text-lg">
            Insights, tutorials, and updates from Third Generation Studios on web development, design, and creative technologies.
          </p>
        </div>

        {webDevPosts.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center mb-8">
              <div className="h-1 w-12 bg-white rounded mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Web Development</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {webDevPosts.map((post: Post, index: number) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}