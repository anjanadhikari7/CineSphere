import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./MovieCard.css";
import AddToWishList from "./AddToWishList";
import NoPoster from "../utilities/noPoster.jpg";

function MovieCard({ movie, addToAction, addToComedy }) {
  return (
    <Card className="movie-card bg-dark text-light">
      <Row noGutters>
        <Col md={4}>
          <Card.Img
            src={movie.Poster !== "N/A" ? movie.Poster : { NoPoster }}
            alt={movie.Title}
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <i className="fas fa-calendar-alt"></i> {movie.Year} &nbsp;
                  <i className="fas fa-film"></i> {movie.Genre}
                </Card.Subtitle>
              </div>
              <AddToWishList />
            </div>
            <Card.Text>{movie.Plot}</Card.Text>
            <Card.Text>
              <i className="fas fa-user-tie"></i> <strong>Director:</strong>{" "}
              {movie.Director}
            </Card.Text>
            <Card.Text>
              <i className="fas fa-users"></i> <strong>Cast:</strong>{" "}
              {movie.Actors}
            </Card.Text>
            <Card.Text>
              <i className="fas fa-hourglass-half"></i>{" "}
              <strong>Runtime:</strong> {movie.Runtime}
            </Card.Text>
            <Card.Text>
              <i className="fas fa-globe"></i> <strong>Language:</strong>{" "}
              {movie.Language}
            </Card.Text>
            <Card.Text>
              <i className="fas fa-star"></i> <strong>IMDB Rating:</strong>{" "}
              {movie.imdbRating}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
