import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import ReactPaginate from "react-paginate";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setSearchParams] = useSearchParams();
  const name = query.get("name") || "";
  const page = query.get("page") || 1;

  useEffect(() => {
    dispatch(
      getProductList({
        name,
        page,
      })
    );
  }, [query]);

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    navigate("?" + query);
  }, [query]);

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    const currentParams = Object.fromEntries(query.entries()); // 현재 쿼리 파라미터 복사
    currentParams.page = selected + 1; // 원하는 값으로 변경
    setSearchParams(currentParams); // 업데이트된 쿼리 파라미터 설정
  };

  return (
    <Container>
      <Row>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>{name}과 일치한 상품이 없습니다!`</h2>
            )}
          </div>
        )}
      </Row>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum} // 전체페이지
        forcePage={page - 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="display-center list-style-none"
      />
    </Container>
  );
};

export default LandingPage;
