import MiniFooter from "@/components/ui/mini-footer";
import { memo } from "react";
import type { Metadata } from "next";

// SEO metadata for auth pages
export const metadata: Metadata = {
    title: {
        template: "Third Generation Studios",
        default: "Third Generation Studios",
    },
    description: "Sign in or create an account for Third Generation Studios — access your projects, tools, and assets.",
    keywords: ["sign in", "sign up", "authentication", "third generation studios", "third-gen studios", "tgs", "projects", "account"],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: "Third Generation Studios",
        description: "Sign in or create an account for Third Generation Studios — access your projects, tools, and assets.",
        type: "website",
        siteName: "Third Generation Studios",
    },
    twitter: {
        card: "summary",
        title: "Third Generation Studios",
        description: "Sign in or create an account for Third Generation Studios — access your projects, tools, and assets.",
    },
};

interface AuthLayoutProps {
    children: React.ReactNode;
}

// Memoized AuthLayout component for build optimization
const AuthLayout = memo(async ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50/80 via-white to-green-100/80 dark:from-neutral-900 dark:via-neutral-950 dark:to-green-950/30">
            {/* Main content area with semantic structure */}
            <main
                className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8"
                role="main"
                aria-label="Authentication content"
            >
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto">
                <MiniFooter />
            </footer>

            {/* Schema.org structured data for auth pages */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Third Generation Studios",
                        url: "https://thirdgenerationstudios.com/auth",
                        publisher: {
                            "@type": "Organization",
                            name: "Third Generation Studios",
                            url: "https://thirdgenerationstudios.com",
                        },
                        potentialAction: [
                            {
                                "@type": "LoginAction",
                                target: "https://thirdgenerationstudios.com/sign-in",
                                name: "Sign In",
                            },
                            {
                                "@type": "RegisterAction",
                                target: "https://thirdgenerationstudios.com/sign-up",
                                name: "Sign Up",
                            },
                        ],
                    }),
                }}
            />
        </div>
    );
});

// Display name for dev tools
AuthLayout.displayName = "AuthLayout — Third Generation Studios";

export default AuthLayout;
