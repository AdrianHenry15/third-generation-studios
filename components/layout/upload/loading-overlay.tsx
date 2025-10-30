import { Music } from "lucide-react";
import React from "react";

const LoadingOverlay = ({ currentStep, totalTracks }: { currentStep: string; totalTracks: number }) => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
                <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Music className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-purple-500/20 rounded-full animate-spin border-t-purple-500"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Uploading Your Music</h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{currentStep}</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span>
                            {totalTracks} track{totalTracks !== 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                </div>

                <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">Please don't close this window...</div>
            </div>
        </div>
    </div>
);

export default LoadingOverlay;
