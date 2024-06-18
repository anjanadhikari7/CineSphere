import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./utilities/logo.png";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import AddToWishList from "./components/AddToWishList";

const API_URL = "https://www.omdbapi.com/?apikey=e68479dc&type=movie&t=";
const SEARCH_URL = "https://www.omdbapi.com/?apikey=e68479dc&type=movie&s=";

function App() {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const storedMovieList = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(storedMovieList);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const searchMovie = async (movieTitle) => {
    setIsNext(false);
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + movieTitle);
      if (response.data) {
        setSearchedMovie(response.data);
        if (!isNext) {
          const searchResponse = await axios.get(SEARCH_URL + movieTitle);
          if (searchResponse.data && searchResponse.data.Search) {
            setSimilarMovies(searchResponse.data.Search);
            setCurrentMovieIndex(0);
          } else {
            setSimilarMovies([]);
          }
        }
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const addMovieToWishList = (movie) => {
    setWishList([...wishList, movie]);
  };

  useEffect(() => {
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
      searchMovie(similarMovies[nextIndex].Title);
      setIsNext(true);
    }
  };

  const handleOnRemove = (ID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie from your wishlist?"
    );
    if (confirmDelete) {
      const updatedWishList = wishList.filter((movie) => movie.imdbID !== ID);
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
            style={{ maxWidth: "200px" }}
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
            )}
          </Col>
        </Row>
        <div className="similar-movies">
          {similarMovies.map((movie, index) => (
            <Card key={index} className="similar-movie-card">
              <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
