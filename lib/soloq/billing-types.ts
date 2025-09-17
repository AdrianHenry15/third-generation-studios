export interface IArtistSubscriptionProps {
    id: string;
    artist_id: string;
    plan_id: string;
    active: boolean;
    started_at: string;
    expires_at?: string;
    created_at: string;
    updated_at: string;
}

export interface IListenerSubscriptionProps {
    id: string;
    listener_id: string;
    plan_id: string;
    active: boolean;
    started_at: string;
    expires_at?: string;
    created_at: string;
    updated_at: string;
}
