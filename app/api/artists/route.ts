import { NextRequest, NextResponse } from "next/server";
import prisma from "db";

export async function GET() {
    // Fetch artists from the Prisma MongoDB database
    const AllArtists = await prisma.artist.findMany({
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
    return NextResponse.json({ message: "artists successfully fetched!", data: AllArtists });
}

export async function POST(req: Request) {
    const { id, img, title, genre, description, releaseDate, songs } = await req.json();

    // create artist
    const CreatedArtist = await prisma.artist.create({
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
    return NextResponse.json({ message: "artists successfully created!", data: CreatedArtist });
}

export async function PUT(req: Request) {
    const { id, img, title, genre, description, releaseDate, songs } = await req.json();

    // update artist
    const UpdatedArtist = await prisma.artist.update({
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

    // Respond with the updated artists
    return NextResponse.json({ message: "artists successfully updated!", data: UpdatedArtist });
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    // delete artist
    const DeletedArtist = await prisma.artist.delete({
        where: {
            id: id,
        },
    });

    // Respond with the deleted artists
    return NextResponse.json({ message: "artists successfully deleted!", data: DeletedArtist });
}
