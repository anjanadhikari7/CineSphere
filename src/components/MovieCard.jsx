import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./MovieCard.css";
import NoPoster from "../utilities/noPoster.jpg";

function MovieCard({ movie, onClick }) {
  return (
    <Card
      className="movie-card bg-dark text-light"
      onClick={() => onClick(movie.id)}
    >
      <Row>
        <Col md={4}>
          <Card.Img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : NoPoster
            }
            alt={movie.title}
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2">
              <i className="fas fa-calendar-alt"></i> {movie.release_date}{" "}
              &nbsp;
              <i className="fas fa-clock"></i> {movie.runtime} min &nbsp;
            </Card.Subtitle>
            <Card.Text>{movie.overview}</Card.Text>
            <Card.Text>
              <i className="fas fa-user-tie"></i> <strong>Director:</strong>{" "}
              {movie.director}
            </Card.Text>
            <Card.Text>
              <i className="fas fa-users"></i> <strong>Cast:</strong>{" "}
              {movie.cast}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default MovieCard;
