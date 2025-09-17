export type ProfileRole = "listener" | "admin" | "artist";
export interface IProfileProps {
    id: string;
    display_name: string;
    avatar_url: string;
    bio: string;
    role: ProfileRole;
    created_at: string;
    updated_at: string;
}
