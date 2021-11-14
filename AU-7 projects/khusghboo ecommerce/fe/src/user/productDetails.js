import React from 'react';
import { Redirect } from 'react-router-dom'
import Base from '../core/Base';
import { addItemToCart, loadCart } from '../core/helper/cartHelper';
import { isAutheticated } from '../auth/helper';

class ProductDetails extends React.Component {

    state = {
        addedToCart: false,
        isBuyNow: false,
        isLoggedIn: true,
        product: '',
        size: ['S', 'M', 'L', 'XL', 'XXL']
    }
    addToCart = () => {
        console.log('Add to Cart', this.state.product)
        if (isAutheticated()) {
            addItemToCart(this.state.product, () => null);
            this.setState({ addedToCart: true })
        } else {
            this.setState({ isLoggedIn: false })
        }

    }
    handleBuyNow = () => {

        if (isAutheticated()) {
            if (!this.state.addedToCart) {
                addItemToCart(this.state.product, () => null);
            }

            this.setState({ isBuyNow: true })
        } else {
            this.setState({ isLoggedIn: false })
        }

    }

    getQunatityArray = (qty) => {
        const qtyArr = []
        for (let i = 0; i < qty; i++) {
            qtyArr.push(i + 1)
        }
        return qtyArr
    }

    handleQuantityChange = (event) => {
        const productCopy = { ...this.state.product }
        productCopy.count = event.target.value
        this.setState({ product: productCopy })
    }
    componentDidMount() {
        const product = this.props.location.state.product
        product.count = 1
        product.size = 'S'
        this.setState({ product: product })
        if (isAutheticated()) {
            const cartItems = loadCart();
            //disable add to Cart of item is already added 
            const addedItems = cartItems.filter(item => item._id === product._id)
            if (addedItems.length > 0) {
                this.setState({ addedToCart: true })
            }

        }

    }
    handleSizeChange = (event) => {
        const productCopy = { ...this.state.product }
        productCopy.size = event.target.value
        this.setState({ product: productCopy })
    }
    render() {
        const product = this.state.product
        if (this.state.isBuyNow || !this.state.isLoggedIn) {
            return <Redirect to="/cart" />
        }
        return (
            <Base>
                {console.log("product", product)}
                <div className="productDetailsContainer">
                    <div className="productImage">
                        <img src={product.photo} style={{ "height": "400px", "width": "350px" }} alt="product" />
                        {
                            isAutheticated() && isAutheticated().user.role === 1 ? null :
                                <div>
                                    <button className="btn btn-warning m-4" disabled={this.state.addedToCart || product.stock <= 0} type="button" onClick={() => this.addToCart()}>Add to Cart</button>
                                    <button className="btn btn-warning m-4" type="button" onClick={() => this.handleBuyNow()} >Buy Now</button>
                                </div>
                        }

                    </div>
                    <div className="productDetails">
                        <h1 >{product.name}</h1>
                        <h7>  <h6><i className="fa fa-inr mr-2" aria-hidden="true" /> {product.price - (product.price * product.discount) / 100} </h6>
                            <i className="fa fa-inr mr-2" aria-hidden="true" /><strike>original price: {product.price}</strike> </h7>
                        <h6>discount : {product.discount} %</h6>
                        <h6>Description : {product.description}</h6>
                        {product.stock <= 0 ? <h6>Stock: Out Of Stock</h6> : <h6>Stock:{product.stock}</h6>}
                        <h6>Sold: {product.sold}</h6>
                        <div className="cartQtySize mt-3">
                            <div class="col-2 p-0 my-1" style={{ "width": "fit-content" }}>
                                <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                                <select class="custom-select mr-sm-2 mt-0" onChange={(event) => this.handleQuantityChange(event)}>
                                    {
                                        product.stock && parseInt(product.stock) > 0 && this.getQunatityArray(product.stock).map(x => <option value={x}>{x}</option>)
                                    }
                                </select>
                            </div>
                            {product.category != "5ef23de918487413a425ce45" ? <div>
                                <button class="btn btn-light" data-toggle="modal" data-target=".bd-example-modal-sm">
                                    Size Chart </button>
                                <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-sm" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header" style={{ "width": "auto" }}>
                                                <h5 class="modal-title" id="exampleModalLongTitle">Size Chart</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <table className="table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                Size</th>
                                                            <th >
                                                                chest
                                                        <span >
                                                                    (in inches)</span></th>
                                                        </tr>

                                                        <tr>

                                                            <td>
                                                                <span>S</span>
                                                            </td>

                                                            <td>
                                                                <span>34</span>
                                                            </td>

                                                        </tr>

                                                        <tr>

                                                            <td>
                                                                <span >M</span>
                                                            </td>

                                                            <td>
                                                                <span>36</span>
                                                            </td>

                                                        </tr>

                                                        <tr>

                                                            <td>
                                                                <span>L</span>
                                                            </td>

                                                            <td>
                                                                <span>38</span>
                                                            </td>

                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <span>XL</span>
                                                            </td>

                                                            <td>
                                                                <span >40</span>
                                                            </td>

                                                        </tr>

                                                        <tr>

                                                            <td>
                                                                <span>XXL</span>
                                                            </td>

                                                            <td>
                                                                <span>42</span>
                                                            </td>

                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.size.map(s => {
                                        return (
                                            <div class="form-check form-check-inline ml-2 mt-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" value={s} onChange={(event) => this.handleSizeChange(event)} />
                                                <label class="form-check-label" for="inlineRadio1">{s}</label>
                                            </div>
                                        )
                                    })
                                }

                            </div> : null}
                        </div>
                        <div style={{ "color": "grey" }} className="mt-5">

                            <span>100% Original Products</span><br />
                            <span>Free Delivery</span><br />
                            <span>Pay on delivery might be available</span><br />
                            <span>Easy 30 days returns and exchanges</span><br />
                            <span>Try &amp; Buy might be available</span><br />
                        </div>
                    </div>



                </div>
            </Base >
        )
    }
}

export default ProductDetails;