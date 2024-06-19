import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
  const [actionList, setActionList] = useState([]);
  const [comedyList, setComedyList] = useState([]);

  const searchMovie = async (movie, fetchSimilar = true) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + movie);
      if (response.data) {
        setSearchedMovie(response.data);
        if (fetchSimilar) {
          const searchResponse = await axios.get(SEARCH_URL + movie);
          if (searchResponse.data && searchResponse.data.Search) {
            setSimilarMovies(searchResponse.data.Search);
            setCurrentMovieIndex(0);
          } else {
            setSimilarMovies([]);
          }
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addMovieToWishList = (movie) => {
    if (!wishList.some((item) => item.imdbID === movie.imdbID)) {
      const updatedWishList = [...wishList, movie];
      setWishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    }
  };

  const addToAction = (movie) => {
    if (!actionList.some((item) => item.imdbID === movie.imdbID)) {
      const updatedActionList = [...actionList, movie];
      setActionList(updatedActionList);
      localStorage.setItem("actionList", JSON.stringify(updatedActionList));
    }
  };

  const addToComedy = (movie) => {
    if (!comedyList.some((item) => item.imdbID === movie.imdbID)) {
      const updatedComedyList = [...comedyList, movie];
      setComedyList(updatedComedyList);
      localStorage.setItem("comedyList", JSON.stringify(updatedComedyList));
    }
  };

  const handleOnRemove = (ID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie from your wishlist?"
    );
    if (confirmDelete) {
      const updatedWishList = wishList.filter((movie) => movie.imdbID !== ID);
      setWishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    }
  };

  useEffect(() => {
    searchMovie("X-Men");
  }, []);

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
            {isLoading ? (
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
            ) : (
              <div>
                <Card className="shadow-sm mb-4 bg-light movie-card">
                  <Card.Body>
                    <Row>
                      <Col md={12}>
                        <MovieCard
                          movie={searchedMovie}
                          addToAction={addToAction}
                          addToComedy={addToComedy}
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

                <div className="similar-movies">
                  <Row>
                    {similarMovies.map((movie, index) => (
                      <Col key={index} sm={6} md={4} lg={3}>
                        <Card
                          className="similar-movie-card mb-4"
                          onClick={() => searchMovie(movie.Title, false)}
                        >
                          <Card.Img
                            variant="top"
                            src={movie.Poster}
                            alt={movie.Title}
                          />
                          <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
