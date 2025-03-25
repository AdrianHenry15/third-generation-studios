"use client";

import { imageUrl } from "@/sanity/lib/image-url";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "@/sanity.types";
import { PortableText } from "@portabletext/react"; // ✅ Import PortableText

interface IPostCardProps {
    post: Post;
}

const PostCard = (props: IPostCardProps) => {
    const { post } = props;

    // Format the published date
    const publishedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(post.publishedAt!));

    return (
        <Link key={post._id} href={`/blog/${post.slug!.current || ""}`}>
            <div className="bg-white shadow-lg relative h-[475px] lg:h-[425px] rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105">
                {/* Post image */}
                {post.mainImage?.asset && (
                    <Image
                        src={imageUrl(post.mainImage.asset).url()}
                        alt={post.title || "Post Image"}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    {/* Post title */}
                    <h2 className="text-xl font-semibold">{post.title}</h2>

                    {/* Published date */}
                    <p className="text-sm text-gray-600 mt-2">{publishedDate}</p>

                    {/* Blog Categories */}
                    {post.blogCategories && post.blogCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-gray-600 text-sm mt-2">
                            {post.blogCategories.map((category: any) => (
                                <span key={category._id} className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
                                    {category.title}
                                </span>
                            ))}
                        </div>
                    )}
                    {/* Truncated excerpt using Portable Text */}
                    <div className="text-gray-700 mt-2 line-clamp-3">
                        <PortableText value={post.body || []} />
                    </div>

                    {/* Read more link */}
                    <p className="absolute bottom-4 left-4 font-semibold bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 text-transparent bg-clip-text">
                        Read More →
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
