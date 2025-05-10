import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import UserDefaultImage from "@/public/user-default-image.png";
import { imageUrl } from "@/sanity/lib/image-url";
import BackButton from "@/components/back-button";
import { getPostBySlug } from "@/sanity/lib/blog/posts/getPostBySlug";

export default async function PostPageBySlug({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    if (!slug) return notFound();

    const post = await getPostBySlug(slug);
    if (!post) return notFound();

    const portableTextComponents: PortableTextComponents = {
        types: {
            image: ({ value }) => (
                <Image
                    src={imageUrl(value.asset).url()}
                    alt="Post image"
                    width={800}
                    height={500}
                    className="w-full h-auto rounded-lg my-4 sm:my-6"
                />
            ),
        },
        block: {
            h1: ({ children }) => <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 sm:my-6">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold my-3 sm:my-5">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg sm:text-xl md:text-2xl font-semibold my-2 sm:my-4">{children}</h3>,
            normal: ({ children }) => <p className="leading-relaxed text-sm sm:text-base">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-green-500 pl-3 sm:pl-4 italic my-4 sm:my-6 text-sm sm:text-base">{children}</blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => <ul className="list-disc pl-4 sm:pl-6 my-2 sm:my-4">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal pl-4 sm:pl-6 my-2 sm:my-4">{children}</ol>,
        },
        marks: {
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ value, children }) => (
                <a
                    href={value?.href}
                    className="text-yellow-400 underline hover:text-yellow-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
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
            <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
                <BackButton title="Back to Blog" link="/blog" />

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{post.title}</h1>

                {/* Author Details */}
                <div className="flex items-center gap-3 sm:gap-4 text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    <Image
                        src={authorImageUrl}
                        alt={authorName}
                        width={36}
                        height={36}
                        className="rounded-full w-9 h-9 sm:w-10 sm:h-10 object-cover"
                    />
                    <p className="flex-1">
                        By <span className="font-semibold text-white">{authorName}</span> • {publishedDate}
                    </p>
                </div>

                {/* Blog Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm mb-4 sm:mb-6">
                        {post.categories.map((category: any) => (
                            <span
                                key={category._id}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium bg-green-500 text-white rounded-full"
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
                        alt={`Featured image for ${post.title}`}
                        width={800}
                        height={400}
                        className="w-full h-auto max-h-64 sm:max-h-80 object-cover rounded-lg shadow-lg my-4 sm:my-6"
                    />
                )}

                {/* Post Content */}
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none pb-6 sm:pb-10">
                    <PortableText value={post.body || []} components={portableTextComponents} />
                </div>

                <BackButton title="Back to Blog" link="/blog" />
            </div>
        </div>
    );
}