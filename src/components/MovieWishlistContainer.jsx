import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import Font Awesome icon
import logo from "../utilities/logo.png";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import AddToWishList from "./AddToWishList";
import MovieSection from "./MovieSection";
import WishList from "../pages/WishList";

// const TMDB_API_KEY = "3510cfa16a6f3bcb9a22b17cc29f0d76";
const TMDB_API_KEY = "3510cfa16a6f3bcb9a22b17cc29f0d76";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TOP_MOVIES_URL = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
const POPULAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
const NOW_PLAYING_URL = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
const UPCOMING_MOVIES_URL = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
const TRENDING_MOVIES_URL = `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
const SEARCH_MOVIE_URL = (query) =>
  `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
const MOVIE_DETAILS_URL = (id) =>
  `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;
const MOVIE_CREDITS_URL = (id) =>
  `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`;

const MovieWishlistContainer = () => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const storedMovieList = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(storedMovieList);
  const [isLoading, setIsLoading] = useState(false);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchTMDBMovies = async () => {
    try {
      const topMoviesRes = await axios.get(TOP_MOVIES_URL);
      setTopMovies(topMoviesRes.data.results);

      const popularMoviesRes = await axios.get(POPULAR_MOVIES_URL);
      setPopularMovies(popularMoviesRes.data.results);

      const nowPlayingRes = await axios.get(NOW_PLAYING_URL);
      setNowPlaying(nowPlayingRes.data.results);

      const upcomingMoviesRes = await axios.get(UPCOMING_MOVIES_URL);
      setUpcomingMovies(upcomingMoviesRes.data.results);

      const trendingMoviesRes = await axios.get(TRENDING_MOVIES_URL);
      setTrendingMovies(trendingMoviesRes.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const movieDetails = await axios.get(MOVIE_DETAILS_URL(movieId));
      const movieCredits = await axios.get(MOVIE_CREDITS_URL(movieId));

      const director = movieCredits.data.crew.find(
        (person) => person.job === "Director"
      );
      const cast = movieCredits.data.cast.slice(0, 5);

      return {
        ...movieDetails.data,
        director: director ? director.name : "N/A",
        cast: cast.map((actor) => actor.name).join(", "),
      };
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const searchMovie = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(SEARCH_MOVIE_URL(query));
      if (response.data.results.length > 0) {
        const [firstMovie, ...restMovies] = response.data.results;
        const detailedMovie = await fetchMovieDetails(firstMovie.id);

        setSearchedMovie(detailedMovie);
        setSimilarMovies(restMovies);
      } else {
        setSearchedMovie({});
        setSimilarMovies([]);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleMovieClick = async (movieId) => {
    setIsLoading(true);
    const detailedMovie = await fetchMovieDetails(movieId);
    setSearchedMovie(detailedMovie);

    setIsLoading(false);
  };

  const addMovieToWishList = (movie) => {
    setWishList([...wishList, movie]);
  };

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  const handleOnRemove = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie from your wishlist?"
    );
    if (confirmDelete) {
      const updatedWishList = wishList.filter((movie) => movie.id !== id);
      setWishList(updatedWishList);
    }
  };

  useEffect(() => {
    fetchTMDBMovies();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10}>
          <div className="header d-flex justify-content-between align-items-center">
            <h2>Movie Wishlist</h2>
            <SearchBar searchMovie={searchMovie} />
            {wishList.length > 0 && (
              <Link
                to="/WishList"
                className="text-light d-flex align-items-center"
              >
                <FaHeart className="me-2" /> My WishList
              </Link>
            )}
          </div>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          {isLoading && (
            <Button variant="warning" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          )}
          {!isLoading && searchedMovie.id && (
            <div>
              <Card className="shadow-sm mb-4 bg-light movie-card">
                <Card.Body>
                  <Row>
                    <Col>
                      <MovieCard
                        movie={searchedMovie}
                        onClick={handleMovieClick}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="d-flex flex-column justify-content-between">
                      <AddToWishList
                        movie={searchedMovie}
                        addMovieToWishList={addMovieToWishList}
                        wishList={wishList}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <MovieSection
                title="Similar Movies"
                movies={similarMovies}
                onMovieClick={handleMovieClick}
              />
            </div>
          )}

          <MovieSection
            title="Top Rated Movies"
            movies={topMovies}
            onMovieClick={handleMovieClick}
          />
          <MovieSection
            title="Popular Movies"
            movies={popularMovies}
            onMovieClick={handleMovieClick}
          />
          <MovieSection
            title="Now Playing"
            movies={nowPlaying}
            onMovieClick={handleMovieClick}
          />
          <MovieSection
            title="Upcoming Movies"
            movies={upcomingMovies}
            onMovieClick={handleMovieClick}
          />
          <MovieSection
            title="Trending Movies"
            movies={trendingMovies}
            onMovieClick={handleMovieClick}
          />
        </Col>
      </Row>

      <Routes>
        <Route
          path="/WishList"
          element={
            <WishList wishList={wishList} handleOnRemove={handleOnRemove} />
          }
        />
      </Routes>
    </Container>
  );
};

export default MovieWishlistContainer;
