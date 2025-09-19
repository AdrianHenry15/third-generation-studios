"use client";

import ProfileForm from "@/components/layout/solo-q/profile-form";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SoloQProfilePage() {
    const { user, profile, loading, profileLoading } = useSupabaseAuth();
    const router = useRouter();

    // Debug logging
    console.log("Profile Page State:", {
        user: !!user,
        profile: !!profile,
        loading,
        profileLoading,
    });

    useEffect(() => {
        // Only redirect if we're done loading and there's no user
        if (!loading && !user) {
            console.log("Redirecting to sign-in - no user found");
            router.push("/sign-in");
        }
    }, [user, loading, router]);

    // Show loading while checking auth or fetching profile
    if (loading) {
        return (
            <div className="text-white flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading authentication...</p>
                </div>
            </div>
        );
    }

    // Show loading while fetching profile data
    if (profileLoading) {
        return (
            <div className="text-white flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    // User is authenticated but no profile data
    if (user && !profile) {
        return (
            <div className="text-white max-w-4xl mx-auto p-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
                    <p className="text-neutral-400 mb-4">We couldn't find your profile data. This might be because:</p>
                    <ul className="text-left text-neutral-400 mb-6 max-w-md mx-auto">
                        <li>• Your profile hasn't been created yet</li>
                        <li>• There was an error fetching your data</li>
                        <li>• Database connection issues</li>
                    </ul>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // No user (should have been redirected by useEffect)
    if (!user) {
        return (
            <div className="text-white">
                <h1 className="text-4xl font-bold">Authentication Required</h1>
                <p className="text-red-400">Please sign in to view your profile</p>
            </div>
        );
    }

    // Success state - user and profile both exist
    return (
        <div className="text-white max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
                <p className="text-neutral-400 text-lg">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-neutral-900 rounded-lg p-6">
                        <div className="text-center">
                            <Image
                                src={profile!.avatar_url || "/user-default-image.png"}
                                alt={profile!.username}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                width={96}
                                height={96}
                            />
                            <h2 className="text-xl font-semibold">{profile!.username}</h2>
                            <span className="inline-block px-3 py-1 bg-blue-600 text-xs rounded-full mt-2 capitalize">{profile!.role}</span>
                            <p className="text-neutral-400 text-sm mt-2">
                                Member since {new Date(profile!.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <ProfileForm profile={profile!} />
                </div>
            </div>
        </div>
    );
}
