export interface ITrackPlayProps {
    id: string;
    track_id: string;
    listener_id: string;
    played_at: string;
}

export interface ITrackLikeProps {
    id: string;
    track_id: string;
    listener_id: string;
    liked_at: string;
}
