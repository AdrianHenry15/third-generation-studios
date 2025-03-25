import { Metadata } from "next";
import PostCard from "./components/post-card";
import { getAllPosts } from "@/sanity/lib/blog/posts/getAllPosts";
import { Post } from "@/sanity.types";

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

    if (!posts) return;

    const webDevPosts = posts.filter((post: any) => post.blogCategories![0].title === "Web Development");
    const musicPosts = posts.filter((post: any) => post.blogCategories![0].title === "Music Production");

    return (
        <div className="mx-auto p-6 h-full w-full bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 bg-white">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Latest Blog Posts</h1>

            {/* Web Development Section */}
            {webDevPosts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">Web Development</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {webDevPosts.map((post: any) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </section>
            )}

            {/* Music Production Section */}
            {musicPosts.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">Music Production</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {musicPosts.map((post: any) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </section>
            )}

            {/* No Posts Message */}
            {webDevPosts.length < 1 && musicPosts.length < 1 && (
                <div className="py-48 flex h-screen bg-black text-white items-center justify-center">No posts posted.</div>
            )}
        </div>
    );
}
