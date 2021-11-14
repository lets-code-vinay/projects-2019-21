import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom'

const MainFooter = () => {
  return (
    <Container className='main-footer' fluid>
      <Row>
      <Col md={7} className="footerLeft">
        
        <Col md={3}>
          <ul className="footerHeading">About
            <a href='/contact-us' ><li> Contact us</li></a>
            <a href='/about-us' ><li>About us</li></a>
            <a href='/career' ><li>Careers</li></a>
            <a href='/stories' ><li>Hawker Stories</li></a>
            <a href='/press' ><li>Press</li></a>
            <a href='/wholeseller' ><li>Hawker Wholesale</li></a>
          </ul>
        </Col>

        <Col md={3}>
          <ul className="footerHeading">Help
            <a href="/payments"><li>Payments</li></a>
            <a href="/shipping"><li>Shipping</li></a>
            <a href="/return"><li>Cancellation & Return</li></a>
            <a href="/faq"><li>FAQ</li></a>
            <a href="/reports"><li>Report</li></a>
          </ul>
        </Col>

        <Col md={3}>
          <ul className="footerHeading">Policy
            <a href="/return"><li>Return Policy</li></a>
            <a href="/termsandconditions"><li>Terms of Use</li></a>
            <a href="/security"><li>Security</li></a>
            <a href="/privacy"><li>Privacy</li></a>
            <a href="/sitemap"><li>Sitemap</li></a>
            <a href="/erp"><li>ERP compliance</li></a>
          </ul>
        </Col>

        <Col md={3}>
          <ul className="footerHeading">Social
            <a href="/www.facebook.com"><li> <i class="fab fa-facebook-f"></i>Facebook</li></a>
            <a href="/www.facebook.com"><li><i class="fab fa-twitter"></i>Twitter</li></a>
            <a href="/www.facebook.com"><li><i class="fab fa-youtube"></i>Youtube</li></a>
          </ul>
        </Col>
      </Col>
      <Col md={5}  className="footerRight">
      <Col md={6}>
          <ul className="mailus">Mail Us:
            <p>Hawker internet private limited,
               Building no: 123, 99 Raod,
               Some random colony, Near Music road,
               Bangalore, Karnatka, India
               560130
            </p>
          </ul>
        </Col>
        <Col md={6}>
          <ul className="mailus">Registered office addresss:
            <p>Hawker internet private limited,
               Building no: 113, 91 Raod,
               Some random colony, Near Music road,
               New Delhi, India
               110130
            </p>
          </ul>
        </Col>
      </Col>
      
      </Row>
      <Row>
        <hr></hr>
        <Col md={3}>
          <i className="fas fa-briefcase" aria="true"> Sell On Hawker</i>
        </Col>

        <Col md={3}>
        <i className="fas fa-chart-line">Advertise</i>
        </Col>

        <Col md={3}>
         <i className="fas fa-question" aria="true" >Help Center</i>
        </Col>
        <Col md={3}>
        <i class="far fa-copyright">2020-21 Hawker.com</i>
        </Col>
      </Row>
    </Container>
  );
};

export default MainFooter;
