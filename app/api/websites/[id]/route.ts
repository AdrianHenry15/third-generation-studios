import { NextResponse } from "next/server";
import prisma from "db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    // if (!id) {
    //     return Response.json({ message: "Missing required field: id" });
    // }
    // get website
    const website = await prisma.website.findUnique({
        where: {
            id: String(id),
        },
    });

    // Respond with the found website
    return NextResponse.json({ message: "Website successfully retrieved!", data: website });
}
