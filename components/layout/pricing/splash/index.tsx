"use client";
import Image from "next/image";
import React from "react";
import PricingSplashImg from "@/public/plans-splash.jpg";
import SplashImageText from "./splash-image-text";

export default function PricingSplash() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Image
        src={PricingSplashImg}
        alt="Pricing Splash"
        fill
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <SplashImageText />
      </div>
    </section>
  );
}