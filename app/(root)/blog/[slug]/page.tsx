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
                <Image src={imageUrl(value.asset).url()} alt="post-image" width={800} height={500} className="w-full rounded-lg my-4" />
            ),
        },
        block: {
            h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
            normal: ({ children }) => <p className="text-gray-700 leading-relaxed">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">{children}</blockquote>
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
                <a href={value?.href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
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
        <div className="max-w-3xl mx-auto p-6">
            <BackButton title="Back to post" link="/blog" />

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            {/* Author Details */}
            <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Image src={authorImageUrl} alt={authorName} width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                <p>
                    By <span className="font-semibold">{authorName}</span> • {publishedDate}
                </p>
            </div>

            {/* Blog Categories */}
            {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 text-gray-600 text-sm mt-2">
                    {post.categories.map((category: any) => (
                        <span key={category._id} className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
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
                    className="w-full my-6 rounded-lg"
                />
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none text-gray-700 pb-10">
                <PortableText value={post.body || []} components={portableTextComponents} />
            </div>

            <BackButton title="Back to post" link="/post" />
        </div>
    );
}
