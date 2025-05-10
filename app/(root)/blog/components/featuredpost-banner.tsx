"use client";

import { imageUrl } from "@/sanity/lib/image-url";
import { Post } from "@/sanity.types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeaturedPostBannerProps {
  post: Post;
}

const FeaturedPostBanner = ({ post }: FeaturedPostBannerProps) => {
  // Format the published date
  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.publishedAt))
    : "Unknown date";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur"
    >
      <Link href={`/blog/${post.slug?.current || ""}`}>
        <div className="relative flex flex-col md:flex-row md:items-center overflow-hidden">
          {/* Image Side */}
          <div className="w-full md:w-1/2 md:h-auto relative aspect-video md:aspect-auto overflow-hidden">
            {post.mainImage?.asset ? (
              <Image
                src={imageUrl(post.mainImage.asset).url()}
                alt={post.title || "Featured Post"}
                width={800}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <span className="text-white text-2xl font-medium">Featured Post</span>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-900/90 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent md:hidden" />
          </div>

          {/* Content Side */}
          <div className="relative w-full md:w-1/2 p-6 md:p-10">
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block px-3 py-1 bg-blue-600/80 text-white text-xs font-semibold rounded-full mb-4">
                Featured Post
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              {post.title}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants} 
              className="text-gray-300 mb-6 line-clamp-3"
            >
              {post._updatedAt || "Check out our latest featured article exploring cutting-edge insights and developments."}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex items-center text-gray-300 text-sm mb-6">
              <span className="mr-4">{publishedDate}</span>
              
              {post.blogCategories && post.blogCategories.length > 0 && (
                <div className="flex gap-2">
                  {post.blogCategories.map((category: any) => (
                    <span 
                      key={category._id} 
                      className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-md"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow">
                Read Article
                <svg 
                  className="ml-2 w-5 h-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedPostBanner;