"use client";

import React from "react";
import { Music, X } from "lucide-react";

interface SpotifyAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    trackTitle?: string;
}

const SpotifyAuthModal = ({ isOpen, onClose, onConfirm, trackTitle }: SpotifyAuthModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-green-500/20">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
                
                <div className="text-center">
                    {/* Spotify Icon */}
                    <div className="mx-auto mb-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        <Music size={32} className="text-white" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Connect to Spotify
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-300 mb-2 leading-relaxed">
                        {trackTitle ? `To play "${trackTitle}"` : "To play Spotify tracks"}, you need to sign in to your Spotify account.
                    </p>
                    
                    <p className="text-gray-400 text-sm mb-8">
                        This allows us to stream high-quality previews directly from Spotify.
                    </p>
                    
                    {/* Benefits */}
                    <div className="text-left mb-8 space-y-2">
                        <div className="flex items-center text-green-400 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            High-quality audio streaming
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            Access to full Spotify catalog
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            Secure authentication
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                        >
                            Maybe Later
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Music size={18} />
                            Connect Spotify
                        </button>
                    </div>
                    
                    {/* Footer */}
                    <p className="text-xs text-gray-500 mt-4">
                        We'll redirect you to Spotify's secure login page
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpotifyAuthModal;
