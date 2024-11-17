import { configureStore } from "@reduxjs/toolkit";
import wishListReducer from "./Redux/WishList/wishListSlice";
const store = configureStore({
  reducer: {
    wishList: wishListReducer,
  },
});

export default store;
