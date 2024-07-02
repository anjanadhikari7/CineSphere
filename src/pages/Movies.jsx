import MovieWishlistContainer from "../components/MovieWishlistContainer";

const Movies = (props) => {
  const { wishList, setWishList } = props;
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #000, #333)",
        color: "aqua",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "red" }}> Movie Wishlist </h1>
      <hr />
      <MovieWishlistContainer wishList={wishList} setWishList={setWishList} />
    </div>
  );
};

export default Movies;
