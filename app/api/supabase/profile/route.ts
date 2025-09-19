import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();

        // Get authenticated user
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        console.log("API: User check:", { userId: user?.id, authError });

        if (authError || !user) {
            console.log("API: Unauthorized access");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch user profile
        const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

        console.log("API: Profile query result:", { profile, error });

        if (error) {
            console.error("API: Error fetching profile:", error);
            return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
        }

        // console.log("API: Returning profile:", profile);
        return NextResponse.json({ profile });
    } catch (error) {
        console.error("API: Unexpected error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const supabase = await createClient();

        // Get authenticated user
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const updates = await request.json();

        // Validate updates
        const allowedFields = ["username", "bio", "avatar_url"];
        const filteredUpdates = Object.keys(updates)
            .filter((key) => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = updates[key];
                return obj;
            }, {} as any);

        // Update profile
        const { data: profile, error } = await supabase
            .from("profiles")
            .update({
                ...filteredUpdates,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            console.error("Error updating profile:", error);
            return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
        }

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
