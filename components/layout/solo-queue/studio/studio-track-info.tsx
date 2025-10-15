import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Music, X, Upload } from "lucide-react";
import Image from "next/image";
import RemixCreditForm from "./remix-credit-form";
import type { TrackUploadData, UploadMode, RemixUploadData } from "./studio-upload-form";
import { TrackCreditInsert } from "@/lib/types/database";
import { Constants } from "@/lib/types/supabase-types";

// Types
type TrackType = string;
type AlbumType = string;

interface IStudioTrackInfoProps {
    track: TrackUploadData;
    uploadMode: UploadMode;
    albumType?: string;
    index: number;
    tracks: TrackUploadData[];

    handleTrackChange: (id: string, field: keyof TrackUploadData, value: any) => void;
    removeTrack: (id: string) => void;
    handleFileSelect: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTrackImageSelect: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;

    remixData?: RemixUploadData;
    onRemixDataChange?: (remixData: RemixUploadData) => void;

    trackCreditData?: TrackCreditInsert;
    onTrackCreditChange?: (trackId: string, creditInfo: Partial<TrackCreditInsert>) => void;
}

const StudioTrackInfoCard: React.FC<IStudioTrackInfoProps> = ({
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
    trackCreditData,
    onTrackCreditChange,
}) => {
    const showCoverUpload = uploadMode === "single" || albumType === "Single";

    const handleCreditChange = (field: keyof TrackCreditInsert, value: string[]) => {
        if (onTrackCreditChange) {
            onTrackCreditChange(track.id, { [field]: value });
        }
    };

    const renderCreditInput = (label: string, field: keyof TrackCreditInsert, value: string[] = []) => (
        <div className="flex flex-col gap-1">
            <Label className="text-sm text-blue-400">{label}</Label>
            <Input
                type="text"
                placeholder={`Enter ${label.toLowerCase()} separated by commas`}
                value={value.join(", ")}
                onChange={(e) =>
                    handleCreditChange(
                        field,
                        e.target.value.split(",").map((s) => s.trim()),
                    )
                }
                className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30 rounded-lg text-white placeholder:text-neutral-400 transition"
            />
        </div>
    );

    // Use enum for track type options
    const trackTypeOptions = Constants.public.Enums.track_type;

    return (
        <Card
            key={track.id}
            className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 border-none shadow-2xl rounded-2xl overflow-hidden"
        >
            <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-gray-900/60 to-gray-800/60 px-6 py-4">
                <div>
                    <CardTitle className="text-white text-xl">
                        {uploadMode === "single" ? "Track Information" : `Track ${index + 1}`}
                    </CardTitle>
                    <CardDescription className="text-neutral-400">
                        {uploadMode === "single" ? "Details about your track" : `Details for track ${index + 1}`}
                    </CardDescription>
                </div>
                {uploadMode === "album" && tracks.length > 1 && (
                    <button
                        type="button"
                        onClick={() => removeTrack(track.id)}
                        className="ml-2 p-2 rounded-full bg-red-500/10 hover:bg-red-500/30 text-red-400 hover:text-red-200 transition"
                        title="Remove track"
                    >
                        <X size={18} />
                    </button>
                )}
            </CardHeader>

            <CardContent className="space-y-6 px-6 py-8">
                {/* Track cover upload */}
                {showCoverUpload && (
                    <div>
                        <Label className="text-neutral-300">Track Cover {uploadMode === "single" ? "*" : "(Optional)"}</Label>
                        <div className="flex items-center gap-4 mt-2">
                            {track.trackImageFile && (
                                <Image
                                    src={URL.createObjectURL(track.trackImageFile)}
                                    alt="track-cover"
                                    width={80}
                                    height={80}
                                    className="rounded-lg border border-neutral-700 shadow-md object-cover"
                                />
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*";
                                    input.onchange = (e) => handleTrackImageSelect(track.id, e as any);
                                    input.click();
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg shadow transition font-medium"
                            >
                                <Upload size={18} /> Choose Cover
                            </button>
                        </div>
                    </div>
                )}

                {/* Audio File */}
                <div>
                    <Label className="text-blue-400">Audio File *</Label>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-neutral-300 text-sm">
                            {track.audioFileName || <span className="italic text-neutral-500">No file selected</span>}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "audio/*";
                                input.onchange = (e) => handleFileSelect(track.id, e as any);
                                input.click();
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition font-medium"
                        >
                            <Music size={18} /> Choose Audio
                        </button>
                    </div>
                </div>

                {/* Track details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-blue-400">Title *</Label>
                        <Input
                            value={track.title}
                            onChange={(e) => handleTrackChange(track.id, "title", e.target.value)}
                            className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30 rounded-lg text-white placeholder:text-neutral-400 transition"
                        />
                    </div>
                    <div>
                        <Label className="text-blue-400">Genre *</Label>
                        <Input
                            value={track.genre || ""}
                            onChange={(e) => handleTrackChange(track.id, "genre", e.target.value)}
                            className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30 rounded-lg text-white placeholder:text-neutral-400 transition"
                        />
                    </div>
                    <div>
                        <Label className="text-blue-400">Type *</Label>
                        <select
                            value={track.type || ""}
                            onChange={(e) => handleTrackChange(track.id, "type", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white transition"
                        >
                            <option value="" disabled>
                                Select type
                            </option>
                            {trackTypeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Remix credits */}
                {remixData && onRemixDataChange && (
                    <RemixCreditForm
                        track={track}
                        remixData={remixData}
                        onRemixDataChange={onRemixDataChange}
                    />
                )}

                {/* Track credits */}
                {onTrackCreditChange && (
                    <div className="space-y-3 mt-4 bg-gray-800/60 rounded-xl p-4 border border-gray-700/40">
                        <h4 className="font-semibold text-blue-300 mb-2">Track Credits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderCreditInput("Performed By", "performed_by", trackCreditData?.performed_by ?? [])}
                            {renderCreditInput("Written By", "written_by", trackCreditData?.written_by ?? [])}
                            {renderCreditInput("Produced By", "produced_by", trackCreditData?.produced_by ?? [])}
                            {renderCreditInput("Remixed By", "remixed_by", trackCreditData?.remixed_by ?? [])}
                        </div>
                    </div>
                )}

                {/* Lyrics */}
                <div>
                    <Label className="text-blue-400">Lyrics</Label>
                    <textarea
                        value={track.lyrics || ""}
                        onChange={(e) => handleTrackChange(track.id, "lyrics", e.target.value)}
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30 rounded-lg text-white placeholder:text-neutral-400 transition p-2 mt-1"
                        placeholder="Paste lyrics here (optional)"
                    />
                </div>

                {/* Visibility */}
                <div className="flex items-center space-x-3 mt-2">
                    <Switch
                        checked={track.is_public || false}
                        onCheckedChange={(checked) => handleTrackChange(track.id, "is_public", checked)}
                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-700"
                    />
                    <Label className="text-neutral-200">Make this track public</Label>
                </div>
            </CardContent>
        </Card>
    );
};

export default StudioTrackInfoCard;
