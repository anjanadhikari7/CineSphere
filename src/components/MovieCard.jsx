import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="card movie-card">
      <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">{movie.Plot}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
