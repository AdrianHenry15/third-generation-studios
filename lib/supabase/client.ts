import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase-types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient<Database, "public"> = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, detectSessionInUrl: false, autoRefreshToken: true },
});
