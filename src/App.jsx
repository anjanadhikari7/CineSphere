// App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WishList from "./pages/WishList";
import MovieWishlistContainer from "./components/MovieWishlistContainer";

import { Container } from "react-bootstrap";
import NewComponent from "./components/new";

const App = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #000, #333)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "red" }}> Movie Wishlist </h1>
      <hr />
      <MovieWishlistContainer />
    </div>
  );
};

export default App;
