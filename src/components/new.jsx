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
        <Row className="justify-content-center" style={{ marginTop: "20px" }}>
          
        </Row>
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
                    alt="Card image"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
                <Col xs={8}>
                  <CardBody>
                    <CardText>
                      This is a sample card with a picture on the left and
                      description on the right.
                    </CardText>
                  </CardBody>
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
              {[...Array(10)].map((_, i) => (
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
                      <CardImg
                        src="https://via.placeholder.com/200"
                        alt="Card image"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Col>
                    <Col xs={8}>
                      <CardBody>
                        <CardText>
                          This is a sample card with a picture on the left and
                          description on the right.
                        </CardText>
                      </CardBody>
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