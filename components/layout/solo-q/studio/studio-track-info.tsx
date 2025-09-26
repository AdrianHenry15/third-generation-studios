import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TrackType, AlbumType } from "@/lib/solo-q-types/music-types";
import { Music, X, Upload, Image } from "lucide-react";
import React from "react";
import { TrackUploadData, UploadMode } from "./studio-upload-form";

interface IStudioTrackInfoProps {
    track: TrackUploadData;
    uploadMode: UploadMode;
    albumType?: AlbumType; // Use the actual AlbumType from music-types
    index: number;
    handleTrackChange: (id: string, field: keyof TrackUploadData, value: string | number | TrackType) => void;
    removeTrack: (id: string) => void;
    tracks: TrackUploadData[];
    handleFileSelect: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTrackCoverSelect: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudioTrackInfoCard = (props: IStudioTrackInfoProps) => {
    const { track, tracks, uploadMode, albumType, index, handleTrackChange, handleFileSelect, handleTrackCoverSelect, removeTrack } = props;

    // Show cover upload for single mode or when album type is "Single"
    const showCoverUpload = uploadMode === "single" || albumType === "Single";

    return (
        <Card key={track.id}>
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
                {/* Cover Image Upload - Only for singles or Single album types */}
                {showCoverUpload && (
                    <div>
                        <Label className="text-lg font-semibold">
                            Track Cover {uploadMode === "single" ? "*" : "(Optional)"}
                        </Label>
                        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center mt-2">
                            <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <div className="space-y-3">
                                <p className="text-sm text-muted-foreground font-medium">
                                    {track.coverFileName || "No cover image selected"}
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
                                        input.onchange = (e) => handleTrackCoverSelect(track.id, e as any);
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

                {/* Audio File Upload - Secondary */}
                <div>
                    <Label className="text-base font-medium">Audio File *</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center mt-2">
                        <Music className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{track.fileName || "No audio file selected"}</p>
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

                {/* Track Details */}
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
                        <Input
                            value={track.genre}
                            onChange={(e) => handleTrackChange(track.id, "genre", e.target.value)}
                            placeholder="e.g., Hip Hop, R&B, Pop"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Track Type</Label>
                        <Select value={track.type} onValueChange={(value: TrackType) => handleTrackChange(track.id, "type", value)}>
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
                            value={track.release_date}
                            onChange={(e) => handleTrackChange(track.id, "release_date", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label>Copyright Information</Label>
                    <Input
                        value={track.copyright}
                        onChange={(e) => handleTrackChange(track.id, "copyright", e.target.value)}
                        placeholder="© 2024 Artist Name"
                    />
                </div>

                <div>
                    <Label>Spotify Track ID</Label>
                    <Input
                        value={track.spotify_id}
                        onChange={(e) => handleTrackChange(track.id, "spotify_id", e.target.value)}
                        placeholder="Optional - for linking to Spotify"
                    />
                </div>

                <div>
                    <Label>Lyrics (Optional)</Label>
                    <Textarea
                        value={track.lyrics}
                        onChange={(e) => handleTrackChange(track.id, "lyrics", e.target.value)}
                        placeholder="Enter your lyrics here..."
                        rows={4}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default StudioTrackInfoCard;
