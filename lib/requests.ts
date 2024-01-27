//api key from movie api
const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const MovieRequests = {
    // endpoints from movie api
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
};

export const WebsiteRequest = {
    requestAllWebsites: `localhost:3000/api/websites`,
};
export const SongRequest = {
    requestAllSongs: `localhost:3000/api/songs`,
};
