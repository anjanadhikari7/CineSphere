// src/redux/moviesActions.js
import axios from "axios";
import {
  TOP_MOVIES_URL,
  POPULAR_MOVIES_URL,
  NOW_PLAYING_URL,
  UPCOMING_MOVIES_URL,
  TRENDING_MOVIES_URL,
} from "../apiConfig";

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});

const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchTMDBMovies = () => async (dispatch) => {
  dispatch(fetchMoviesRequest());
  try {
    const [
      topMoviesRes,
      popularMoviesRes,
      nowPlayingRes,
      upcomingMoviesRes,
      trendingMoviesRes,
    ] = await Promise.all([
      axios.get(TOP_MOVIES_URL),
      axios.get(POPULAR_MOVIES_URL),
      axios.get(NOW_PLAYING_URL),
      axios.get(UPCOMING_MOVIES_URL),
      axios.get(TRENDING_MOVIES_URL),
    ]);

    const movies = {
      topMovies: topMoviesRes.data.results,
      popularMovies: popularMoviesRes.data.results,
      nowPlaying: nowPlayingRes.data.results,
      upcomingMovies: upcomingMoviesRes.data.results,
      trendingMovies: trendingMoviesRes.data.results,
    };

    dispatch(fetchMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchMoviesFailure(error.message));
  }
};
