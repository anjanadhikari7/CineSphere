import { setWishList } from "./MovieSlice";

export const movieWishListAction = (movie) => (dispatch) => {
  dispatch(setWishList(...wishList, movie));
};
