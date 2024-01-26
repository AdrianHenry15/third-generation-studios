import { NextResponse } from "next/server";
import prisma from "db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    // get artist
    const website = await prisma.artist.findUnique({
        where: {
            id: String(id),
        },
    });

    // Respond with the found artist
    return NextResponse.json({ message: "Artist successfully retrieved!", data: website });
}
