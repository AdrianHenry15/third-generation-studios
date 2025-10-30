import { NextResponse } from "next/server";

type Track = {
    id: string;
    title: string;
    artist?: string;
    createdAt: string;
};

const sampleTracks: Track[] = [
    { id: "1", title: "Demo Track 1", artist: "Studio", createdAt: new Date().toISOString() },
    { id: "2", title: "Demo Track 2", artist: "Studio", createdAt: new Date().toISOString() },
];

// GET /api/supabase/tracks
export async function GET() {
    return NextResponse.json({ data: sampleTracks });
}

// POST /api/supabase/tracks
// Accepts JSON body { title?: string, artist?: string } and returns created dummy track
export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const title = (body.title || "Untitled Track").toString();
        const artist = body.artist ? String(body.artist) : "Unknown Artist";

        const newTrack: Track = {
            id: Math.random().toString(36).slice(2, 10),
            title,
            artist,
            createdAt: new Date().toISOString(),
        };

        // This is a dummy route — no persistence. Echo back created object.
        return NextResponse.json({ data: newTrack }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
