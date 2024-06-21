import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";

const AddToWishList = ({ addMovieToWishList, movie, wishList = [] }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOnClick = (genre) => {
    const movieWithGenre = { ...movie, Genre: genre };
    addMovieToWishList(movieWithGenre);
  };

  // Check if the movie is already in the wishList
  const disableButtons = wishList.some((item) => item.id === movie.id);

  return (
    <div
      className="add-to-wishlist"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`wishlist-buttons ${isHovered ? "" : "hide"}`}>
        <Stack direction="vertical">
          <Button
            disabled={disableButtons}
            variant="outline-primary"
            className="btn-sm mb-2"
            onClick={() => handleOnClick("Action")}
          >
            <i className="fas fa-plus-circle me-1"></i>
            Add to Action
          </Button>
          <Button
            disabled={disableButtons}
            variant="outline-success"
            className="btn-sm"
            onClick={() => handleOnClick("Comedy")}
          >
            <i className="fas fa-plus-circle me-1"></i>
            Add to Comedy
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default AddToWishList;
