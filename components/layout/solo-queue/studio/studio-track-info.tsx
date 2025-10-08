import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Music, X, Upload } from "lucide-react";
import React from "react";
import { TrackUploadData, UploadMode, RemixUploadData } from "./studio-upload-form";
import { trackGenres } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import RemixCreditForm from "./remix-credit-form";
import type { Enums } from "@/lib/types/supabase-types";
import Image from "next/image";

// Use Supabase types
type TrackType = Enums<"track_type">;
type AlbumType = Enums<"album_type">;

// StudioTrackInfoCard: form card for per-track metadata, uploads, and visibility.
// Used in "single" or "album" upload modes with optional remix credit support.

interface IStudioTrackInfoProps {
    // Track data and context
    track: TrackUploadData;
    uploadMode: UploadMode;
    albumType?: AlbumType;
    index: number;
    tracks: TrackUploadData[];

    // Handlers
    handleTrackChange: (id: string, field: keyof TrackUploadData, value: string | number | TrackType | any) => void;
    removeTrack: (id: string) => void;
    handleFileSelect: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTrackImageSelect: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;

    // Remix (optional)
    remixData?: RemixUploadData; // Add remix data prop
    onRemixDataChange?: (remixData: RemixUploadData) => void; // Add remix data change handler
}

const StudioTrackInfoCard = (props: IStudioTrackInfoProps) => {
    const {
        track,
        tracks,
        uploadMode,
        albumType,
        index,
        handleTrackChange,
        handleFileSelect,
        handleTrackImageSelect,
        removeTrack,
        remixData,
        onRemixDataChange,
    } = props;

    // Whether to show cover upload for single mode or Single album types
    // Keeps album flow clean while ensuring singles have cover art
    const showCoverUpload = uploadMode === "single" || albumType === "Single";

    return (
        <Card key={track.id}>
            {/* Header: Title + optional remove button */}
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Music className="h-5 w-5" />
                            {uploadMode === "single" ? "Track Information" : `Track ${index + 1}`}
                        </CardTitle>
                        <CardDescription>
                            {uploadMode === "single" ? "Details about your track" : `Details for track ${index + 1}`}
                        </CardDescription>
                    </div>
                    {uploadMode === "album" && tracks!.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeTrack(track.id)}>
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* ========== Cover Image Upload (single / Single album only) ========== */}
                {showCoverUpload && (
                    <div>
                        <Label className="text-lg font-semibold">Track Cover {uploadMode === "single" ? "*" : "(Optional)"}</Label>
                        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center mt-2 relative">
                            <Image
                                src={track.trackImageFile ? URL.createObjectURL(track.trackImageFile) : ""}
                                alt="track-cover"
                                className="h-16 w-16 mx-auto mb-4 text-muted-foreground"
                            />
                            <div className="space-y-3">
                                <p className="text-sm text-muted-foreground font-medium">
                                    {track.trackImageFileName || "No cover image selected"}
                                </p>
                                <p className="text-xs text-muted-foreground">Recommended: 1400x1400px, JPG or PNG</p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="default"
                                    onClick={() => {
                                        const input = document.createElement("input");
                                        input.type = "file";
                                        input.accept = "image/*";
                                        input.onchange = (e) => handleTrackImageSelect(track.id, e as any);
                                        input.click();
                                    }}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose Cover Image
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========== Audio File Upload ========== */}
                <div>
                    <Label className="text-base font-medium">Audio File *</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center mt-2">
                        <Music className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{track.audioFileName || "No audio file selected"}</p>
                            <p className="text-xs text-muted-foreground">Supported: MP3, WAV, FLAC (max 100MB)</p>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "audio/*";
                                    input.onchange = (e) => handleFileSelect(track.id, e as any);
                                    input.click();
                                }}
                            >
                                <Music className="h-4 w-4 mr-2" />
                                Choose Audio File
                            </Button>
                        </div>
                    </div>
                </div>

                {/* ========== Track Details (Title / Genre) ========== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Track Title *</Label>
                        <Input
                            value={track.title}
                            onChange={(e) => handleTrackChange(track.id, "title", e.target.value)}
                            placeholder="Enter track title"
                        />
                    </div>
                    <div>
                        <Label>Genre *</Label>
                        <Select value={track.genre || ""} onValueChange={(value: string) => handleTrackChange(track.id, "genre", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            <SelectContent>
                                {trackGenres.map((genre) => (
                                    <SelectItem key={genre} value={genre}>
                                        {genre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* ========== Type / Release Date ========== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Track Type</Label>
                        <Select
                            value={track.type || "Unreleased"}
                            onValueChange={(value: TrackType) => handleTrackChange(track.id, "type", value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Released">Released</SelectItem>
                                <SelectItem value="Unreleased">Unreleased</SelectItem>
                                <SelectItem value="Work In Progress">Work In Progress</SelectItem>
                                <SelectItem value="Demo">Demo</SelectItem>
                                <SelectItem value="Remix">Remix</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Release Date</Label>
                        <Input
                            type="date"
                            value={track.release_date || ""}
                            onChange={(e) => handleTrackChange(track.id, "release_date", e.target.value)}
                        />
                    </div>
                </div>

                {/* ========== Remix Credits / Copyright ========== */}
                <RemixCreditForm
                    track={track}
                    remixData={remixData}
                    onTrackChange={(field: string, value: any) => handleTrackChange(track.id, field as keyof TrackUploadData, value)}
                    onRemixDataChange={onRemixDataChange}
                />

                {/* ========== Lyrics ========== */}
                <div>
                    <Label>Lyrics (Optional)</Label>
                    <Textarea
                        value={track.lyrics || ""}
                        onChange={(e) => handleTrackChange(track.id, "lyrics", e.target.value)}
                        placeholder="Enter your lyrics here..."
                        rows={4}
                    />
                </div>

                {/* ========== Visibility ========== */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id={`track-${index}-public`}
                            checked={track.is_public || false}
                            onCheckedChange={(checked) => handleTrackChange(track.id, "is_public", checked)}
                        />
                        <Label htmlFor={`track-${index}-public`} className="text-sm font-medium">
                            Make this track public
                        </Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Public tracks can be discovered and played by other users. Private tracks are only visible to you.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default StudioTrackInfoCard;
