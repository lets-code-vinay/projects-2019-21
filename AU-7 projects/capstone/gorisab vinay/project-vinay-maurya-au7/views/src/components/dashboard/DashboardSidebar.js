import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Container, Row, Col} from 'react-bootstrap';
const DashboardSidebar = props => {
  const { auth } = useSelector(state => state.userrr);

  return (
    

    <ul className='dashboard-settings'>
      {/* Only show admin dashboard to admins */}
      {auth.isAdmin && (

<div className="a">
<li className='categoryA'>
          <div className="frst">
          <i class='fa fa-user' aria-hidden='true'></i>
          <h1>Admin</h1>
          </div>

          <ul className="frstA">
            <li>
              <Link to='/addCategory'>Add Category</Link>
            </li>
            <li>
              <Link to='/editCategories'>Edit Categories</Link>
            </li>
            <li>
              <Link to='/permissions'>Users permissions</Link>
            </li>
            <li>
              <Link to='/dashboard/admin/admins_permissions'>All Admins</Link>
            </li>
            <li>
              <Link to='/dashboard/admin/shippers_permissions'>All Shippers</Link>
            </li>
          </ul>
        </li>
  </div>
      )}

      {/* Only show sellers dashboard to admins */}

      {auth.isSeller && (
<div className="b">
<li className='categoryB'>
          <div className="scnd">
          <i class='fa fa-tree' aria-hidden='true'></i>
          <h1>Farmer</h1>
          </div>
          <ul className="scndA">
            <li>
              <Link to='/addProduct'>Add Product</Link>
            </li>
            <li>
              <Link to='/editProducts'>Edit Products</Link>
            </li>
            <li>
              <Link to='/dashboard/seller/orders_to_ship'>
                Orders to ship
                <br />
              </Link>
            </li>
            <li>
              <Link to='/dashboard/seller/shipped_orders'>Shipped Orders</Link>
            </li>
          </ul>
        </li>
</div>
      )}

<div className="c">
<li className='categoryC'>
        <div className="thrd">
        <i class='fa fa-truck' aria-hidden='true'></i>
        <h1>Hawker</h1>
        </div>
        <ul className="thrdA">
          <li>
            <Link to='/dashboard/shipper/orders_to_deliver'>
              Orders to Deliver
              <br />
            </Link>
          </li>
          <li>
            <Link to='/dashboard/shipper/delivered_orders'>Delivered Orders</Link>
          </li>
        </ul>
      </li>
</div>
    </ul>
  );
};

export default DashboardSidebar;
