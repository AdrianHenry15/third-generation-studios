import MovieSplash from "@/components/layout/movies/movie-splash";
import requests from "@/lib/movie-requests";
import Row from "@/components/row";

export default function MoviePicksPage() {
    return (
        <div className="bg-black h-full">
            <MovieSplash />
            <Row movie title="Up Coming" fetchURL={requests.requestUpcoming} />
            <Row movie title="Popular" fetchURL={requests.requestPopular} />
            <Row movie title="Trending" fetchURL={requests.requestTrending} />
            <Row movie title="Top Rated" fetchURL={requests.requestTopRated} />
            <Row movie title="Now Playing" fetchURL={requests.requestNowPlaying} />
        </div>
    );
}
