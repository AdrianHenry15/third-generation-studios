import { createClient } from "@supabase/supabase-js";

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function refreshTrackUrl(trackUrl: string) {
    const { data, error } = await supabaseAdmin.storage.from("track-urls").createSignedUrl(trackUrl, 7 * 24 * 3600); // 1 week

    if (error) throw error;
    return data.signedUrl;
}
