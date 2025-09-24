import { supabase } from "./client";

type Bucket = "album-covers" | "avatars" | "track-urls";

/**
 * Uploads a file to the specified bucket and returns the public URL.
 */
export async function uploadFile(
    bucket: Bucket,
    file: File,
    folder: string, // e.g., albumId, artistId, trackId
): Promise<string> {
    const path = `${folder}/${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

    return urlData.publicUrl;
}

/**
 * Replace a file to the specified bucket
 */
export async function replaceFile(bucket: Bucket, folder: string, oldPath: string | null, newFile: File): Promise<string> {
    if (oldPath) await deleteFile(bucket, oldPath);
    return await uploadFile(bucket, newFile, folder);
}

/**
 * Deletes a file from a bucket.
 */
export async function deleteFile(bucket: Bucket, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
}
