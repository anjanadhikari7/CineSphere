import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

const WishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = [...state.wishList, action.payload];
    },
  },
});

const { reducer: wishListReducer, actions } = WishListSlice;

export const { setWishList } = actions;

export default wishListReducer;
