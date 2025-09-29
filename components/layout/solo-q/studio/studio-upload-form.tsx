import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { Plus } from "lucide-react";
import { TrackType, AlbumType, IAlbumProps, ITrackProps } from "@/lib/solo-q-types/music-types";
import StudioTrackInfoCard from "./studio-track-info";
import StudioAlbumInfo from "./studio-album-info";
import ConfirmModal from "@/components/modals/confirm-modal";

export type UploadMode = "single" | "album";

// Extended track data that includes the actual file for upload
export interface TrackUploadData extends Omit<ITrackProps, "url" | "album" | "artists" | "credits"> {
    audioFile?: File; // The actual file to upload
    audioFileName?: string; // Display name for the file
    trackImageFile?: File; // Track cover image file
    trackImageFileName?: string; // Display name for track cover image
}

// Extended album data that includes file upload fields
export interface AlbumUploadData extends Omit<IAlbumProps, "id" | "created_at" | "updated_at" | "images"> {
    albumImageFile?: File;
    albumImageFileName?: string;
}

interface IStudioUploadFormProps {
    onSubmit: (data: { mode: UploadMode; tracks: TrackUploadData[]; albumData: AlbumUploadData }) => void;
    isUploading: boolean;
}

const StudioUploadForm: React.FC<IStudioUploadFormProps> = ({ onSubmit, isUploading }) => {
    const [confirmation, setConfirmation] = useState(false);
    const [uploadMode, setUploadMode] = useState<UploadMode>("single");
    const [albumData, setAlbumData] = useState<AlbumUploadData>({
        name: "",
        type: "Single" as AlbumType,
        release_date: "",
        artist_id: "", // Will be set during upload
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
            copyright: "",
            lyrics: "",
            album_id: "",
            artist_id: "",
            locked: false,
            plays: 0,
            is_liked: false,
            audioFileName: "",
            trackImageFileName: "",
            links: { spotify: "" },
        },
    ]);

    const handleModeChange = (mode: UploadMode) => {
        setUploadMode(mode);
        if (mode === "single") {
            // For singles, set album name to track title automatically
            setAlbumData((prev) => ({ ...prev, album_type: "Single" }));
        }
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

    const handleTrackChange = (trackId: string, field: keyof TrackUploadData, value: string | number | TrackType | any) => {
        setTracks((prev) => prev.map((track) => (track.id === trackId ? { ...track, [field]: value } : track)));

        // For single mode, auto-set album name to track title
        if (uploadMode === "single" && field === "title" && typeof value === "string") {
            setAlbumData((prev) => ({ ...prev, name: value }));
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
            type: "Unreleased",
            genre: "",
            duration: 0,
            release_date: "",
            copyright: "",
            lyrics: "",
            album_id: "",
            artist_id: "",
            locked: false,
            plays: 0,
            is_liked: false,
            audioFileName: "",
            trackImageFileName: "",
            links: { spotify: "" },
        };
        setTracks((prev) => [...prev, newTrack]);
    };

    const removeTrack = (trackId: string) => {
        if (tracks.length > 1) {
            setTracks((prev) => prev.filter((track) => track.id !== trackId));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmation(true);
    };

    const handleConfirmation = () => {
        setConfirmation(false);
        onSubmit({
            mode: uploadMode,
            tracks,
            albumData:
                uploadMode === "album"
                    ? albumData
                    : {
                          name: tracks[0]?.title || "Untitled",
                          type: "Single",
                          release_date: tracks[0]?.release_date || "",
                          artist_id: "", // Will be set during upload
                          albumImageFile: tracks[0]?.trackImageFile,
                          albumImageFileName: tracks[0]?.trackImageFileName,
                      },
        });
    };

    {
        confirmation && (
            <ConfirmModal
                title="Are you sure you want to leave? Unsaved changes will be lost."
                onCancel={() => setConfirmation(false)}
                onConfirm={handleConfirmation}
            />
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Upload Mode Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload Type</CardTitle>
                    <CardDescription>Choose how you want to upload your music</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant={uploadMode === "single" ? "default" : "outline"}
                            onClick={() => handleModeChange("single")}
                            className="flex-1"
                        >
                            Single Track
                        </Button>
                        <Button
                            type="button"
                            variant={uploadMode === "album" ? "default" : "outline"}
                            onClick={() => handleModeChange("album")}
                            className="flex-1"
                        >
                            Album/EP
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Album Information - Only show for album mode */}
            {uploadMode === "album" && (
                <StudioAlbumInfo
                    albumData={albumData}
                    handleAlbumDataChange={handleAlbumDataChange}
                    handleAlbumImageSelect={handleAlbumImageSelect}
                />
            )}

            {/* Track Information */}
            {tracks.map((track, index) => (
                <StudioTrackInfoCard
                    key={track.id}
                    track={track}
                    tracks={tracks}
                    uploadMode={uploadMode}
                    albumType={albumData.type} // Pass the actual AlbumType
                    index={index}
                    handleTrackChange={handleTrackChange}
                    handleFileSelect={handleFileSelect}
                    handleTrackImageSelect={handleTrackImageSelect}
                    removeTrack={removeTrack}
                />
            ))}

            {/* Add Track Button - Only for album mode */}
            {uploadMode === "album" && (
                <div className="text-center">
                    <Button type="button" variant="outline" onClick={addTrack}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Track
                    </Button>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isUploading} className="min-w-32">
                    {isUploading ? "Uploading..." : `Upload ${uploadMode === "single" ? "Track" : "Album"}`}
                </Button>
            </div>
        </form>
    );
};

export default StudioUploadForm;
