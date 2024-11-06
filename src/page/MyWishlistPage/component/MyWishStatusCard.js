import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { currencyFormat } from "../../../utils/number";

const MyWishStatusCard = ({ wishlistItem }) => {
  return (
    <div>
      <Row className="status-card">
        <Col className="radio-check" xs={1}>
          <Form.Check ria-label="option 1" />
        </Col>
        <Col xs={2}>
          <img
            src={wishlistItem?.image}
            alt={wishlistItem?.image}
            height={96}
          />
        </Col>
        <Col xs={7} className="wish-info">
          <div>
            <strong>상품명: {wishlistItem.productId.name}</strong>
          </div>
          <div>₩ {currencyFormat(wishlistItem.price)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <button className="wish-delelte-btn">삭제</button>
        </Col>
      </Row>
    </div>
  );
};

export default MyWishStatusCard;
