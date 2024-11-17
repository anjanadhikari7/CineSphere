import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import WishList from "./pages/WishList"; // Import the WishList component
import Movies from "./pages/Movies";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
};

export default App;
