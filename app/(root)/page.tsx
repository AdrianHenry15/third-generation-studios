import HeroSection from "../../components/sections/hero-section";
import SecuritySection from "@/components/sections/security-section";
import CodeIntegrationSection from "@/components/sections/code-integration-section";
import StylingSection from "@/components/sections/styling-section";

export default function Home() {
    return (
        // MAIN TAG MIGHT BREAK APP
        <div className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
            {/* Hero Section */}
            <HeroSection />
            {/* Section */}
            {/* Code Integration and Organization (Next, Vercel, React) */}
            <CodeIntegrationSection />
            {/* SECURITY/STORAGE (Clerk, Sanity.io, Email.js) */}
            <SecuritySection />
            {/* STYLING */}
            <StylingSection />
        </div>
    );
}
