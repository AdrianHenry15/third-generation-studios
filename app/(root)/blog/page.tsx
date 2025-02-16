// import { getAllBlogs } from "@/sanity/lib/blogs/getAllBlogs";
import { getAllPosts } from "@/sanity/lib/posts/getAllPosts";
import BlogCard from "./components/blog-card";
import { Metadata } from "next";

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
    const blogs = await getAllPosts();

    if (!blogs) {
        return;
    }

    if (blogs.length < 1) {
        return <div className="py-48 flex h-screen bg-black text-white items-center justify-center">No blogs posted.</div>;
    }

    return (
        <div className="mx-auto p-6 h-full lg:h-screen w-full bg-gradient-to-b from-blue-500 bg-white">
            <h1 className="text-3xl font-bold text-center mb-6">Latest Blog Posts</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog: any) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
