"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTrackFileReplace } from "@/hooks/storage/use-music-storage";
import { useRemixInsert, useRemixUpdate, useRemixDelete } from "@/hooks/music/use-remixes";
import { trackGenres } from "@/lib/constants";
import RemixCreditForm from "@/components/layout/solo-queue/studio/remix-credit-form";
import { RemixUploadData } from "../../solo-queue/studio/studio-upload-form";
import { useUpdateTrack } from "@/hooks/music/use-tracks";
import { useUpdateAlbum } from "@/hooks/music/use-albums";
import type { Enums } from "@/lib/types/supabase-types";
import { TrackWithRelations } from "@/lib/types/database";

// Use Supabase types
type TrackType = Enums<"track_type">;

interface TrackUpdateFormProps {
    track: TrackWithRelations;
}

// Type for music links based on the Json type in Supabase
interface MusicLinks {
    spotify?: string;
    apple?: string;
    youtube?: string;
    soundcloud?: string;
    amazon?: string;
    tidal?: string;
    deezer?: string;
}

const TrackUpdateForm: React.FC<TrackUpdateFormProps> = ({ track }) => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Parse existing links from the Json type
    const existingLinks = React.useMemo(() => {
        if (!track.links) return {};
        try {
            return typeof track.links === "object" ? (track.links as MusicLinks) : {};
        } catch {
            return {};
        }
    }, [track.links]);

    const [formData, setFormData] = useState({
        title: track.title || "",
        album_name: track.album?.name || "",
        release_date: track.release_date ? track.release_date.split("T")[0] : "",
        genre: track.genre || "",
        locked: track.locked || false,
        lyrics: track.lyrics || "",
        type: track.type || ("Unreleased" as TrackType),
        is_public: track.is_public || false,
        links: {
            spotify: existingLinks.spotify || "",
            apple: existingLinks.apple || "",
            youtube: existingLinks.youtube || "",
            soundcloud: existingLinks.soundcloud || "",
            amazon: existingLinks.amazon || "",
            tidal: existingLinks.tidal || "",
            deezer: existingLinks.deezer || "",
        },
    });

    // Separate state for remix data since it's not part of tracks table
    const [remixData, setRemixData] = useState({
        original_song: track.remixes?.original_song || "",
        url: track.remixes?.url || "",
        original_artists: (() => {
            if (!track.remixes?.original_artists) return [];
            try {
                return Array.isArray(track.remixes.original_artists)
                    ? (track.remixes.original_artists as string[])
                    : (JSON.parse(track.remixes.original_artists as string) as string[]);
            } catch {
                return [];
            }
        })(),
    });

    const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
    const [genreSearchTerm, setGenreSearchTerm] = useState("");
    const [selectedGenreIndex, setSelectedGenreIndex] = useState(-1);
    const genreInputRef = useRef<HTMLInputElement>(null);

    const updateTrackMutation = useUpdateTrack();
    const updateAlbumMutation = useUpdateAlbum();
    const replaceFileMutation = useTrackFileReplace();
    const remixInsertMutation = useRemixInsert();
    const remixUpdateMutation = useRemixUpdate();
    const remixDeleteMutation = useRemixDelete();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (name.startsWith("links.")) {
            const linkKey = name.split(".")[1] as keyof MusicLinks;
            setFormData((prev) => ({
                ...prev,
                links: {
                    ...prev.links,
                    [linkKey]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    };

    const handleRemixDataChange = (newRemixData: RemixUploadData) => {
        setRemixData({
            original_song: newRemixData.original_song,
            url: newRemixData.url || "",
            original_artists: newRemixData.original_artists || [],
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type (audio files only)
            const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/m4a"];
            if (!validTypes.includes(file.type)) {
                alert("Please select a valid audio file (MP3, WAV, OGG, M4A)");
                return;
            }

            // Validate file size (e.g., max 50MB)
            const maxSize = 50 * 1024 * 1024; // 50MB in bytes
            if (file.size > maxSize) {
                alert("File size must be less than 50MB");
                return;
            }

            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle file replacement if a file is selected
        if (selectedFile) {
            try {
                await replaceFileMutation.mutateAsync({
                    trackId: track.id,
                    albumId: track.album_id,
                    albumType: track.album?.type || "Single",
                    artistId: track.artist_id,
                    newFile: selectedFile,
                    newTitle: formData.title !== track.title ? formData.title : undefined,
                });

                // After file replacement, update other metadata including remix data
                await updateTrackAndRemixData();
                return;
            } catch (error) {
                console.error("Error replacing file:", error);
                return;
            }
        }

        // If no file replacement, just update metadata and remix data
        await updateTrackAndRemixData();
    };

    const updateTrackAndRemixData = async () => {
        // Filter links and convert to Json type
        const filteredLinks: MusicLinks = {};
        Object.entries(formData.links).forEach(([key, value]) => {
            if (value.trim()) {
                filteredLinks[key as keyof MusicLinks] = value;
            }
        });

        const updateData = {
            title: formData.title,
            release_date: formData.release_date || null,
            genre: formData.genre || null,
            locked: formData.locked,
            lyrics: formData.lyrics || null,
            type: formData.type,
            is_public: formData.is_public,
            links: Object.keys(filteredLinks).length > 0 ? (filteredLinks as any) : null,
        };

        try {
            // Update album name if it has changed
            if (track.album && formData.album_name !== track.album.name) {
                await updateAlbumMutation.mutateAsync({
                    id: track.album_id,
                    updates: {
                        name: formData.album_name,
                    },
                });
            }

            // Update track data
            await updateTrackMutation.mutateAsync({
                id: track.id,
                updates: updateData,
            });

            // Handle remix data
            const isCurrentlyRemix = track.type === "Remix";
            const willBeRemix = formData.type === "Remix";

            if (!isCurrentlyRemix && willBeRemix) {
                // Track is becoming a remix - insert new remix record
                await remixInsertMutation.mutateAsync({
                    track_id: track.id,
                    original_song: remixData.original_song,
                    url: remixData.url || null,
                    original_artists: remixData.original_artists,
                });
            } else if (isCurrentlyRemix && willBeRemix) {
                // Track remains a remix - update existing remix record
                await remixUpdateMutation.mutateAsync({
                    track_id: track.id,
                    original_song: remixData.original_song,
                    url: remixData.url || null,
                    original_artists: remixData.original_artists,
                });
            } else if (isCurrentlyRemix && !willBeRemix) {
                // Track is no longer a remix - delete remix record
                await remixDeleteMutation.mutateAsync(track.id);
            }

            router.push("/solo-queue/studio/my-tracks");
        } catch (error) {
            console.error("Error updating track:", error);
        }
    };

    // Filter genres based on search term
    const filteredGenres = trackGenres.filter((genre) => genre.toLowerCase().includes(genreSearchTerm.toLowerCase()));

    const handleGenreInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, genre: value }));
        setGenreSearchTerm(value);
        setGenreDropdownOpen(true);
        setSelectedGenreIndex(-1); // Reset selection when typing
    };

    const handleGenreSelect = (genre: string) => {
        setFormData((prev) => ({ ...prev, genre }));
        setGenreSearchTerm("");
        setGenreDropdownOpen(false);
        setSelectedGenreIndex(-1);
    };

    const handleGenreInputFocus = () => {
        setGenreSearchTerm(formData.genre);
        setGenreDropdownOpen(true);
        setSelectedGenreIndex(-1);
    };

    const handleGenreInputBlur = () => {
        // Delay closing to allow for genre selection
        setTimeout(() => {
            setGenreDropdownOpen(false);
            setGenreSearchTerm("");
            setSelectedGenreIndex(-1);
        }, 200);
    };

    const handleGenreKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!genreDropdownOpen) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedGenreIndex((prev) => (prev < filteredGenres.length - 1 ? prev + 1 : 0));
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedGenreIndex((prev) => (prev > 0 ? prev - 1 : filteredGenres.length - 1));
                break;

            case "Enter":
                e.preventDefault();
                if (selectedGenreIndex >= 0 && filteredGenres[selectedGenreIndex]) {
                    handleGenreSelect(filteredGenres[selectedGenreIndex]);
                } else if (genreSearchTerm.trim()) {
                    // Use custom genre if typed
                    setFormData((prev) => ({ ...prev, genre: genreSearchTerm.trim() }));
                    setGenreDropdownOpen(false);
                    setGenreSearchTerm("");
                    setSelectedGenreIndex(-1);
                }
                break;

            case "Escape":
                e.preventDefault();
                setGenreDropdownOpen(false);
                setGenreSearchTerm("");
                setSelectedGenreIndex(-1);
                genreInputRef.current?.blur();
                break;
        }
    };

    // Reset selected index when filtered genres change
    useEffect(() => {
        if (selectedGenreIndex >= filteredGenres.length) {
            setSelectedGenreIndex(filteredGenres.length - 1);
        }
    }, [filteredGenres.length, selectedGenreIndex]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Track Title *
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

            {/* Album Name */}
            <div>
                <label htmlFor="album_name" className="block text-sm font-medium text-gray-300 mb-2">
                    Album Name *
                </label>
                <input
                    type="text"
                    id="album_name"
                    name="album_name"
                    value={formData.album_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                <div className="text-xs text-gray-400 mt-2">
                    <p>• Current album type: {track.album?.type || "Unknown"}</p>
                    {track.album?.type === "Single" && <p>• Singles typically have the same name as the track</p>}
                </div>
            </div>

            {/* File Replacement */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Replace Track Audio (Optional)</label>
                <div className="relative">
                    <input
                        type="file"
                        id="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white border-dashed hover:border-gray-600 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">
                                Choose File
                            </div>
                            <span className="text-gray-400">{selectedFile ? selectedFile.name : "No file selected"}</span>
                        </div>
                    </div>
                </div>
                {selectedFile && (
                    <p className="text-sm text-green-400 mt-2">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                )}
                <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p>• Supported formats: MP3, WAV, OGG, M4A (Max 50MB)</p>
                    <p>• This will replace the current audio file and update duration automatically</p>
                </div>
            </div>

            {/* Release Date */}
            <div>
                <label htmlFor="release_date" className="block text-sm font-medium text-gray-300 mb-2">
                    Release Date
                </label>
                <input
                    type="date"
                    id="release_date"
                    name="release_date"
                    value={formData.release_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Genre - Custom Combo Box */}
            <div className="relative">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
                    Genre
                </label>
                <input
                    ref={genreInputRef}
                    type="text"
                    id="genre"
                    value={genreDropdownOpen ? genreSearchTerm : formData.genre}
                    onChange={handleGenreInputChange}
                    onFocus={handleGenreInputFocus}
                    onBlur={handleGenreInputBlur}
                    onKeyDown={handleGenreKeyDown}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search genres or type custom..."
                    autoComplete="off"
                />

                {/* Dropdown */}
                {genreDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredGenres.length > 0 ? (
                            filteredGenres.map((genre, index) => (
                                <button
                                    key={genre}
                                    type="button"
                                    onClick={() => handleGenreSelect(genre)}
                                    className={`w-full text-left px-4 py-2 text-white transition-colors ${
                                        index === selectedGenreIndex ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-700"
                                    }`}
                                >
                                    {genre}
                                </button>
                            ))
                        ) : genreSearchTerm ? (
                            <div className="px-4 py-2 text-gray-400">Press Enter to use "{genreSearchTerm}" as custom genre</div>
                        ) : (
                            <div className="px-4 py-2 text-gray-400">Start typing to search genres...</div>
                        )}

                        {/* Keyboard navigation hint */}
                        {filteredGenres.length > 0 && (
                            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-700">
                                Use ↑↓ to navigate, Enter to select, Esc to close
                            </div>
                        )}
                    </div>
                )}
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
                    <option value="Work In Progress">Work In Progress</option>
                    <option value="Demo">Demo</option>
                    <option value="Remix">Remix</option>
                </select>
            </div>

            {/* Remix Credits / Copyright */}
            <RemixCreditForm
                track={{
                    ...track,
                    type: formData.type,
                }}
                remixData={remixData}
                onRemixDataChange={handleRemixDataChange}
            />

            {/* Lyrics */}
            <div>
                <label htmlFor="lyrics" className="block text-sm font-medium text-gray-300 mb-2">
                    Lyrics
                </label>
                <textarea
                    id="lyrics"
                    name="lyrics"
                    value={formData.lyrics}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Music Links */}
            <div>
                <h3 className="text-lg font-medium text-gray-300 mb-4">Music Platform Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData.links).map((platform) => (
                        <div key={platform}>
                            <label htmlFor={`links.${platform}`} className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                                {platform}
                            </label>
                            <input
                                type="url"
                                id={`links.${platform}`}
                                name={`links.${platform}`}
                                value={formData.links[platform as keyof MusicLinks]}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder={`https://${platform}.com/...`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Public/Private Toggle */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="is_public"
                    name="is_public"
                    checked={formData.is_public}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_public" className="ml-2 text-sm font-medium text-gray-300">
                    Make this track public
                </label>
                <div className="ml-4 text-xs text-gray-400">Public tracks can be discovered and played by other users</div>
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
                    disabled={updateTrackMutation.isPending || updateAlbumMutation.isPending || replaceFileMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    {updateTrackMutation.isPending || updateAlbumMutation.isPending || replaceFileMutation.isPending
                        ? "Updating..."
                        : "Update Track"}
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
            {(updateTrackMutation.error || updateAlbumMutation.error || replaceFileMutation.error) && (
                <div className="text-red-400 text-sm mt-2">Error updating track. Please try again.</div>
            )}
        </form>
    );
};

export default TrackUpdateForm;
