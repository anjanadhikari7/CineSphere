// App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WishList from "./pages/WishList";
import MovieWishlistContainer from "./components/MovieWishlistContainer";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container>
      <MovieWishlistContainer />
    </Container>
  );
};

export default App;
