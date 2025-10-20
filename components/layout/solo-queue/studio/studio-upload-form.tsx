import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { Plus } from "lucide-react";
import StudioTrackInfoCard from "./studio-track-info";
import StudioAlbumInfo from "./studio-album-info";
import ConfirmModal from "@/components/modals/confirm-modal";
import ErrorModal from "@/components/modals/error-modal";
import type { Database, Enums } from "@/lib/types/supabase-types";
import { TrackCreditInsert } from "@/lib/types/database";

export type UploadMode = "single" | "album" | "singles";

// Use Supabase types
type TrackType = Enums<"track_type">;
type AlbumType = Enums<"album_type">;
type Track = Database["public"]["Tables"]["tracks"]["Row"];
type Album = Database["public"]["Tables"]["albums"]["Row"];

// Extended track data that includes the actual file for upload
export interface TrackUploadData extends Omit<Track, "id" | "created_at" | "updated_at" | "album_id" | "artist_id"> {
    id: string; // Temporary ID for form management
    audioFile?: File; // The actual file to upload
    audioFileName?: string; // Display name for the file
    trackImageFile?: File; // Track cover image file
    trackImageFileName?: string; // Display name for track cover image
    copyright?: string; // Add copyright field for non-remix tracks
}

// Update interface for remix upload data to match database schema
export interface RemixUploadData {
    original_song: string;
    original_artists: string[]; // Array of artist names
    additional_artists?: string[]; // Optional array of additional artists
    url?: string; // URL field (matches database)
}

// Extended album data that includes file upload fields
export interface AlbumUploadData extends Omit<Album, "id" | "created_at" | "updated_at" | "artist_id"> {
    artist_id?: string; // Will be set during upload
    album_id?: string;
    albumImageFile?: File;
    albumImageFileName?: string;
}

interface IStudioUploadFormProps {
    onSubmit: (data: {
        mode: UploadMode;
        tracks: TrackUploadData[];
        albumData: AlbumUploadData;
        trackCreditData: { [trackId: string]: TrackCreditInsert };
        remixData: { [trackId: string]: RemixUploadData };
    }) => void;
    isUploading: boolean;
}

