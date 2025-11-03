"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileUpdate } from "@/hooks/public/use-profiles";
import { ProfileTableType } from "@/lib/types/public-types";

interface ProfileFormProps {
    profile: ProfileTableType;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const { user } = useAuthStore();
    const { mutate: updateProfile, isPending: isUpdatingProfile } = useProfileUpdate();
    const [formData, setFormData] = useState({
        username: profile.username || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || "",
        email: user?.email || "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const router = useRouter();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            setMessage({ type: "error", text: "Please select a valid image file (JPEG, PNG, or WebP)" });
            return;
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setMessage({ type: "error", text: "File size must be less than 5MB" });
            return;
        }

        setSelectedFile(file);
        setMessage(null);

        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const uploadAvatarToStorage = async (file: File): Promise<string> => {
        if (!user?.id) throw new Error("User not authenticated");

        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // Upload file to Supabase storage
        const { data, error } = await supabase.storage.from("profile-images").upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

        if (error) {
            console.error("Storage upload error:", error);
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        // Get public URL
        const {
            data: { publicUrl },
        } = supabase.storage.from("profile-images").getPublicUrl(filePath);

        return publicUrl;
    };

    const handleEmailUpdate = async () => {
        if (formData.email === user?.email) {
            setMessage({ type: "error", text: "New email must be different from current email" });
            return;
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setMessage({ type: "error", text: "Please enter a valid email address" });
            return;
        }

        setIsUpdatingEmail(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                email: formData.email,
            });

            if (error) throw error;

            setMessage({
                type: "success",
                text: "Email update requested! Please check both your old and new email for confirmation links.",
            });
        } catch (error: any) {
            console.error("Error updating email:", error);
            setMessage({
                type: "error",
                text: error.message || "Failed to update email. Please try again.",
            });
        } finally {
            setIsUpdatingEmail(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            let avatarUrl = formData.avatar_url;

            // Upload new avatar if file is selected
            if (selectedFile) {
                setIsUploadingAvatar(true);
                try {
                    avatarUrl = await uploadAvatarToStorage(selectedFile);
                } catch (uploadError: any) {
                    setMessage({ type: "error", text: uploadError.message });
                    return;
                } finally {
                    setIsUploadingAvatar(false);
                }
            }

            // Update profile with new data using the proper hook signature
            const profileData = {
                username: formData.username,
                bio: formData.bio,
                avatar_url: avatarUrl,
            };

            updateProfile({
                id: profile.id,
                values: profileData,
            });

            // Handle success directly since we can't pass callbacks
            // Update local state
            setFormData((prev) => ({ ...prev, avatar_url: avatarUrl }));

            // Clear file selection and preview
            setSelectedFile(null);
            setPreviewUrl(null);

            setMessage({ type: "success", text: "Profile updated successfully!" });
            router.refresh();
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setIsLoading(false);
        }
    };

    // Clean up preview URL on unmount
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const currentAvatarUrl = previewUrl || formData.avatar_url;

    return (
        <div className="bg-neutral-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>

            {/* User Auth Info - Read Only */}
            <div className="mb-6 p-4 bg-neutral-800 rounded-lg border border-neutral-700">
                <h4 className="text-sm font-medium text-neutral-300 mb-3">Account Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-neutral-400">Account Created:</span>
                        <span className="ml-2 text-neutral-200">
                            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Not available"}
                        </span>
                    </div>
                    <div>
                        <span className="text-neutral-400">Last Sign In:</span>
                        <span className="ml-2 text-neutral-200">
                            {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "Not available"}
                        </span>
                    </div>
                    <div>
                        <span className="text-neutral-400">Email Confirmed:</span>
                        <span className={`ml-2 ${user?.email_confirmed_at ? "text-green-400" : "text-yellow-400"}`}>
                            {user?.email_confirmed_at ? "Yes" : "Pending"}
                        </span>
                    </div>
                </div>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-lg mb-6 ${
                        message.type === "success" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field - separate from profile update */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="your@email.com"
                        />
                        <button
                            type="button"
                            onClick={handleEmailUpdate}
                            disabled={isUpdatingEmail || formData.email === user?.email}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors text-sm"
                        >
                            {isUpdatingEmail ? "Updating..." : "Update Email"}
                        </button>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                        Changing your email will require confirmation from both your old and new email addresses.
                    </p>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "") })}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        minLength={3}
                        maxLength={30}
                    />
                    <p className="text-xs text-neutral-400 mt-1">3-30 characters, letters, numbers, underscores, and hyphens only</p>
                </div>

                {/* Avatar Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">Avatar Image</label>

                    {/* Current/Preview Avatar */}
                    {currentAvatarUrl && (
                        <div className="mb-4">
                            <Image
                                src={currentAvatarUrl}
                                alt="Avatar preview"
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full object-cover border border-neutral-600"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                            {selectedFile && <p className="text-xs text-neutral-400 mt-1">New image selected: {selectedFile.name}</p>}
                        </div>
                    )}

                    {/* File Input */}
                    <input
                        type="file"
                        id="avatar_file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <p className="text-xs text-neutral-400 mt-1">Upload a new avatar image (JPEG, PNG, or WebP, max 5MB)</p>
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                        placeholder="Tell us about yourself..."
                        maxLength={500}
                    />
                    <p className="text-xs text-neutral-400 mt-1">{(formData.bio || "").length}/500 characters</p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || isUploadingAvatar || isUpdatingProfile}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                    >
                        {isUploadingAvatar ? "Uploading..." : isLoading || isUpdatingProfile ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
