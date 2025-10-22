import WebsiteRowItem from "@/components/website-row-item";
import { ClientWebsites } from "@/lib/websites";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Website Designs",
    description: "Choose A Design and Schedule An Consultation Today",
};

// TODO:Add Emailjs, Clerkjs, Square promotions using their websites as references
export default function WebsitesPage() {
    return (
        <div className="bg-black overflow-x-hidden w-full min-h-screen">
            {/* Jumbotron */}
            <div className="w-full flex flex-col items-center justify-center h-screen px-4 bg-gradient-to-br from-blue-900 via-black to-purple-900 text-center mb-0 relative overflow-hidden">
                {/* Animated Gradient Blobs */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-purple-600 opacity-30 rounded-full filter blur-3xl animate-pulse" />
                    <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-blue-500 opacity-20 rounded-full filter blur-2xl animate-pulse delay-2000" />
                    <div className="absolute right-10 top-10 w-60 h-60 bg-pink-500 opacity-20 rounded-full filter blur-2xl animate-pulse delay-1000" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg relative z-10">
                    Explore Our Web Creations
                </h1>
                <p className="text-lg sm:text-2xl text-gray-300 max-w-2xl mb-2 relative z-10">
                    Discover how we transform ideas into stunning, high-performance websites for our clients. Each project is a testament to
                    our passion for design, technology, and user experience.
                </p>
            </div>

            {/* Colorful Background for Websites */}
            <div className="w-full min-h-[60vh] bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 py-14 px-4 lg:px-10 flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">Client Websites</h2>
                <div className="flex flex-wrap justify-center gap-6 w-full">
                    {ClientWebsites.map((site) => (
                        <div key={site.id} className="flex-grow max-w-xs min-w-[18rem] flex justify-center">
                            <WebsiteRowItem currentWebsite={site} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
