import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewComponent from "./components/new";

import WishList from "./pages/WishList"; // Import the WishList component
import Movies from "./pages/Movies";

const App = () => {
  const storedMovieList = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(storedMovieList);
  const handleOnRemove = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie from your wishlist?"
    );
    if (confirmDelete) {
      const updatedWishList = wishList.filter((movie) => movie.id !== id);
      setWishList(updatedWishList);
    }
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Movies wishList={wishList} setWishList={setWishList} />}
        />
        <Route
          path="/wishlist"
          element={
            <WishList wishList={wishList} handleOnRemove={handleOnRemove} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
