"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { WebsiteType } from "@/lib/types";
import OpenLinkModal from "@/components/modals/open-link-modal";
import Logo from "@/public/logos/tgs-logo.png";

interface IWebsiteRowItemProps {
  currentWebsite: WebsiteType;
}

export default function WebsiteRowItem({ currentWebsite }: IWebsiteRowItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardVariants = {
    hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" },
  };

  return (
    <>
      <motion.div
        className="relative flex flex-col w-full bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
        variants={cardVariants}
        whileHover="hover"
        initial="rest"
        animate="rest"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
          <Image
            src={currentWebsite.img}
            alt={currentWebsite.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 p-1 rounded-full">
            <Image src={Logo} alt="logo" width={24} height={24} />
          </div>
        </div>

        {/* Title */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 truncate">
            {currentWebsite.title}
          </h3>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <OpenLinkModal
          isOpen={true}
          closeModal={() => setIsModalOpen(false)}
          title={currentWebsite.title}
          link={currentWebsite.link}
        />
      )}
    </>
  );
}
