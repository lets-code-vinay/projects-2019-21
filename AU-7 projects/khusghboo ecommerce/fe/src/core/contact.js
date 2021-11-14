import React from "react";
import Base from "./Base";

export default function About() {
  return (
    <Base>
      <div
        className="container text-center bg-light mt-5"
        style={{ minHeight: "350px" }}
      >
        <h3 className="bg-dark text-white text-center mb-5">Contact Us</h3>
        <div>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd4Rp8dU3Rg8wFSnDXKHwnFsDmbUKm8sBDp3lb64gH6k-4QhQ/viewform?embedded=true"
            width="640"
            height="750"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </Base>
  );
}
