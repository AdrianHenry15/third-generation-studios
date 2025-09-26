"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/stores/auth-store";

export function useAuthListener() {
    const setSession = useAuthStore((s) => s.setSession);
    const setLoading = useAuthStore((s) => s.setLoading);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                setSession(data.session ?? null);
                setLoading(false);
                queryClient.setQueryData(["supabase-session"], data.session ?? null);

                console.log("✅ useAuthListener: Session set", {
                    hasSession: !!data.session,
                    userId: data.session?.user?.id,
                });
            } catch (error) {
                console.error("❌ useAuthListener: Session check failed", error);
                setLoading(false);
            }
        };

        // Initial session check
        checkSession();

        // Subscribe to auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session ?? null);
            queryClient.setQueryData(["supabase-session"], session ?? null);

            if (!session) {
                console.log("🧹 useAuthListener: Clearing user-related queries");
                queryClient.removeQueries({ queryKey: ["profiles"] });
            }

            // Force another session check to ensure consistency
            if (event === "SIGNED_IN") {
                setTimeout(checkSession, 100);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [setSession, setLoading]);
}
