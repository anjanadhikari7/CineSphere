// App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WishList from "./pages/WishList";
import MovieWishlistContainer from "./components/MovieWishlistContainer";

const App = () => {
  return (
    <div className="App">
      <MovieWishlistContainer />
    </div>
  );
};

export default App;
