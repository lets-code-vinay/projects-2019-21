import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductsCarousel from "./ProductsCarousel";

const DealsOfTheDay = () => {
  return (
    <Row className='deals-of-the-day'>
      
      <Col lg='12'>
        <ProductsCarousel productsNumber='3' />
      </Col>
    </Row>
  );
};

export default DealsOfTheDay;
