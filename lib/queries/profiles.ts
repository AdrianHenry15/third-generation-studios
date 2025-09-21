import { supabase } from "../supabase/client";
import type { IProfileProps } from "../solo-q-types/public-types";

export async function fetchProfiles(): Promise<IProfileProps[]> {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) throw error;
    return data as IProfileProps[];
}

// Add profile helper function
export const getProfileById = async (userId: string): Promise<IProfileProps | null> => {
    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();

    if (error) {
        console.error("Profile fetch error:", error);
        throw new Error("Could not fetch profile");
    }

    return (profile as IProfileProps) ?? null;
};

// New: fetch current auth user and their profile
export const fetchCurrentUserData = async (): Promise<{ authUser: any; profile: IProfileProps | null }> => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!user) return { authUser: null, profile: null };

    const profile = await getProfileById(user.id);
    return { authUser: user, profile };
};

// New: fetch current user plan data
export const fetchCurrentUserPlanData = async (): Promise<{
    profile: IProfileProps | null;
}> => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!user) {
        return { profile: null };
    }

    // Profile
    const profile = await getProfileById(user.id);

    // Subscription tier (fallback to null if no record)
    let subscription: { tier: string } | null = null;
    try {
        const { data: subData, error: subError } = await supabase.from("subscriptions").select("tier").eq("user_id", user.id).maybeSingle();
        if (!subError && subData) subscription = { tier: subData.tier as string };
    } catch {
        // ignore, treat as no subscription
    }

    // Image usage count (count images owned by the user)
    let imagesCount = 0;
    try {
        const { count, error: countError } = await supabase
            .from("images")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);
        if (!countError && typeof count === "number") imagesCount = count;
    } catch {
        // ignore, default to 0
    }

    return { profile };
};

// Helpers for 30-day update window
type UpdateEligibility = { canUpdate: boolean; daysRemaining: number };
const diffInDays = (fromISO?: string | null) => {
    if (!fromISO) return Infinity;
    const from = new Date(fromISO).getTime();
    const now = Date.now();
    const delta = now - from;
    return Math.floor(delta / (1000 * 60 * 60 * 24));
};
const computeEligibility = (lastUpdatedISO?: string | null, windowDays = 30): UpdateEligibility => {
    const daysSince = diffInDays(lastUpdatedISO);
    const canUpdate = daysSince >= windowDays;
    return { canUpdate, daysRemaining: canUpdate ? 0 : Math.max(0, windowDays - daysSince) };
};

// New: canUpdateUsername based on profile.updated_at (30-day window)
export const canUpdateUsername = async (profileId: string): Promise<UpdateEligibility> => {
    const { data, error } = await supabase.from("profiles").select("updated_at").eq("id", profileId).maybeSingle();
    if (error) {
        console.error("canUpdateUsername error:", error);
        return { canUpdate: false, daysRemaining: 30 };
    }
    return computeEligibility(data?.updated_at);
};

// New: update username in profiles
export const updateUsername = async (profileId: string, newUsername: string): Promise<void> => {
    const { error } = await supabase
        .from("profiles")
        .update({ username: newUsername, updated_at: new Date().toISOString() })
        .eq("id", profileId);
    if (error) throw error;
};

// New: canUpdateEmail based on auth user's updated_at (30-day window)
export const canUpdateEmail = async (_profileId: string): Promise<UpdateEligibility> => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error || !user) {
        console.error("canUpdateEmail error:", error);
        return { canUpdate: false, daysRemaining: 30 };
    }
    // Supabase user has 'updated_at' ISO string
    return computeEligibility((user as any)?.updated_at);
};

// New: update email via Supabase Auth
export const updateEmail = async (newEmail: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) throw error;
};
