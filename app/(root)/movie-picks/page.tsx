import MovieSplash from "@/components/layout/movies/movie-splash";
import requests from "@/lib/movie-requests";
import Row from "@/components/row";
import { ItemType } from "@/lib/types";

export default function MoviePicksPage() {
    return (
        <div className="bg-black h-full">
            <MovieSplash />
            <Row itemType={ItemType.MOVIE} title="Up Coming" fetchURL={requests.requestUpcoming} />
            <Row itemType={ItemType.MOVIE} title="Popular" fetchURL={requests.requestPopular} />
            <Row itemType={ItemType.MOVIE} title="Trending" fetchURL={requests.requestTrending} />
            <Row itemType={ItemType.MOVIE} title="Top Rated" fetchURL={requests.requestTopRated} />
            <Row itemType={ItemType.MOVIE} title="Now Playing" fetchURL={requests.requestNowPlaying} />
        </div>
    );
}
