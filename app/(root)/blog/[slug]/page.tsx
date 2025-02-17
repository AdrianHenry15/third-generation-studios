import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import UserDefaultImage from "@/public/user-default-image.png";
import { imageUrl } from "@/sanity/lib/image-url";
import { getPostBySlug } from "@/sanity/lib/posts/getPostBySlug";
import BackButton from "@/components/back-button";

export default async function PostPageBySlug({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    if (!slug) return notFound();

    const post = await getPostBySlug(slug);
    if (!post) return notFound();

    const portableTextComponents: PortableTextComponents = {
        types: {
            image: ({ value }) => (
                <Image src={imageUrl(value.asset).url()} alt="post-image" width={800} height={500} className="w-full rounded-lg my-6" />
            ),
        },
        block: {
            h1: ({ children }) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
            h2: ({ children }) => <h2 className="text-3xl font-semibold my-5">{children}</h2>,
            h3: ({ children }) => <h3 className="text-2xl font-semibold my-4">{children}</h3>,
            normal: ({ children }) => <p className="text-gray-300 leading-relaxed">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-6 text-gray-400">{children}</blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
        },
        marks: {
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ value, children }) => (
                <a href={value?.href} className="text-yellow-400 underline" target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            ),
        },
    };

    const authorImageUrl = post.author?.image ? imageUrl(post.author.image).url() : UserDefaultImage;
    const authorName = post.author?.name || "Unknown Author";
    const publishedDate = post.publishedAt
        ? new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          }).format(new Date(post.publishedAt))
        : "Unknown Date";

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 py-10">
                <BackButton title="Back to Blog" link="/blog" />

                <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

                {/* Author Details */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <Image src={authorImageUrl} alt={authorName} width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                    <p>
                        By <span className="font-semibold text-white">{authorName}</span> • {publishedDate}
                    </p>
                </div>

                {/* Blog Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-sm mb-6">
                        {post.categories.map((category: any) => (
                            <span
                                key={category._id}
                                className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full"
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>
                )}

                {/* Post Image */}
                {post.mainImageUrl && (
                    <Image
                        src={post.mainImageUrl}
                        alt={post.title || "post-Image"}
                        width={800}
                        height={400}
                        className="w-full my-6 rounded-lg shadow-lg"
                    />
                )}

                {/* Post Content */}
                <div className="prose prose-lg max-w-none text-gray-300 pb-10">
                    <PortableText value={post.body || []} components={portableTextComponents} />
                </div>

                <BackButton title="Back to Blog" link="/blog" />
            </div>
        </div>
    );
}
