import { useState } from "react";
import { Button } from "react-bootstrap";

const AddToWishList = (props) => {
  const { addMovieToWishList, movie, wishList = [], handleOnDiscard } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleOnclick = (genre) => {
    const movieWithGenre = { ...movie, Genre: genre };
    addMovieToWishList(movieWithGenre);
  };

  const disableButtons = wishList.find((item) => item.imdbID === movie.imdbID);

  return (
    <div
      className="add-to-wishlist"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`wishlist-buttons ${isHovered ? "" : "hide"}`}>
        <Button
          disabled={disableButtons}
          variant="outline-primary"
          className="btn-sm mb-2"
          onClick={() => handleOnclick("Action")}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Add to Action</span>
        </Button>
        <Button
          disabled={disableButtons}
          variant="outline-success"
          className="btn-sm"
          onClick={() => handleOnclick("Comedy")}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Add to Comedy</span>
        </Button>
      </div>
    </div>
  );
};

export default AddToWishList;
