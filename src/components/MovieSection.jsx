import React, { useRef } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import NoPoster from "../utilities/noPoster.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons for arrows

const MovieSection = ({ title, movies, onMovieClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <Row className="justify-content-center">
        <Col xs={12} className="position-relative">
          <Button
            variant="light"
            className="position-absolute start-0 top-50 translate-middle-y"
            style={{
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              border: "none",
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </Button>
          <div
            ref={scrollRef}
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
                  cursor: "pointer", // Add cursor pointer to indicate clickable cards
                }}
                onClick={() => onMovieClick(movie.id)} // Add onClick handler
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
          <Button
            variant="light"
            className="position-absolute end-0 top-50 translate-middle-y"
            style={{
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              border: "none",
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => scroll("right")}
          >
            <FaChevronRight />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MovieSection;
