import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import NoPoster from "../utilities/noPoster.jpg";

const MovieSection = ({ title, movies, onMovieClick }) => {
  return (
    <>
      <h2>{title}</h2>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              scrollbarWidth: "none",
              padding: "20px",
            }}
          >
            {movies.slice(0, 10).map((movie, index) => (
              <Card
                key={index}
                style={{
                  minWidth: "18rem",
                  marginRight: "20px",
                }}
              >
                <Card.Img
                  variant="top"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : NoPoster
                  }
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MovieSection;
