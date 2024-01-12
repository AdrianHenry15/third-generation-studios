import MovieSplash from "@/components/layout/movies/movie-splash";
import MovieRow from "@/components/layout/rows/movie-row";
import requests from "@/lib/movie-requests";

export default function MoviePicksPage() {
    return (
        <div className="bg-black h-screen">
            <h5 className="font-semibold text-4xl text-white text-center mb-2">Only 5 Star Movies</h5>
            <p className="text-gray-500 text-sm text-center">(4-star movies also included)</p>
            <MovieSplash />
            <MovieRow title="Up Coming" fetchURL={requests.requestUpcoming} />
        </div>
    );
}
