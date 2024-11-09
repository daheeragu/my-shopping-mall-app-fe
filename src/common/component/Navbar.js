import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, MemoryRouter } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { getCartQty } from "../../features/cart/cartSlice";
import { getWishlist } from "../../features/wishlist/wishlistSlice";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  // 로고 클릭시, 모든 설정 초기화 로직
  const [query, setSearchParams] = useSearchParams();
  const [] = useSearchParams(); // 기존 쿼리 파라미터 가져오기
  // 가격 필터링 + 제품검색 적용한 검색 결과 출력하기
  const minPrice = query.get("minPrice") || 0;
  const maxPrice = query.get("maxPrice") || 300000;

  const menuList = [
    { name: "NEWEST", path: "#" },
    { name: "BEST", path: "#" },
    { name: "OUTER", path: "#" },
    { name: "TOP", path: "#" },
    { name: "BOTTOM", path: "#" },
    { name: "SHOES/BAG/ACC", path: "#" },
    { name: "SALE", path: "#" },
  ];

  //관리자인 경우 메뉴 리스트에 추가
  if (user && user.level === "admin") {
    menuList.push({
      name: "ADMIN PAGE",
      path: "/admin/product?page=1",
      isAdmin: true,
    });
  }

  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  //로그인 후, 유저의 카트에 담긴 상품 수량 가져오기
  useEffect(() => {
    if (user) {
      dispatch(getCartQty());
    }
  }, [user]);

  //로그인 후, 유저의 관심 리스트에 담긴 상품 수량 가져오기
  useEffect(() => {
    if (user) {
      dispatch(getWishlist());
    }
  }, [user]);

  //첫번째 페이지부터 출력
  const page = 1;
  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      const name = event.target.value;
      const queryParams = new URLSearchParams();

      queryParams.set("page", page);
      queryParams.set("minPrice", minPrice);
      queryParams.set("maxPrice", maxPrice);

      // 검색어가 있을 경우 설정
      if (name) {
        queryParams.set("name", name);
      } else {
        queryParams.delete("name");
      }

      navigate(`?${queryParams.toString()}`);
    }
  };
  // 로그아웃
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    //// URL 쿼리 파라미터를 초기화하여 navigate (기본값으로 이동)
    //navigate("/", { replace: true }); // 이렇게 설정할 경우, 히스토리가 아예가 지워지기 때문에 뒤로 가기 버튼을 눌러도 안가짐
    // 쿼리 파라미터 초기화
    const initialParams = {
      page: 1,
      name: "",
      minPrice: 0,
      maxPrice: 300000,
    };
    setSearchParams(initialParams);

    navigate("/");
  };
  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu.name}</button>
          ))}
        </div>
      </div>

      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={handleLogout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>Logout</span>}
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>Login</span>}
              </div>
            )}
            <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`Cart [${
                  user ? cartItemCount : 0
                }]`}</span>
              )}
            </div>
            <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>My shop</span>}
            </div>
            <div onClick={() => navigate("/wishlist")} className="nav-icon">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>Wish List</span>
              )}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/" onClick={handleLogoClick}>
          <img
            width={100}
            src="/image/reetkeem-logo.png"
            alt="reetkeem-logo.png"
          />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link
                to={menu.path}
                style={
                  menu.isAdmin
                    ? { color: "black", textDecoration: "underline" }
                    : {}
                }
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="제품검색"
              onKeyPress={onCheckEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
