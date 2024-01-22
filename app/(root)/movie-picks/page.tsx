import MovieSplash from "@/components/layout/movies/movie-splash";
import MovieRequests from "@/lib/movie-requests";
import Row from "@/components/row";
import { ItemType } from "@/lib/types";

export default function MoviePicksPage() {
    return (
        <div className="bg-black h-full">
            <MovieSplash />
            <Row itemType={ItemType.MOVIE} title="Up Coming" fetchURL={MovieRequests.requestUpcoming} />
            <Row itemType={ItemType.MOVIE} title="Popular" fetchURL={MovieRequests.requestPopular} />
            <Row itemType={ItemType.MOVIE} title="Trending" fetchURL={MovieRequests.requestTrending} />
            <Row itemType={ItemType.MOVIE} title="Top Rated" fetchURL={MovieRequests.requestTopRated} />
            <Row itemType={ItemType.MOVIE} title="Now Playing" fetchURL={MovieRequests.requestNowPlaying} />
        </div>
    );
}
