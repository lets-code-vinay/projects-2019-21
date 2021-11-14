import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/product-actions/fetchProductsAction";
import ProductsCarousel from "./ProductsCarousel";
import DealsOfTheDay from "./DealsOfTheDay";
import ExploreMore from "./ExploreMore";
import bg from '../../images/streetfood1.jpg'
function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container fluid>
            <div className="homepageImage" style={{marginLeft:"0"}}>
              <img className="homepageImage" src={bg} style={{width:"95vw", height:"70vh", marginLeft:"0", left:'0'}} alt="Street food stalls"/>
            </div>
      <ProductsCarousel title='Fresh from Farm to Home' productsNumber='4' />
      <ProductsCarousel title='Season Specials' productsNumber='4' />
      <DealsOfTheDay productsNumber='3' />
      <ExploreMore />
    </Container>
  );
}

export default HomePage;
