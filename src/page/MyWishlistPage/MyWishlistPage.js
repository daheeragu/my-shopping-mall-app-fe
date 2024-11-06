import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style/mywishlist.style.css";
import "./component/style/mywishStatus.style.css";
import { Link } from "react-router-dom";
import MyWishStatusCard from "./component/MyWishStatusCard";
import { getWishlist } from "../../features/wishlist/wishlistSlice";
const MyWishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user.user);
  console.log("wishlisttttttt", wishlist);
  useEffect(() => {
    if (user) {
      dispatch(getWishlist()); // 로그인된 유저일 때만 위시리스트 불러오기
    }
  }, []);

  const wishlistCheckArray = Array.isArray(wishlist) ? wishlist : [];

  if (wishlistCheckArray?.length === 0) {
    return (
      <Container className="mywish-status-container">
        <div className="no-wishlist-box">
          <h3>관심 상품이 비어있습니다.</h3>
        </div>
        <div className="wishlist-btn-list">
          <button className="go-shopping-btn">
            <Link to={"/"}> go shopping</Link>
          </button>
        </div>
      </Container>
    );
  }
  return (
    <Container className="mywish-status-container">
      {wishlistCheckArray.map((item) => (
        <MyWishStatusCard
          wishlistItem={item}
          className="mywish-status-container"
          key={item._id}
        />
      ))}
      <div className="wishlist-btn-list">
        <button className="go-shopping-btn">
          <Link to={"/"}> go shopping</Link>
        </button>
      </div>
    </Container>
  );
};

export default MyWishlistPage;
