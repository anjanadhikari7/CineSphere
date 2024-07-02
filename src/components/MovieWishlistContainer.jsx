import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import Font Awesome icon
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import AddToWishList from "./AddToWishList";
import MovieSection from "./MovieSection";
import WishList from "../pages/WishList";

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

const MovieWishlistContainer = (props) => {
  const { wishList, setWishList } = props;
  const [searchedMovie, setSearchedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

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
        setSimilarMovies(restMovies); // Set similar movies here
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
    setSimilarMovies([]);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addMovieToWishList = (movie) => {
    setWishList([...wishList, movie]);
  };

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    fetchTMDBMovies();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} className="d-flex justify-content-between">
          <div className="header d-flex justify-content-center flex-grow-1">
            <SearchBar searchMovie={searchMovie} />
          </div>
          {wishList.length > 0 && (
            <div className="d-flex align-items-center ms-3">
              <Link
                to="/WishList"
                className="text-light d-flex align-items-center"
              >
                <FaHeart className="me-2" /> My WishList
              </Link>
            </div>
          )}
        </Col>
      </Row>

      {searchedMovie.id && (
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
            {!isLoading && (
              <div>
                <Card className="shadow-sm mb-4 bg-light movie-card">
                  <Card.Body>
                    <Row>
                      <Col>
                        <MovieCard
                          movie={searchedMovie}
                          onClick={handleMovieClick}
                          addMovieToWishList={addMovieToWishList}
                          wishList={wishList}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {similarMovies.length > 0 && (
                  <MovieSection
                    title="Similar Movies"
                    movies={similarMovies}
                    onMovieClick={handleMovieClick}
                  />
                )}
              </div>
            )}
          </Col>
        </Row>
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
    </Container>
  );
};

export default MovieWishlistContainer;
