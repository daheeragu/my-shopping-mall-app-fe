import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./style/productCard.style.css";
import {
  addToWishlist,
  deleteFromWishlist,
  getWishlist,
} from "../../../features/wishlist/wishlistSlice";
import { showToastMessage } from "../../../features/common/uiSlice";
const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  // 관심 상품 체크
  const [wish, setWish] = useState(false);

  useEffect(() => {
    if (user && wishlist.length > 0) {
      dispatch(getWishlist()); // 로그인된 유저일 때만 위시리스트 불러오기
    }
  }, [user, dispatch]);

  useEffect(() => {
    // wishlist가 배열인지 확인
    if (Array.isArray(wishlist)) {
      const isWished = wishlist.some(
        (wishItem) => wishItem.productId._id === item._id
      );
      setWish(isWished);
    }
  }, [wishlist, item._id]);

  // 유저가 없으면 좋아요 표시 모두 초기화
  useEffect(() => {
    if (!user) {
      setWish(false);
    }
  }, []);

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleWish = (e) => {
    e.stopPropagation();

    if (!user) {
      dispatch(
        showToastMessage({
          message: "로그인 후 사용해주세요.",
          status: "error",
        })
      );
      return;
    }

    if (wish) {
      dispatch(deleteFromWishlist({ id: item._id }));
    } else {
      dispatch(addToWishlist({ item }));
    }
    setWish(!wish); // wish 상태 반전
  };
  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img src={item?.image} alt={item?.image} />
      <button
        className="wishlist-btn"
        onClick={toggleWish}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon
          icon={wish ? faHeart : farHeartOutline}
          size="lg"
          color={wish ? "red" : "black"}
        />
      </button>
      <div>{item?.name}</div>
      <div>₩ {currencyFormat(item?.price)}</div>
    </div>
  );
};

export default ProductCard;
