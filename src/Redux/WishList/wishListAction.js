import { setWishList } from "./wishListSlice";

export const WishListAction = (movie) => (dispatch) => {
  dispatch(setWishList(movie));
};
