const TMDB_API_KEY = "3510cfa16a6f3bcb9a22b17cc29f0d76";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const TOP_MOVIES_URL = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
export const POPULAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
export const NOW_PLAYING_URL = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
export const UPCOMING_MOVIES_URL = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
export const TRENDING_MOVIES_URL = `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
export const SEARCH_MOVIE_URL = (query) =>
  `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
export const MOVIE_DETAILS_URL = (id) =>
  `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;
export const MOVIE_CREDITS_URL = (id) =>
  `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`;
