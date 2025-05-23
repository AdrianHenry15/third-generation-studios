import React from "react";
import logoImage from "@/public/logos/tgs-logo.png";
import Image from "next/image";
import Link from "next/link";

interface ITitleSectionProps {
    title: string;
}

export default function TitleSection({ title }: ITitleSectionProps) {
    return (
        <section className="w-full py-16 md:py-32 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">{title}</h2>

                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 animate-pulse">
                        <Image src={logoImage} alt="TGS Logo" layout="responsive" />
                    </div>
                </div>

                <Link
                    href="/contact-us"
                    className="inline-block bg-green-600 text-white text-lg font-medium px-6 py-1.5 md:px-8 md:py-3 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                >
                    Schedule a Consultation
                </Link>
            </div>
        </section>
    );
}
