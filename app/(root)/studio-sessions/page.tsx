import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata } from "@/features/marketing/site";
import { studioSessions } from "@/features/marketing/studio-sessions";

const description =
    "A monthly playlist from Third Generation Studios. We follow Spotify recommendations, save the songs we like, and put together a mix that feels right for the studio.";

const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
});

export const metadata = pageMetadata("/studio-sessions", "Studio Sessions", description);

export default function StudioSessionsPage() {
    const artistUrl = process.env.STUDIO_SESSIONS_ARTIST_URL;
    const FeaturedArtistCard = artistUrl ? "a" : "div";
    const sessions = [...studioSessions].sort((a, b) => b.month.localeCompare(a.month));

    return (
        <DetailPage title="Studio Sessions" intro={description}>
            <section aria-labelledby="featured-artist">
                <h2 id="featured-artist" className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Featured Artist
                </h2>

                <FeaturedArtistCard
                    href={artistUrl}
                    className={`block rounded-2xl border border-green-400/25 bg-green-400/5 p-6 ${
                        artistUrl
                            ? "transition hover:border-green-400/60 hover:bg-green-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
                            : ""
                    }`}
                >
                    <h3 className="text-3xl font-bold tracking-tight text-white">Anjin Iso</h3>
                    <p className="mt-3 text-gray-300">
                        Start with <cite>“let’s see what happens”</cite>, our featured track for Studio Sessions Tryouts.
                    </p>
                    {artistUrl && <span className="mt-4 block text-sm font-semibold">Anjin Iso on Spotify →</span>}
                </FeaturedArtistCard>
            </section>

            <section aria-labelledby="monthly-playlists" className="pt-8">
                <h2 id="monthly-playlists" className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Monthly Playlists
                </h2>
                <p className="mb-5 text-gray-300">
                    Each month, we start with whatever Spotify puts in front of us and see where it takes us. If a song fits the mood, it
                    goes in the mix.
                </p>
                {sessions.length === 0 ? (
                    <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-300">
                        The first Studio Sessions playlist is coming soon.
                    </p>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {sessions.map(({ month, title, spotifyUrl }) => (
                            <li key={month}>
                                <a
                                    href={spotifyUrl}
                                    className="block h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-green-400/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
                                >
                                    <time dateTime={month} className="text-sm text-purple-300">
                                        {monthFormatter.format(new Date(`${month}-01T00:00:00Z`))}
                                    </time>
                                    <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
                                    <span className="mt-3 block text-sm font-semibold">Listen on Spotify →</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </DetailPage>
    );
}
