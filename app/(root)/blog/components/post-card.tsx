"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/sanity/lib/image-url";
import { Post } from "@/sanity.types";

interface IPostCardProps {
  post: Post;
  index: number;
}

const PostCard = ({ post, index }: IPostCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
  };

  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
        new Date(post.publishedAt)
      )
    : "Unknown date";

  // Extract a 150-character preview from the first block of post.body
//   const excerpt = post.body?.[0]?.children?.[0]?.text?.substring(0, 150) + "..." || "No content available";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <Link href={`/blog/${post.slug?.current || ""}`} className="block h-full">
        <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col shadow-md border border-gray-700">
          <div className="relative">
            {post.mainImage?.asset ? (
              <Image
                src={imageUrl(post.mainImage.asset).url()}
                alt={post.title || "Post Image"}
                width={600}
                height={340}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-green-500 text-lg font-medium">Third Generation Studios</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <p className="text-xs text-green-100 font-medium">{publishedDate}</p>
            <h2 className="text-xl font-bold text-white mt-2 line-clamp-2">{post.title}</h2>
            {/* <p className="text-sm text-green-300 line-clamp-3 mt-3">{excerpt}</p> */}
            <motion.span
              className="mt-4 inline-flex items-center text-green-500 font-medium"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Read More
              <svg className="ml-1 w-4 h-4 fill-green-500" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                />
              </svg>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;