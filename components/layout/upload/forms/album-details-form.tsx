"use client";
import React from "react";
import { useUploadFormStore } from "@/stores/upload-form-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadAlbumImage from "../upload-album-image";

export default function AlbumDetailsForm() {
    const { albumData, setAlbumData, setTracks, tracks } = useUploadFormStore();

    // Optimized handler: updates album and all tracks' release_date
    const handleTrackAlbumReleaseDataChange = (field: string, value: string) => {
        setAlbumData({ [field]: value });
        if (field === "release_date") {
            setTracks(tracks.map((track) => ({ ...track, release_date: value })));
        }
    };

    return (
        <div className="space-y-4">
            {/* Image */}
            {albumData.type === "Album" && (
                <UploadAlbumImage
                    onFileSelect={(file) =>
                        setAlbumData({
                            ...albumData,
                            albumImageFile: file!,
                            albumImageFileName: file ? file.name : "",
                        })
                    }
                />
            )}
            {albumData.type === "Album" && (
                <div>
                    <Label htmlFor="name">Album Name</Label>
                    <Input
                        id="name"
                        value={albumData.name}
                        onChange={(e) => handleTrackAlbumReleaseDataChange("name", e.target.value)}
                        placeholder="Enter album name"
                    />
                </div>
            )}

            <div>
                <Label htmlFor="release_date">Release Date</Label>
                <Input
                    id="release_date"
                    type="date"
                    value={albumData.release_date || new Date().toISOString().slice(0, 10)}
                    onChange={(e) => handleTrackAlbumReleaseDataChange("release_date", e.target.value)}
                />
            </div>
        </div>
    );
}
