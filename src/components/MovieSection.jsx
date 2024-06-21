import React from "react";
import { Col, Row, Card } from "react-bootstrap";

const MovieSection = ({ title, movies, onMovieClick }) => {
  return (
    <div className="my-4 movie-card">
      <h2 className="text-light">{title}</h2>
      <Row>
        {movies.slice(0, 10).map((movie, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} xl={2} className="mb-3">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieSection;