const StudioUploadForm: React.FC<IStudioUploadFormProps> = ({ onSubmit, isUploading }) => {
    const [confirmation, setConfirmation] = useState(false);
    const [uploadMode, setUploadMode] = useState<UploadMode>("single");

    // --- New state for track credits ---
    const [trackCreditData, setTrackCreditData] = useState<{ [trackId: string]: TrackCreditInsert }>({});
    const [remixData, setRemixData] = useState<{ [trackId: string]: RemixUploadData }>({});
    // Validation errors
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [albumData, setAlbumData] = useState<AlbumUploadData>({
        name: "",
        type: "Single" as AlbumType,
        release_date: "",
        albumImageFile: undefined,
        albumImageFileName: "",
    });

    const [tracks, setTracks] = useState<TrackUploadData[]>([
        {
            id: "1",
            title: "",
            type: "Unreleased" as TrackType,
            genre: "",
            duration: 0,
            release_date: "",
            lyrics: "",
            is_public: false,
            locked: false,
            plays: 0,
            links: null,
            url: "", // Required by database schema but will be set during upload
            audioFileName: "",
            trackImageFileName: "",
        },
    ]);

    const handleModeChange = (mode: UploadMode) => {
        setUploadMode(mode);
        if (mode === "single" || mode === "singles") {
            // Ensure Single type is set on non-album modes
            setAlbumData((prev) => ({ ...prev, type: "Single" as AlbumType }));
        }
        // Clear previous validation errors when switching mode
        setValidationErrors([]);
        setShowErrorModal(false);
    };

    const handleAlbumDataChange = (field: keyof AlbumUploadData, value: string | AlbumType | File | undefined) => {
        setAlbumData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAlbumImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            handleAlbumDataChange("albumImageFile", file);
            handleAlbumDataChange("albumImageFileName", file.name);
        }
    };

    const handleTrackCreditChange = (trackId: string, creditInfo: Partial<TrackCreditInsert>) => {
        setTrackCreditData((prev) => ({
            ...prev,
            [trackId]: {
                // Always provide required fields, fallback to empty string if missing
                track_id: prev[trackId]?.track_id ?? (typeof creditInfo.track_id === "string" ? creditInfo.track_id : trackId),
                artist_id: prev[trackId]?.artist_id ?? (typeof creditInfo.artist_id === "string" ? creditInfo.artist_id : ""),
                performed_by: prev[trackId]?.performed_by ?? [],
                written_by: prev[trackId]?.written_by ?? [],
                produced_by: prev[trackId]?.produced_by ?? [],
                remixed_by: prev[trackId]?.remixed_by ?? [],
                ...creditInfo,
            },
        }));
    };

    const handleTrackChange = (trackId: string, field: keyof TrackUploadData, value: string | number | TrackType | boolean | any) => {
        setTracks((prev) =>
            prev.map((track) => {
                if (track.id !== trackId) return track;
                return { ...track, [field]: value };
            }),
        );

        // For single mode, auto-set album name to track title
        if (uploadMode === "single" && field === "title" && typeof value === "string") {
            setAlbumData((prev) => ({ ...prev, name: value }));
        }

        // If type is changed to "Remix", ensure remixData exists for this track
        if (field === "type") {
            setRemixData((prev) => {
                if (value === "Remix") {
                    return {
                        ...prev,
                        [trackId]: prev[trackId] || { original_song: "", original_artists: [], url: "" },
                    };
                } else {
                    // Remove remixData if type is changed away from Remix
                    const { [trackId]: _, ...rest } = prev;
                    return rest;
                }
            });
        }
    };

    const handleFileSelect = (trackId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("audio/")) {
            // Store the actual file and display name
            setTracks((prev) =>
                prev.map((track) => (track.id === trackId ? { ...track, audioFile: file, audioFileName: file.name } : track)),
            );

            // Get duration from audio file
            const audio = new Audio();
            audio.src = URL.createObjectURL(file);
            audio.onloadedmetadata = () => {
                handleTrackChange(trackId, "duration", Math.round(audio.duration));
                URL.revokeObjectURL(audio.src);
            };
        }
    };

    const handleTrackImageSelect = (trackId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setTracks((prev) =>
                prev.map((track) => (track.id === trackId ? { ...track, trackImageFile: file, trackImageFileName: file.name } : track)),
            );
        }
    };

    const addTrack = () => {
        const newTrack: TrackUploadData = {
            id: Date.now().toString(),
            title: "",
            type: "Unreleased" as TrackType,
            genre: "",
            duration: 0,
            release_date: "",
            lyrics: "",
            is_public: false,
            locked: false,
            plays: 0,
            links: null,
            url: "", // Required by database schema but will be set during upload
            audioFileName: "",
            trackImageFileName: "",
        };
        setTracks((prev) => [...prev, newTrack]);
    };

    const removeTrack = (trackId: string) => {
        if (tracks.length > 1) {
            setTracks((prev) => prev.filter((track) => track.id !== trackId));
        }
    };

    // Basic validation for required fields
    const validateForm = (): string[] => {
        const errs: string[] = [];

        if (!tracks.length) {
            errs.push("At least one track is required.");
        }

        tracks.forEach((t, idx) => {
            if (!t.title?.trim()) errs.push(`Track ${idx + 1}: title is required.`);
            if (!t.audioFile) errs.push(`Track ${idx + 1}: audio file is required.`);
            if (!t.type) errs.push(`Track ${idx + 1}: type is required.`);
            if (!t.genre?.trim()) errs.push(`Track ${idx + 1}: genre is required.`);
        });

        if (uploadMode === "album") {
            if (!albumData.name?.trim()) errs.push("Album name is required for Album/EP uploads.");
            if (!albumData.type) errs.push("Album type is required for Album/EP uploads.");
        }

        // Image validation based on mode/type
        // if (uploadMode === "single" && !tracks[0].trackImageFile) {
        //     errs.push("Cover image is required for single tracks.");
        // }

        // if (uploadMode === "album" && albumData.type === "Single" && tracks.some((t) => !t.trackImageFile)) {
        //     errs.push("Cover image is required for all tracks in Single releases.");
        // }

        if (uploadMode === "album" && albumData.type !== "Single" && !albumData.albumImageFile) {
            errs.push("Album cover image is required for EP/Album releases.");
        }

        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validateForm();
        if (errs.length) {
            setValidationErrors(errs);
            setShowErrorModal(true);
            return;
        }
        setValidationErrors([]);
        setShowErrorModal(false);
        setConfirmation(true);
    };

    const handleConfirmation = () => {
        setConfirmation(false);

        // Helper for single album payload derived from a track
        const singleAlbumFromTrack = (t: TrackUploadData): AlbumUploadData => ({
            name: t?.title || "Untitled",
            type: "Single",
            release_date: t?.release_date || "",
            albumImageFile: t?.trackImageFile,
            albumImageFileName: t?.trackImageFileName,
        });

        onSubmit({
            mode: uploadMode,
            tracks,
            remixData,
            trackCreditData,
            albumData:
                uploadMode === "album"
                    ? albumData
                    : uploadMode === "single"
                      ? singleAlbumFromTrack(tracks[0])
                      : {
                            // "singles" mode: parent should create one Single per track.
                            // Provide a placeholder albumData since it's unused in this mode.
                            name: "Multiple Singles",
                            type: "Single",
                            release_date: "",
                        },
        });
    };

    // Keep trackCreditData/remixData in sync with tracks
    React.useEffect(() => {
        // Remove credit/remix data for deleted tracks
        setTrackCreditData((prev) => {
            const updated: typeof prev = {};
            tracks.forEach((track) => {
                if (prev[track.id]) updated[track.id] = prev[track.id];
            });
            return updated;
        });
        setRemixData((prev) => {
            const updated: typeof prev = {};
            tracks.forEach((track) => {
                if (prev[track.id]) updated[track.id] = prev[track.id];
            });
            return updated;
        });
    }, [tracks]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-full overflow-x-hidden">
            {/* Upload Mode Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload Type</CardTitle>
                    <CardDescription>Choose how you want to upload your music</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Responsive grid: 1 col on mobile, 2 on sm, 3 on lg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <Button
                            type="button"
                            variant={uploadMode === "single" ? "default" : "outline"}
                            onClick={() => handleModeChange("single")}
                            className="w-full"
                        >
                            Single Track
                        </Button>
                        <Button
                            type="button"
                            variant={uploadMode === "album" ? "default" : "outline"}
                            onClick={() => handleModeChange("album")}
                            className="w-full"
                        >
                            Album/EP
                        </Button>
                        <Button
                            type="button"
                            variant={uploadMode === "singles" ? "default" : "outline"}
                            onClick={() => handleModeChange("singles")}
                            className="w-full"
                        >
                            Multiple Singles
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-700 text-sm">
                    <div className="font-medium mb-2">Please fix the following:</div>
                    <ul className="list-disc ml-5">
                        {validationErrors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Album Information - Only show for album mode */}
            <StudioAlbumInfo
                uploadMode={uploadMode}
                albumData={albumData}
                handleAlbumDataChange={handleAlbumDataChange}
                handleAlbumImageSelect={handleAlbumImageSelect}
            />

            {/* Track Information */}
            {tracks.map((track, index) => (
                <StudioTrackInfoCard
                    key={track.id}
                    track={track}
                    tracks={tracks}
                    uploadMode={uploadMode}
                    albumType={albumData.type}
                    index={index}
                    handleTrackChange={handleTrackChange}
                    handleFileSelect={handleFileSelect}
                    handleTrackImageSelect={handleTrackImageSelect}
                    removeTrack={removeTrack}
                    remixData={remixData[track.id]}
                    onRemixDataChange={(remixInfo) => setRemixData((prev) => ({ ...prev, [track.id]: remixInfo }))}
                    trackCreditData={trackCreditData[track.id]}
                    onTrackCreditChange={handleTrackCreditChange}
                />
            ))}

            {/* Add Track Button - For album and multiple singles */}
            {uploadMode !== "single" && (
                <div className="text-center">
                    <Button type="button" variant="outline" onClick={addTrack} className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Track
                    </Button>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isUploading} className="w-full sm:w-auto min-w-0 sm:min-w-32">
                    {isUploading
                        ? "Uploading..."
                        : `Upload ${uploadMode === "album" ? "Album" : uploadMode === "singles" ? "Singles" : "Track"}`}
                </Button>
            </div>
        </form>
    );
};

export default StudioUploadForm;
