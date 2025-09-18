import React from "react";
import { Copyright } from "lucide-react";
import Link from "next/link";

const MiniFooter = () => {
    return (
        <footer className="w-full">
            <div className="max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between mb-10 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">
                <div className="flex items-center text-neutral-500 dark:text-neutral-400 mb-1 sm:mb-0">
                    <Copyright className="w-4 h-4 mr-1" /> 2025 Third Generation Studios
                </div>
                <div className="flex m-2 items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <Link href="/privacy-policy" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">
                        Privacy Policy
                    </Link>
                    {/* <span className="mx-1">&middot;</span> */}
                    {/* <Link href="/legal" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">
                        Terms
                    </Link> */}
                </div>
            </div>
        </footer>
    );
};

export default MiniFooter;
