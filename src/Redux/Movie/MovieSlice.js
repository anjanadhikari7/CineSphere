import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

const movieSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
  },
});

const { reducer: movieReducer, actions } = movieSlice;

export const { setWishList } = actions;

export default movieReducer;
