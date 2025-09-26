import { v4 as uuidv4 } from "uuid";
import { supabase } from "./client";

// Types of supported buckets
type BucketName = "album-covers" | "avatars" | "track-urls";

interface UploadOptions {
    bucket: BucketName;
    file: File | Blob;
    path?: string; // optional custom path
    userId?: string; // for structured paths
}

/**
 * Uploads a file to the specified Supabase storage bucket.
 * Returns the public URL if successful.
 */
export async function uploadFile({ bucket, file, path, userId }: UploadOptions): Promise<string | null> {
    const fileExt = (file instanceof File ? file.name.split(".").pop() : "bin") || "bin";
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = path || (userId ? `${userId}/${fileName}` : fileName);

    const { error } = await supabase.storage.from(bucket).upload(filePath, file);

    if (error) {
        console.error("Error uploading file:", error.message);
        return null;
    }

    return getPublicUrl(bucket, filePath);
}

/**
 * Returns the public URL for a file in a bucket.
 */
export function getPublicUrl(bucket: BucketName, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

/**
 * Deletes a file from a bucket.
 */
export async function deleteFile(bucket: BucketName, path: string): Promise<boolean> {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
        console.error("Error deleting file:", error.message);
        return false;
    }
    return true;
}

/**
 * Lists all files in a given folder/path inside a bucket.
 */
export async function listFiles(bucket: BucketName, folder: string = "") {
    const { data, error } = await supabase.storage.from(bucket).list(folder);

    if (error) {
        console.error("Error listing files:", error.message);
        return [];
    }
    return data;
}
