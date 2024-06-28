import { Col, Row, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import NoPoster from "../utilities/noPoster.jpg";

const DisplayWishList = (props) => {
  const { wishList, Genre, handleOnRemove } = props;
  const filteredWishList = Genre
    ? wishList.filter((movie) => movie.genre === Genre)
    : wishList;

  return (
    <Row className="d-flex flex-wrap">
      {filteredWishList.map((movie) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
          key={movie.id}
        >
          <Card style={{ width: "18rem" }} className="mb-3">
            <Card.Img
              variant="top"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : NoPoster
              }
              height={300}
            />
            <Card.Body className="position-relative">
              <Card.Title>{movie.title}</Card.Title>
              <button
                className="btn btn-danger position-absolute"
                style={{ bottom: "10px", right: "10px" }}
                onClick={() => handleOnRemove(movie.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DisplayWishList;
