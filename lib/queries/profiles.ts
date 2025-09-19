import { supabase } from "../supabase/client";

export async function fetchProfiles() {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) throw error;
    return data;
}

// Add profile helper function
export const getProfileById = async (userId: string, supabase: any) => {
    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();

    if (error) {
        console.error("Profile fetch error:", error);
        throw new Error("Could not fetch profile");
    }

    return profile;
};
