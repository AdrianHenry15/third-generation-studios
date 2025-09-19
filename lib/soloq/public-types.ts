export type ProfileRole = "listener" | "admin" | "artist";
export interface IProfileProps {
    id: string;
    username: string;
    avatar_url: string;
    bio: string;
    role: ProfileRole;
    created_at: string;
    updated_at: string;
}
