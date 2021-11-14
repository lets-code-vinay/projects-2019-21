import React from "react";
import Menu from "./Menu";
import "../styles.css";
import { Link } from "react-router-dom";

const Base = ({ className = "", children }) => (
  <div>
    <Menu />
    <div style={{ paddingTop: "70px" }}>{children}</div>
    <footer className="mt-5">
      <div className="footer-manage">
        <div className="about mt-3" style={{ width: "300px" }}>
          <h4>ABOUT</h4>
          <Link to="/contact">
            <span className="text-muted">CONTACT US</span>
          </Link>
          <br />
          <Link to="/about">
            <span className="text-muted">ABOUT</span>
          </Link>
          <br />
          <Link to="/faq">
            <span className="text-muted">FAQ</span>
          </Link>
        </div>
        <div className="mail-us mt-3 " style={{ width: "300px" }}>
          <h4>MAIL US</h4>
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
          <span className="text-muted ml-3">
            <a href="mailto:connect.buyout@gmail.com" className="text-white">
              buyout.connect@gmail.com
            </a>
          </span>
        </div>
        <div className="social mt-3" style={{ width: "300px" }}>
          <h4>KEEP IN TOUCH</h4>
          <div className="social-link">
            <div
              className="ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="instagram"
            >
              <a
                href="https://www.instagram.com/buyout_online_shop/"
              >
                <i class="fa fa-instagram text-white" aria-hidden="true"></i>
              </a>
            </div>
            <div
              className="ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="facebook"
            >
              <a href="https://www.facebook.com/buy.out.351">
                <i
                  class="fa fa-facebook-square text-white"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
            <div
              className="ml-3"
              data-toggle="tooltip"
              data-placement="bottom"
              title="twitter"
            >
              <a href="https://twitter.com/buyout18">
                <i
                  class="fa fa-twitter-square text-white"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        </div>
        <div className="policy mt-3 " style={{ width: "300px" }}>
          <h4>TERMS & CONDITIONS</h4>
          <Link to="/returnpolicy">
            <span className="i text-muted">RETURN POLICY</span>
          </Link>
          <br />
          <Link to="/security">
            <span className="i text-muted">SECURITY</span>
          </Link>
          <br />
          <Link to="/privacy">
            <span className="text-muted">PRIVACY</span>
          </Link>
          <br />
        </div>
      </div>
      <div>
        <div className="container-fluid text-center p-2">
          <hr style={{ borderBottom: " 1px solid white" }} />
          <span className="text-muted text-white  ">
            &copy; 2020
            <span className="text-white">
              <strong>BUYOUT</strong>
            </span>
            ®. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  </div>
);

export default Base;
