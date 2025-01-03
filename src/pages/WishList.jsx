import { Tab, Tabs } from "react-bootstrap";
import DisplayWishList from "../components/displayWishlist";
import NavBar from "../components/NavBar";

const WishList = (props) => {
  const { wishList, handleOnRemove, searchMovie } = props;
  return (
    <>
      <NavBar wishList={wishList} searchMovie={searchMovie} />
      <Tabs defaultActiveKey="all" id="wishlist-tabs" className="mb-3">
        <Tab eventKey="all" title="All Movies" className="p-3 subtle-tab">
          <DisplayWishList
            wishList={wishList}
            handleOnRemove={handleOnRemove}
          />
        </Tab>
        <Tab eventKey="action" title="Action Movies" className="p-3 subtle-tab">
          <DisplayWishList
            wishList={wishList}
            Genre="Action"
            handleOnRemove={handleOnRemove}
          />
        </Tab>
        <Tab eventKey="comedy" title="Comedy Movies" className="p-3 subtle-tab">
          <DisplayWishList
            wishList={wishList}
            Genre="Comedy"
            handleOnRemove={handleOnRemove}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default WishList;
