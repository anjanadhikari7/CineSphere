import React from "react";
import { Card, Row, Col, CardImg } from "react-bootstrap";
import "./MovieCard.css";
import NoPoster from "../utilities/noPoster.jpg";

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card
      className="movie-card bg-dark text-light mb-4"
      onClick={() => onClick(movie.id)}
      style={{ cursor: "pointer" }}
    >
      <Row className="no-gutters" style={{ height: "60%" }}>
        <Col xs={12} md={4} style={{ height: "100%" }}>
          <CardImg
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : NoPoster
            }
            alt={movie.title}
            style={{ width: "100%", height: "60%" }}
          />
        </Col>
        <Col xs={12} md={8} style={{ height: "100%" }}>
          <Card.Body style={{ height: "60%", overflowY: "auto" }}>
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
};

export default MovieCard;
