import MovieSplash from "@/components/layout/movies/movie-splash";
import MovieRequests from "@/lib/movie-requests";
import Row from "@/components/row";
import { Category } from "@/lib/types";

export default function MoviePicksPage() {
    return (
        <div className="bg-black h-full">
            <MovieSplash />
            <Row category={Category.MOVIE} title="Up Coming" fetchURL={MovieRequests.requestUpcoming} />
            <Row category={Category.MOVIE} title="Popular" fetchURL={MovieRequests.requestPopular} />
            <Row category={Category.MOVIE} title="Trending" fetchURL={MovieRequests.requestTrending} />
            <Row category={Category.MOVIE} title="Top Rated" fetchURL={MovieRequests.requestTopRated} />
            <Row category={Category.MOVIE} title="Now Playing" fetchURL={MovieRequests.requestNowPlaying} />
        </div>
    );
}
