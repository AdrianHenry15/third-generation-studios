import MovieSplash from "@/components/layout/movies/movie-splash";
import MovieRow from "@/components/layout/movies/movie-row";
import requests from "@/lib/movie-requests";

export default function MoviePicksPage() {
    return (
        <div className="bg-black h-full">
            <MovieSplash />
            <MovieRow title="Up Coming" fetchURL={requests.requestUpcoming} />
            <MovieRow title="Popular" fetchURL={requests.requestPopular} />
            <MovieRow title="Trending" fetchURL={requests.requestTrending} />
            <MovieRow title="Top Rated" fetchURL={requests.requestTopRated} />
            <MovieRow title="Now Playing" fetchURL={requests.requestNowPlaying} />
        </div>
    );
}
