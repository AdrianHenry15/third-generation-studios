"use client";

import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BetaBanner() {
    const pathname = usePathname();
    return (
        <div className="mx-auto xl:w-[1000px]">
            <div
                className="
          bg-neutral-900/90 
          backdrop-blur-xl 
          shadow-[0_0_25px_rgba(20,184,255,0.15)] 
          rounded-2xl 
          border border-neutral-700/50 
          overflow-hidden
          transition-all
        "
            >
                {/* Accent */}
                <div className="h-[3px] w-full bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600" />

                {/* Main content */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-2 px-5 lg:px-7 py-4 lg:py-5">
                    {/* Copy */}
                    <div className="flex items-start lg:items-center gap-3 lg:gap-4 w-full lg:w-auto">
                        <div className="bg-neutral-800/60 p-2 rounded-xl border border-neutral-700/40 shrink-0">
                            <Info className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-wide truncate">
                                Solo Queue <span className="text-cyan-400/90">BETA</span>
                            </h2>
                            <p className="text-sm lg:text-base text-neutral-300 font-light leading-snug">
                                Early preview release. Updates, improvements, and fixes are actively in development.
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    {pathname === "/solo-queue" ? null : (
                        <div className="w-full lg:w-auto flex justify-end">
                            <Link href="/solo-queue" className="w-full lg:w-auto">
                                <Button
                                    size="lg"
                                    className="
                  w-full lg:w-auto 
                  justify-center
                  lg:justify-start
                  text-sm lg:text-base
                  rounded-xl px-4 lg:px-6 py-2 lg:py-3
                  bg-blue-600/20 hover:bg-blue-500/30
                  border border-blue-500/30
                  text-blue-300 hover:text-white
                  transition-all shadow-sm
                "
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
