import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./utilities/logo.png";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import AddToWishList from "./components/AddToWishList";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import MovieSection from "./components/MovieSection";

const TMDB_API_KEY = "3510cfa16a6f3bcb9a22b17cc29f0d76";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TOP_MOVIES_URL = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
const POPULAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
const NOW_PLAYING_URL = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
const UPCOMING_MOVIES_URL = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
const TRENDING_MOVIES_URL = `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
const SEARCH_MOVIE_URL = (query) =>
  `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
const SIMILAR_MOVIES_URL = (movieId) =>
  `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`;

function App() {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const storedMovieList = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(storedMovieList);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
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

  const searchMovie = async (query) => {
    setIsNext(false);
    setIsLoading(true);
    try {
      const response = await axios.get(SEARCH_MOVIE_URL(query));
      if (response.data.results.length > 0) {
        const movie = response.data.results[0];
        setSearchedMovie(movie);
        const similarResponse = await axios.get(SIMILAR_MOVIES_URL(movie.id));
        setSimilarMovies(similarResponse.data.results);
        setCurrentMovieIndex(0);
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

  const addMovieToWishList = (movie) => {
    setWishList([...wishList, movie]);
  };

  useEffect(() => {
    fetchTMDBMovies();
    searchMovie("X-Men");
  }, []);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  const handleOnDiscard = () => {
    searchMovie("X-Men");
    setIsNext(true);
  };

  const handleNextMovie = () => {
    if (similarMovies.length > 0) {
      const nextIndex = (currentMovieIndex + 1) % similarMovies.length;
      setCurrentMovieIndex(nextIndex);
      searchMovie(similarMovies[nextIndex].title);
      setIsNext(true);
    }
  };

  const handleOnRemove = (ID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie from your wishlist?"
    );
    if (confirmDelete) {
      const updatedWishList = wishList.filter((movie) => movie.id !== ID);
      setWishList(updatedWishList);
    }
  };

  return (
    <div className="container-fluid bg-dark d-flex flex-column align-items-center justify-content-start">
      <div className="container-custom">
        <div className="header">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "150px" }}
          />
          <SearchBar searchMovie={searchMovie} />
        </div>
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
                      <Col md={12}>
                        <MovieCard movie={searchedMovie} />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col className="d-flex flex-column justify-content-between">
                        <AddToWishList
                          movie={searchedMovie}
                          addMovieToWishList={addMovieToWishList}
                          wishList={wishList}
                          handleOnDiscard={handleOnDiscard}
                        />
                        <Button
                          variant="info"
                          className="mt-3"
                          onClick={handleNextMovie}
                        >
                          Next Similar Movie
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="similar-movies">
                  {similarMovies.map((movie, index) => (
                    <Card
                      key={index}
                      className="similar-movie-card"
                      onClick={() => {
                        setMovie(movie.title);
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <MovieSection title="Top Rated Movies" movies={topMovies} />
            <MovieSection title="Popular Movies" movies={popularMovies} />
            <MovieSection title="Now Playing" movies={nowPlaying} />
            <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
            <MovieSection title="Trending Movies" movies={trendingMovies} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
