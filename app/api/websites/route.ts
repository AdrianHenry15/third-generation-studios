import { NextResponse } from "next/server";
import prisma from "db";
import { auth } from "@clerk/nextjs";

export async function GET() {
    // Fetch websites from the Prisma MongoDB database
    const websites = await prisma.website.findMany({
        select: {
            img: true,
            title: true,
            description: true,
            release_date: true,
            link: true,
        },
    });

    // Respond with the fetched websites
    return NextResponse.json({ message: "Websites successfully fetched!", data: websites });
}

export async function POST(req: Request) {
    const { img, title, description, release_date, link } = await req.json();

    // if (!img || !title || !link) {
    //     throw new Error("Missing required fields: image, title, link");
    // }
    // create website
    const website = await prisma.website.create({
        data: {
            img: img,
            title: title,
            description: description,
            release_date: release_date,
            link: link,
        },
    });

    // Respond with the created websites
    return NextResponse.json({ message: "Websites successfully created!", data: website });
}
export async function PUT(req: Request) {
    const { id, img, title, description, release_date, link } = await req.json();

    // create website
    const website = await prisma.website.update({
        where: {
            id: id,
        },
        data: {
            img: img,
            title: title,
            description: description,
            release_date: release_date,
            link: link,
        },
    });

    // Respond with the created websites
    return NextResponse.json({ message: "Websites successfully created!", data: website });
}
