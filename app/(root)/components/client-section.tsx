"use client";

import Image from "next/image";
import Link from "next/link";

type Client = {
    name: string;
    description: string;
    image: string;
    link: string;
};

const clients: Client[] = [
    {
        name: "Eckert Golf",
        description: "Maintenance serviced for your landscape.",
        image: "/websites/eckert-golf.png",
        link: "https://eckertgolf.com",
    },
    {
        name: "Brite",
        description: "Service-based platform for exterior cleaning operations.",
        image: "/websites/brite.png",
        link: "https://briteclt.com",
    },
    {
        name: "Molly’s Specialty Sweets",
        description: "Product-driven site for a specialty dessert business.",
        image: "/websites/mollys.jpg",
        link: "https://mollyspecialtysweets.com",
    },
    {
        name: "Project Alexandria",
        description: "Experimental digital media and AI-driven reading platform.",
        image: "/websites/alexandria.png",
        link: "https://projectalexandria.com",
    },
    {
        name: "Adorn Your Krown",
        description: "Hair Stylist Booking Application.",
        image: "/websites/adorn-your-krown.png",
        link: "https://adorn-your-krown.vercel.app/",
    },
];

export default function ClientCollageSection() {
    return (
        <section id="websites" className={`w-full py-20 bg-gradient-to-b from-gray-900 to-black`}>
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-14 max-w-2xl">
                    <h2 className="text-3xl font-semibold tracking-tight">Work Trusted by Real Businesses</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {" "}
                        A selection of platforms we’ve designed and built across retail, services, wellness, and digital media.
                    </p>
                </div>

                {/* Collage Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {clients.map((client) => (
                        <Link
                            href={client.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={client.name}
                            className="group relative h-64 overflow-hidden rounded-2xl border border-gray-200 bg-white transition dark:border-gray-800 dark:bg-gray-900"
                        >
                            {/* Image */}
                            <Image
                                src={client.image}
                                alt={client.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-white/90 via-white/50 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-black/80 dark:via-black/40">
                                <h3 className="text-sm font-semibold">{client.name}</h3>
                                <p className="mt-1 text-xs leading-snug text-gray-700 dark:text-gray-300"> {client.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
