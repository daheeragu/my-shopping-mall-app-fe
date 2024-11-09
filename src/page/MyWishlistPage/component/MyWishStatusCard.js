import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { currencyFormat } from "../../../utils/number";

const MyWishStatusCard = ({ wishlistItem }) => {
  return (
    <div className="status-card">
      <Row className="align-items-center">
        <Col xs={1} className="radio-check">
          <Form.Check aria-label="option 1" />
        </Col>
        <Col xs={3} md={2} className="image-col">
          <img
            src={wishlistItem?.image}
            alt={wishlistItem?.productId?.name || "상품 이미지"}
            className="wishlist-image"
          />
        </Col>
        <Col xs={6} md={7} className="wish-info">
          <div>
            <strong>
              상품명: {wishlistItem?.productId?.name || "상품 이름"}
            </strong>
          </div>
          <div>₩ {currencyFormat(wishlistItem?.price)}</div>
        </Col>
        <Col xs={2} className="vertical-middle text-end">
          <button className="wish-delete-btn">삭제</button>
        </Col>
      </Row>
    </div>
  );
};

export default MyWishStatusCard;
