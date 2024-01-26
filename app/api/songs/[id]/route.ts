import { NextResponse } from "next/server";
import prisma from "db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    // get song
    const song = await prisma.song.findUnique({
        where: {
            id: String(id),
        },
    });

    // Respond with the found song
    return NextResponse.json({ message: "Song successfully retrieved!", data: song });
}
