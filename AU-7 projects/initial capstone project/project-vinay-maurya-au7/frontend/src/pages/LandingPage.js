import React from "react";
import question from "../../images/streetfood.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
              <img src={question} className="landing-background" alt="" />
      <div className="text-wrapper">
        <div className="text-header-wrapper">
          <p className="text-header font__p p__size">Welcome in</p>
          <span>Online Hawker </span>
        </div>

        <div className="text-section font__p p__size">
          No need to roam around city to look for some fresh vegetables. 
          Here <span className="hawker">Online Hawker </span> is ready to deliver your order in 15min.
          <br />
          <div className="text-button-wrapper">
            <Link to="/register">Register in</Link> and make an order!
          </div>
        </div>
      </div>
      <div className="image-wrapper">
{/**        <img src={question} className="landing-image" alt="" /> */}
      </div>
    </div>
  );
};

export default LandingPage;
