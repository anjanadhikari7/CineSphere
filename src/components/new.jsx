import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  InputGroup,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NewComponent() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #000, #333)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row
          className="justify-content-center"
          style={{ marginTop: "20px" }}
        ></Row>
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
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {movie.release_date} &nbsp;
                      <i className="fas fa-clock"></i> {movie.runtime} min
                      &nbsp;
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
        <Row className="justify-content-center">
          <Col xs={12}>
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                padding: "20px",
                scrollbarWidth: "none",
              }}
            >
              {movies.slice(0, 10).map((movie, index) => (
                <Card
                  key={i}
                  style={{
                    width: "30rem",
                    display: "inline-block",
                    marginRight: "20px",
                  }}
                >
                  <Row noGutters>
                    <Col xs={4}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewComponent;
