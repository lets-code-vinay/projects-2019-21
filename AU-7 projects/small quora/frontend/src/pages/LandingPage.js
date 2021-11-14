import React from "react";
import question from "../question.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <div className="text-wrapper">
        <div className="text-header-wrapper">
          <p className="text-header font__p p__size">Welcome in</p>
          <span>Todo </span>
        </div>

        <div className="text-section font__p p__size">
          It is new forum about achieving work om time
          <br />
          <div className="text-button-wrapper">
            <Link to="/register">Register in</Link> and add post!
          </div>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={question} className="landing-image" alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
