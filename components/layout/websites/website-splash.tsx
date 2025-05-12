"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import { ClientWebsites } from "@/lib/websites";
import Logo from "@/public/logos/tgs-logo.png";

import "swiper/css";

export default function WebsiteSplash() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full text-white relative">
      <Swiper
        modules={[A11y, Autoplay]}
        centeredSlides
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        className="w-full"
      >
        {ClientWebsites.map((site) => (
          <SwiperSlide key={site.id}>
            {/* Background image */}
            <div className="relative w-full h-[60vh] md:h-screen">
              <Image
                src={site.img}
                alt={site.title}
                fill
                className="object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

              {/* Text Content */}
              <motion.div
                ref={ref}
                variants={textVariants}
                initial="visible"
                className="absolute bottom-6 md:top-1/2 md:left-12 left-1/2 transform md:-translate-y-1/2 -translate-x-1/2 px-4 text-center md:text-left max-w-xl z-20"
              >
                <div className="flex justify-center md:justify-start mb-2">
                  <Image src={Logo} alt="logo" className="w-12 h-12 md:w-16 md:h-16" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-2">
                  {site.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4">
                  Published on {site.release_date}
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                  <Link
                    href={site.link}
                    target="_blank"
                    className="px-3 py-1.5 md:px-8 md:py-3 text-sm sm:text-base font-medium rounded-full bg-green-600 hover:bg-green-700 transition-shadow shadow-md"
                  >
                    Visit Site
                  </Link>
                  <Link
                    href="/contact-us"
                    className="bg-transparent text-white border border-white rounded-full px-3 py-1.5 md:px-8 md:py-3 font-semibold hover:bg-white hover:text-black transition"
                  >
                    Inquire Now
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}