import { NextRequest, NextResponse } from "next/server";
import prisma from "db";

export async function GET() {
    // Fetch websites from the Prisma MongoDB database
    const AllWebsites = await prisma.website.findMany({
        select: {
            id: true,
            img: true,
            title: true,
            description: true,
            releaseDate: true,
            link: true,
        },
    });

    // Respond with the fetched websites
    return NextResponse.json({ message: "Websites successfully fetched!", data: AllWebsites });
}

export async function POST(req: Request) {
    const { id, img, title, description, releaseDate, link } = await req.json();

    // create website
    const CreatedWebsite = await prisma.website.create({
        data: {
            id: id,
            img: img,
            title: title,
            description: description,
            releaseDate: releaseDate,
            link: link,
        },
    });

    // Respond with the created websites
    return NextResponse.json({ message: "Websites successfully created!", data: CreatedWebsite });
}

export async function PUT(req: Request) {
    const { id, img, title, description, releaseDate, link } = await req.json();

    // update website
    const UpdatedWebsite = await prisma.website.update({
        where: {
            id: id,
        },
        data: {
            img: img,
            title: title,
            description: description,
            releaseDate: releaseDate,
            link: link,
        },
    });

    // Respond with the created websites
    return NextResponse.json({ message: "Websites successfully updated!", data: UpdatedWebsite });
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    // delete website
    const DeletedWebsite = await prisma.website.delete({
        where: {
            id: id,
        },
    });

    // Respond with the deleted websites
    return NextResponse.json({ message: "Websites successfully deleted!", data: DeletedWebsite });
}
