import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUserTie, FaUsers } from "react-icons/fa";
import AddToWishList from "./AddToWishList"; // Import AddToWishList component
import "./MovieCard.css";
import NoPoster from "../utilities/noPoster.jpg";

const MovieCard = ({ movie, onClick, addMovieToWishList, wishList }) => {
  return (
    <Card
      className="movie-card bg-dark text-light mb-4"
      onClick={() => onClick(movie.id)}
      style={{ cursor: "pointer" }}
    >
      <Row className="no-gutters">
        <Col md={4}>
          <div className="movie-card-img-container">
            <Card.Img
              variant="top"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : NoPoster
              }
              alt={movie.title}
              className="movie-card-img"
            />
          </div>
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2">
              <FaCalendarAlt /> {movie.release_date} &nbsp;
              <FaClock /> {movie.runtime} min &nbsp;
            </Card.Subtitle>
            <Card.Text>{movie.overview}</Card.Text>
            <Card.Text>
              <FaUserTie /> <strong>Director:</strong> {movie.director}
            </Card.Text>
            <Card.Text>
              <FaUsers /> <strong>Cast:</strong> {movie.cast}
            </Card.Text>
            <AddToWishList
              addMovieToWishList={addMovieToWishList}
              movie={movie}
              wishList={wishList}
            />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieCard;
