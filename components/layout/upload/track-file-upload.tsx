import { useState } from "react";
import { Music, Upload, X } from "lucide-react";
import { TrackUploadData, TrackWithRelations } from "@/lib/types/database";
import { useUploadFormStore } from "@/stores/upload-form-store";
import { getAudioDuration } from "@/hooks/storage/use-music-storage";

export default function TrackFileUpload({ track }: { track: TrackUploadData }) {
    const updateTrack = useUploadFormStore((state) => state.updateTrack);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Immediately reset so selecting same file again triggers change
        e.target.value = "";

        // Set the file name for display
        setFileName(file.name);

        try {
            const duration = await getAudioDuration(file);
            updateTrack(track.id, {
                audioFile: file,
                title: file.name.replace(/\.[^/.]+$/, ""),
                duration,
            });
        } catch (err) {
            console.error("Error reading file:", err);
            // Clear fileName on error
            setFileName(null);
        }
    };

    const clearFile = () => {
        updateTrack(track.id, { audioFile: undefined, duration: undefined });
        setFileName(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={`track-file-${track.id}`} className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                Track File
            </label>

            <div
                className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-colors duration-200 ${
                    fileName ? "border-transparent bg-muted/10" : "border-gray-700 hover:border-gray-500 bg-gray-800/30"
                }`}
            >
                {fileName ? (
                    <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-gray-800/40 border border-gray-700">
                        <div className="flex items-center gap-2">
                            <Music className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-200 truncate">{fileName}</span>
                        </div>
                        <button onClick={clearFile} type="button" className="p-1 rounded-full hover:bg-gray-700 transition">
                            <X size={16} className="text-gray-300" />
                        </button>
                    </div>
                ) : (
                    <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400">Click or drag to upload</p>
                        <p className="text-xs text-gray-500">MP3, WAV, or FLAC up to 10MB</p>
                    </>
                )}

                <input
                    id={`track-file-${track.id}`}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}
