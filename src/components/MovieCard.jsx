import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./MovieCard.css";
import NoPoster from "../utilities/noPoster.jpg";

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card
      className="movie-card bg-dark text-light"
      onClick={() => onClick(movie.id)}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <Card style={{ width: "70vw", height: "40vh" }}>
            <Row noGutters>
              <Col xs={4}>
                <CardImg
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : NoPoster
                  }
                  alt={movie.title}
                  style={{ width: "100%", height: "100%" }}
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
                    <i className="fas fa-user-tie"></i>{" "}
                    <strong>Director:</strong> {movie.director}
                  </Card.Text>
                  <Card.Text>
                    <i className="fas fa-users"></i> <strong>Cast:</strong>{" "}
                    {movie.cast}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieCard;
