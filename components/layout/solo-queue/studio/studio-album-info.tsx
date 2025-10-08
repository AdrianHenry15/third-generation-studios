import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { AlbumUploadData } from "./studio-upload-form";
import type { Database } from "@/lib/types/supabase-types";

// Use Supabase generated types
type AlbumType = Database["public"]["Enums"]["album_type"];

interface IStudioAlbumInfoProps {
    albumData: AlbumUploadData;
    handleAlbumDataChange: (field: keyof AlbumUploadData, value: string | AlbumType | File | undefined) => void;
    handleAlbumImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudioAlbumInfo: React.FC<IStudioAlbumInfoProps> = ({ albumData, handleAlbumDataChange, handleAlbumImageSelect }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Album Information</CardTitle>
                <CardDescription>Details about your album or EP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Album Cover Upload - Top Priority */}
                <div>
                    <Label className="text-lg font-semibold">Album Cover</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center mt-2">
                        <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground font-medium">
                                {albumData.albumImageFileName || "No cover image selected"}
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
                                    input.onchange = (event) =>
                                        handleAlbumImageSelect(event as unknown as React.ChangeEvent<HTMLInputElement>);
                                    input.click();
                                }}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Choose Cover Image
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Album Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="album_name">Album Name *</Label>
                        <Input
                            id="album_name"
                            value={albumData.name}
                            onChange={(e) => handleAlbumDataChange("name", e.target.value)}
                            placeholder="Enter album name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="album_type">Album Type</Label>
                        <Select value={albumData.type} onValueChange={(value: AlbumType) => handleAlbumDataChange("type", value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="EP">EP</SelectItem>
                                <SelectItem value="Album">Album</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="album_release_date">Album Release Date</Label>
                    <Input
                        id="album_release_date"
                        type="date"
                        value={albumData.release_date}
                        onChange={(e) => handleAlbumDataChange("release_date", e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default StudioAlbumInfo;
