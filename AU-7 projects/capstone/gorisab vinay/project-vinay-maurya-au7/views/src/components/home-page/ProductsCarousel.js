import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchProducts } from "../../redux/actions/product-actions/fetchProductsAction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

// custom prev arrow
function SamplePrevArrow(props) {
  const { onClick } = props;
  return <i onClick={onClick} class='fa fa-arrow-left' aria-hidden='true'></i>;
}

// custom next arrow
function SampleNextArrow(props) {
  const { onClick } = props;
  return <i onClick={onClick} class='fa fa-arrow-right' aria-hidden='true'></i>;
}

class ProductsCarousel extends React.Component {
  // will fetch the products before the compnent mounts
  componentDidMount() {
    this.props.fetchP();
  }

  render() {
    let productsNumber = this.props.productsNumber;
    const settings = {
      dots: true,
      infinite: false,
      speed: 700,
      slidesToShow: productsNumber,
      slidesToScroll: 4,
      arrows: true,
      prevArrow: <SamplePrevArrow />,
      nextArrow: <SampleNextArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className='featured-products' style={{paddingTop:"35px", paddingBottom:"35px"}}>
        <h2 style={{padding:"5", margin:"0", backgroundColor:"#2C767F", color:"#D8CFBE", marginBottom:"20px" }}>{this.props.title}</h2>
        {this.props.products.loading && <ProgressBar animated now={100} />}
        <Slider {...settings}>
          {!this.props.products.loading &&
            this.props.products.products.map(product => {
              return (
                <Col key={product._id} className='product-card' style={{ padding:"2px", margin:"0px"}}>
                  <Card>
                    <Link to={`/product/${product._id}`}>
                      <Card.Img
                        className='product-card-image'
                        style ={{ margin:"0px", padding:"0px"}}
                        variant='top'
                        src={product.productImage[0]}
                      />
                    </Link>

                    <Card.Body className='product-details' style={{paddingTop:"4px", paddingBottom:"4px"}}>
                      <Card.Title className='product-name' style={{paddingTop:"4px", paddingBottom:"4px", marginBottom:"4px"}}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </Card.Title>

                      <Row>
                        <Col>
                          <Card.Text className='product-price' style={{display:"flex" , alignItems:"center", paddingTop:"0px", paddingBottom:"0px", margin:"0px"}}>
                          <p> {"₹ " + product.price + " "}KG</p>
                          </Card.Text>
                        </Col>
                        <Col>
                          
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Slider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { productsss } = state;
  return { products: productsss };
}

function mapDispatchToProps(dispatch) {
  return { fetchP: () => dispatch(fetchProducts()) };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsCarousel);
