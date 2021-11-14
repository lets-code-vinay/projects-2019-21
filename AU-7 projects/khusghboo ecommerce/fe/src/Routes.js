import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import ProductDetails from "./user/productDetails";
import About from "./core/about";
import Contact from "./core/contact";
import AdminOrders from "./admin/AdminOrders";
import UserProfile from "./user/Profile";
import UserOrder from "./user/UserOrder";
import Address from "./user/Address";
import Paymentb from "./core/Paymentb";
import ReturnPolicy from "./core/ReturnPolicy";
import FilterProduct from "./core/Filter.js";
import Security from "./core/Security";
import Privacy from "./core/Privacy";
import FAQ from "./core/FAQ";
import ResetPassword from "./user/ResetPassword";
import Forget from './user/forgetPassword'
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/returnpolicy" exact component={ReturnPolicy} />
        <Route path="/security" exact component={Security} />
        <Route path="/privacy" exact component={Privacy} />
        <Route path="/faq" exact component={FAQ} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/forget" exact component={Forget} />

        <Route path="/reset/:token" exact component={ResetPassword} />
        <PrivateRoute path="/cart" exact component={Cart} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/products/search/" exact component={FilterProduct} />
        <Route
          path="/products/all/:categoryId/:pageNum"
          exact
          render={(props) => <FilterProduct key={Math.random()} {...props} />}
        />

        <Route path="/product/:productId" exact component={ProductDetails} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute
          path="/user/updateProfile"
          exact
          component={UserProfile}
        />
        <PrivateRoute path="/user/address" exact component={Address} />
        <PrivateRoute path="/user/payment" exact component={Paymentb} />
        <PrivateRoute path="/user/orders" exact component={UserOrder} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />

        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/orders" exact component={AdminOrders} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
