import { NextRequest, NextResponse } from "next/server";
import prisma from "db";

export async function GET() {
    // Fetch artists from the Prisma MongoDB database
    const artists = await prisma.artist.findMany({
        select: {
            id: true,
            img: true,
            title: true,
            genre: true,
            description: true,
            releaseDate: true,
            songs: true,
        },
    });

    // Respond with the fetched artists
    return NextResponse.json({ message: "artists successfully fetched!", data: artists });
}

export async function POST(req: Request) {
    const { id, img, title, genre, description, releaseDate, songs } = await req.json();

    // create artist
    const artist = await prisma.artist.create({
        data: {
            id: id,
            img: img,
            title: title,
            description: description,
            genre: genre,
            releaseDate: releaseDate,
            songs: songs,
        },
    });

    // Respond with the created artists
    return NextResponse.json({ message: "artists successfully created!", data: artist });
}

export async function PUT(req: Request) {
    const { id, img, title, genre, description, releaseDate, songs } = await req.json();

    // create artist
    const artist = await prisma.artist.update({
        where: {
            id: id,
        },
        data: {
            img: img,
            title: title,
            genre: genre,
            description: description,
            releaseDate: releaseDate,
            songs: songs,
        },
    });

    // Respond with the created artists
    return NextResponse.json({ message: "artists successfully updated!", data: artist });
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    // create artist
    const artist = await prisma.artist.delete({
        where: {
            id: id,
        },
    });

    // Respond with the created artists
    return NextResponse.json({ message: "artists successfully deleted!", data: artist });
}
