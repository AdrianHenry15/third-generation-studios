"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMusicUpdate } from "@/hooks/music/use-music";
import { ITrackProps } from "@/lib/solo-q-types/music-types";

interface TrackUpdateFormProps {
    track: ITrackProps;
}

const TrackUpdateForm: React.FC<TrackUpdateFormProps> = ({ track }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: track.title || "",
        type: track.type || "Unreleased",
        locked: track.locked || false,
        url: track.url || "",
        copyright: track.copyright || "",
    });

    const updateTrackMutation = useMusicUpdate("tracks", "tracks");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateTrackMutation.mutateAsync({
                id: track.id,
                values: formData,
            });

            // Show success message or redirect
            router.push("/solo-q/studio/my-tracks");
        } catch (error) {
            console.error("Error updating track:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Track Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            {/* Type */}
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                    Track Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="Unreleased">Unreleased</option>
                    <option value="Released">Released</option>
                    <option value="Remix">Remix</option>
                </select>
            </div>

            {/* URL */}
            <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                    Preview URL
                </label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/track-preview.mp3"
                />
            </div>

            {/* Copyright */}
            <div>
                <label htmlFor="copyright" className="block text-sm font-medium text-gray-300 mb-2">
                    Copyright Information
                </label>
                <textarea
                    id="copyright"
                    name="copyright"
                    value={formData.copyright}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Locked Status */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="locked"
                    name="locked"
                    checked={formData.locked}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                />
                <label htmlFor="locked" className="ml-2 text-sm font-medium text-gray-300">
                    Lock this track (requires unlock to play)
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
                <button
                    type="submit"
                    disabled={updateTrackMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    {updateTrackMutation.isPending ? "Updating..." : "Update Track"}
                </button>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    Cancel
                </button>
            </div>

            {/* Error Message */}
            {updateTrackMutation.error && <div className="text-red-400 text-sm mt-2">Error updating track. Please try again.</div>}
        </form>
    );
};

export default TrackUpdateForm;
