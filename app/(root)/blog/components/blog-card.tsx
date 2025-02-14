import { Blog } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/image-url";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserDefaultImage from "@/public/assets/icons/user (1).png"; // Make sure to import the default image

interface IBlogCardProps {
    blog: Blog;
}

const BlogCard = (props: IBlogCardProps) => {
    const { blog } = props;

    // Handle author image and name with fallback options
    // const authorImageUrl = blog.author!._ref ? imageUrl(blog.author!._ref).url() : UserDefaultImage; // Use default image if no image exists
    // const authorName = blog.author!._ref || "Unknown Author";

    // Format the published date
    const publishedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(blog.publishedAt!));

    // Truncate the excerpt for a cleaner look
    const truncatedExcerpt =
        blog.excerpt!.length > 100 ? `${blog.excerpt!.slice(0, 100)}...` : blog.excerpt;

    return (
        <Link key={blog._id} href={`/blog/${blog.slug?.current || ""}`}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105">
                {/* Blog image */}
                <Image
                    src={blog.mainImage?.asset ? imageUrl(blog.mainImage.asset).url() : ""}
                    alt={blog.title || "Blog Image"}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    {/* Blog title */}
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    {/* Author and published date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        {/* <Image
                            src={authorImageUrl}
                            alt={authorName}
                            width={24}
                            height={24}
                            className="rounded-full"
                        /> */}
                        <span className="flex flex-col">
                            {/* <p>{authorName}</p> */}
                            <p className="">{publishedDate}</p>
                        </span>
                    </div>
                    {/* Truncated excerpt */}
                    <p className="text-gray-700 mt-2">{truncatedExcerpt}</p>
                    {/* Read more link */}
                    <p className="text-blue-500 mt-2 font-semibold">Read More →</p>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
