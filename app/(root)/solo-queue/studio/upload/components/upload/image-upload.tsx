import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function ImageUpload({ setAlbumData }: { setAlbumData: (data: any) => void }) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAlbumData({
                albumImageFile: file,
                albumImageFileName: file.name,
            });
            setPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setAlbumData({
            albumImageFile: null,
            albumImageFileName: "",
        });
        setPreview(null);
    };

    return (
        <div className="flex flex-col">
            <label className="text-xs font-medium mb-2 text-gray-300 uppercase tracking-wide">Image</label>

            <div
                className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-colors duration-200
        ${preview ? "border-transparent bg-muted/10" : "border-gray-700 hover:border-gray-500 bg-gray-800/30"}`}
            >
                {preview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                        <Image
                            src={preview}
                            alt="Album Preview"
                            fill
                            quality={85}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover rounded-xl"
                        />
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-1 rounded-full text-white transition"
                            type="button"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400">Click or drag image here</p>
                        <p className="text-xs text-gray-500">PNG, JPG, or GIF up to 5MB</p>
                    </>
                )}

                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
        </div>
    );
}
