import prisma from "../db";
import { ArtistType, SongType, WebsiteType } from "../lib/types";
import { Artists, ClientProjects, JafarriProjects, PersonalProjects, SchoolProjects, SearchOriginalProjects } from "../lib/projects";

// Import your images here

// Import your data here

async function seedArtists(artists: ArtistType[]) {
    for (const artist of artists) {
        await prisma.artist.createMany({
            data: {
                id: artist.id,
                img: artist.img,
                title: artist.title,
                description: artist.description || "",
                genre: artist.genre || "",
                releaseDate: artist.release_date,
            },
        });
    }
}

async function seedMusicProjects(musicProjects: SongType[]) {
    for (const musicProject of musicProjects) {
        await prisma.song.createMany({
            data: {
                id: musicProject.id,
                img: musicProject.img,
                title: musicProject.title,
                albumName: musicProject.album_name || "",
                artist: musicProject.artist,
                genre: musicProject.genre || "",
                releaseDate: musicProject.release_date,
                duration: musicProject.duration,
                plays: musicProject.plays,
                song: musicProject.song,
            },
        });
    }
}

async function seedWebsiteProjects(websiteProjects: WebsiteType[]) {
    for (const websiteProject of websiteProjects) {
        await prisma.website.createMany({
            data: {
                id: websiteProject.id,
                img: websiteProject.img,
                title: websiteProject.title,
                description: websiteProject.description,
                releaseDate: websiteProject.release_date,
                link: websiteProject.link,
            },
        });
    }
}

async function seedData() {
    // Seed artists
    await seedArtists(Artists);

    // Seed music projects
    await seedMusicProjects(JafarriProjects);
    await seedMusicProjects(SearchOriginalProjects);

    // Seed website projects
    await seedWebsiteProjects(PersonalProjects);
    await seedWebsiteProjects(SchoolProjects);
    await seedWebsiteProjects(ClientProjects);
}

async function main() {
    try {
        await seedData();
        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
