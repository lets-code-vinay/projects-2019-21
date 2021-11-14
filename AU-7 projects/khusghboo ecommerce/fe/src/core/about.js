import React from "react";
import Base from "./Base";

export default function About() {
  return (
    <Base>
      <div className="container mt-5" style={{ minHeight: "350px" }}>
        <h3 className="bg-dark text-white text-center mb-5">ABOUT</h3>
        <div className="row abt text-center">
          <div className="col-md-6 bg-light mb-5">
            <img
              src={require("../img/2.jpg")}
              width="200"
              height="250"
              alt="about"
            />
          </div>
          <div className="col-md-6 bg-light mb-5 ">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="col-md-6 bg-light mb-5 ">
            <img
              src={require("../img/3.jpg")}
              width="200"
              height="250"
              alt="about"
            />
          </div>
          <div className="col-md-6 bg-light mb-5">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </Base>
  );
}
