import React, { useCallback } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { RemixUploadData } from "./studio-upload-form";

interface OriginalCredit {
    id: string;
    name: string;
}

interface RemixCreditFormProps {
    track: any;
    remixData?: RemixUploadData;
    onTrackChange?: (field: string, value: any) => void;
    onRemixDataChange?: (remixData: RemixUploadData) => void;
}

const RemixCreditForm: React.FC<RemixCreditFormProps> = ({ track, remixData, onTrackChange, onRemixDataChange }) => {
    const isRemix = track.type === "Remix";

    // Convert between our UI format (with roles) and database format (just names)
    const currentRemixData = {
        original_song: remixData?.original_song || "",
        url: remixData?.url || "",
        original_artists: remixData?.original_artists || [],
        additional_artists: remixData?.additional_artists || [],
    };

    const updateRemixData = useCallback(
        (field: string, value: any) => {
            onRemixDataChange?.({ ...currentRemixData, [field]: value });
        },
        [currentRemixData, onRemixDataChange],
    );

    const addOriginalCredit = useCallback(() => {
        const newArtists = [...currentRemixData.original_artists, ""];
        updateRemixData("original_artists", newArtists);
    }, [currentRemixData.original_artists, updateRemixData]);

    const updateOriginalCredit = useCallback(
        (creditIndex: number, value: string) => {
            const updatedArtists = [...currentRemixData.original_artists];
            updatedArtists[creditIndex] = value;
            updateRemixData(
                "original_artists",
                updatedArtists.filter((name) => name.trim() !== ""),
            );
        },
        [currentRemixData.original_artists, updateRemixData],
    );

    const removeOriginalCredit = useCallback(
        (creditIndex: number) => {
            const updatedArtists = currentRemixData.original_artists.filter((_, index) => index !== creditIndex);
            updateRemixData("original_artists", updatedArtists);
        },
        [currentRemixData.original_artists, updateRemixData],
    );

    return (
        <div className="space-y-4">
            {isRemix && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        <Label className="text-sm font-semibold text-blue-700">Remix Information</Label>
                    </div>

                    <div>
                        <Label>Original Song Title *</Label>
                        <Input
                            value={currentRemixData.original_song}
                            onChange={(e) => updateRemixData("original_song", e.target.value)}
                            placeholder="Enter the original song title"
                        />
                    </div>

                    <div>
                        <Label>Original Song Link (Optional)</Label>
                        <Input
                            type="url"
                            value={currentRemixData.url || ""}
                            onChange={(e) => updateRemixData("url", e.target.value)}
                            placeholder="https://spotify.com/track/... or YouTube link"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Link to the original song on Spotify, YouTube, or other platforms
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <Label className="text-sm font-medium">Original Artists *</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addOriginalCredit}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add Artist
                            </Button>
                        </div>

                        {currentRemixData.original_artists.length > 0 ? (
                            <div className="space-y-3">
                                {currentRemixData.original_artists.map((artistName, index) => (
                                    <div key={index} className="flex gap-2 items-end">
                                        <div className="flex-1">
                                            <Label className="text-xs">Artist Name</Label>
                                            <Input
                                                value={artistName}
                                                onChange={(e) => updateOriginalCredit(index, e.target.value)}
                                                placeholder="Original artist name"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeOriginalCredit(index)}
                                            className="h-9 w-9 p-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground italic">
                                No original artists added yet. Click "Add Artist" to add the original song artists.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RemixCreditForm;
