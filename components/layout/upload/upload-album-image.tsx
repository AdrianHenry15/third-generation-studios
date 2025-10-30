"use client";

import React, { useCallback, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface UploadImageItemProps {
    label?: string;
    onFileSelect: (file: File | null) => void;
    initialImageUrl?: string; // for existing images (edit mode)
}

export default function UploadAlbumImage({ label = "Upload Image", onFileSelect, initialImageUrl }: UploadImageItemProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(initialImageUrl ?? null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                alert("Only JPG, PNG, and WEBP images are allowed.");
                return;
            }

            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        },
        [onFileSelect],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const file = e.dataTransfer.files?.[0];
            if (!file) return;

            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                alert("Only JPG, PNG, and WEBP images are allowed.");
                return;
            }

            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        },
        [onFileSelect],
    );

    const handleRemove = useCallback(() => {
        setPreview(null);
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = "";
    }, [onFileSelect]);

    return (
        <div className="space-y-2 cursor-pointer">
            {label && <p className="text-sm text-neutral-400">{label}</p>}

            <div
                className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl transition-all duration-200 ${
                    isDragging ? "border-blue-500 bg-blue-500/10" : "border-neutral-700 hover:border-neutral-600 bg-neutral-900/30"
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                }}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                style={{ aspectRatio: "1 / 1" }}
            >
                {!preview ? (
                    <div className="flex flex-col items-center justify-center text-neutral-400 text-sm select-none">
                        <ImagePlus className="w-8 h-8 mb-2 text-neutral-500" />
                        <p className="text-neutral-400">Drag & drop or click to upload</p>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <Image
                            src={preview}
                            alt="Album Preview"
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
        </div>
    );
}
