import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogBySlug } from "@/sanity/lib/blogs/getBlogBySlug";
import { imageUrl } from "@/sanity/lib/image-url";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import UserDefaultImage from "@/public/assets/icons/user (1).png";
import BackButton from "@/app/(root)/components/back-button";

export default async function BlogPageBySlug({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    if (!slug) return notFound();

    const blog = await getBlogBySlug(slug);
    if (!blog) return notFound();

    const portableTextComponents: PortableTextComponents = {
        types: {
            image: ({ value }) => (
                <Image
                    src={imageUrl(value.asset).url()}
                    alt="Blog Image"
                    width={800}
                    height={500}
                    className="w-full rounded-lg my-4"
                />
            ),
        },
        block: {
            h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
            normal: ({ children }) => <p className="text-gray-700 leading-relaxed">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">
                    {children}
                </blockquote>
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
                <a
                    href={value?.href}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            ),
        },
    };

    const authorImageUrl = blog.author?.image
        ? imageUrl(blog.author.image).url()
        : UserDefaultImage;
    const authorName = blog.author?.name || "Unknown Author";
    const publishedDate = blog.publishedAt
        ? new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          }).format(new Date(blog.publishedAt))
        : "Unknown Date";

    return (
        <div className="max-w-3xl mx-auto p-6">
            <BackButton title="Back to Blog" link="/blog" />

            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Image
                    src={authorImageUrl}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="rounded-full w-6 h-6 object-cover"
                />
                <p>
                    By <span className="font-semibold">{authorName}</span> • {publishedDate}
                </p>
            </div>

            {blog.mainImage?.asset && (
                <Image
                    src={imageUrl(blog.mainImage.asset).url()}
                    alt={blog.title || "Blog Image"}
                    width={800}
                    height={400}
                    className="w-full my-6 rounded-lg"
                />
            )}

            <div className="prose prose-lg max-w-none text-gray-700 pb-10">
                <PortableText value={blog.body || []} components={portableTextComponents} />
            </div>

            <BackButton title="Back to Blog" link="/blog" />
        </div>
    );
}
