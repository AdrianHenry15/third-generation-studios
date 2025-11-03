"use client";

import AlbumUploadUpdateForm from "@/app/(root)/solo-queue/studio/upload/components/upload/forms/album-upload-form";

export default function StudioUploadPage() {
    // -------------------- RENDER --------------------
    return (
        <>
            <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Upload Music</h1>
                    <p className="text-muted-foreground">Share your music with the Solo-Queue community</p>
                </header>

                <AlbumUploadUpdateForm />
            </div>
        </>
    );
}
