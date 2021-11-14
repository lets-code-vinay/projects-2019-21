import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import veg from "./../../assets/pictures/veg.jpg";
import fru from "./../../assets/pictures/fru.jpg";
import mlk from "./../../assets/pictures/mlk.jpg";

const ExploreMore = () => {
  return (
    <div className='explore-more'>
      <h2 style={{padding:"5", margin:"0", backgroundColor:"#2C767F", color:"#D8CFBE", marginBottom:"20px"}}>Explore More</h2>
      <Row>
        <Col md='4' sm='12' className='item'>
          <a href='/category/5f6c6224042ec424fce1c125'>
            <Image src={veg} />
          </a>
        </Col>
        <Col md='4' sm='12' className='item'>
          <a href='/category/5f6c5a73042ec424fce1c124'>
            <Image src={fru} />
          </a>
        </Col>
        <Col md='4' sm='12' className='item'>
          <a href='/category/5f6c96dfd2782b324cad1851'>
            <Image src={mlk} />
          </a>
        </Col>


      </Row>
    </div>
  );
};

export default ExploreMore;
