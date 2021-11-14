import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProduct = () => {
    getProducts().then((data) => {
      //console.log("inn home", data);
      if (data.error) {
        setError(data.error);
      } else {
        const filteredProducts = [];
        let productCount = 0;
        while (productCount < 5) {
          const randomElement = data[Math.floor(Math.random() * data.length)];
          // console.log("random Element", randomElement);
          if (filteredProducts.indexOf(randomElement) === -1) {
            filteredProducts.push(randomElement);
            productCount++;
          }
        }
        setProducts(filteredProducts);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base>
      <div>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <Link to="/products/all/5efad81e08636533708ee7ee/1">
                <img
                  class="d-block w-100"
                  src={require("../img/womenSlider.jpeg")}
                  alt="First slide"
                />
              </Link>
            </div>
            <div class="carousel-item">
              <Link to="/products/all/5ef241c4c18a7a13587d7e7b/1">
                <img
                  class="d-block w-100"
                  src={require("../img/menSlider.jpeg")}
                  alt="Fourth slide"
                />
              </Link>
            </div>
            <div class="carousel-item">
              <Link to="products/all/5efad82408636533708ee7ef/1">
                <img
                  class="d-block w-100"
                  src={require("../img/kidsSlider.jpeg")}
                  alt="Fifth slide"
                />
              </Link>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div className="container  ">
          <div className=" text-center mt-3 ">
            <h1>
              <strong className="text-dark lead display-3 ">
                Best Selling Products
              </strong>
            </h1>
            <p style={{ color: "grey" }}>Trending Now</p>
            <hr style={{ borderBottom: " 1px solid gray" }} />
          </div>
        </div>
        <div
          style={{ display: "flex", marginBottom: "20px", marginTop: "20px" }}
        >
          {products.map((product, index) => {
            return (
              <div key={index} className="filterProduct">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
