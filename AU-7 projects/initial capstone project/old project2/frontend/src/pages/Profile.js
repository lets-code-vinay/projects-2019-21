import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../actions/users.action";
import UserPostsWrapper from "./UserPosts/UserPostsWrapper";
import {Container, Row, Col} from 'react-bootstrap';
import idCard1 from '../../images/idpng.png';

const Profile = ({
  getUserPosts,
  auth: { name, lastName, userName, avatar, email, contact, address, pincode, sellerType },
  users: { profilePosts },
}) => {
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
<div className="account-page-wrapper">
  <Container fluid>
    <Row>
      <Col md={4} className="profile-left">

        <div className="idCard">
          <img src={idCard1} alt="ID card" className="idCard"/>
        </div>


        <div className="data">
          <div className="idPhoto">
            <img src={avatar} alt="" />
          </div>



          <div className="data-items">
          <div className="font__pro data-item">
              <p  className="font__boldPro "> User ID: 
              {" "}
              <span className="font_highlight userBold">{userName} </span></p>
            </div>

            <div className="font__pro data-item">
              <p  className="font__boldPro">
                Name:
              {" "}
              <span className="font_highlight"> {name}</span></p>
            </div>

            <div className="font__pro data-item">
              <p  className="font__boldPro">
               Last Name:
              {" "}
              <span className="font_highlight"> {lastName}</span></p>
            </div>
            

            <div className="font__pro data-item">
              <p  className="font__boldPro">
                E-mail:
              {"  "}
              <span className="font_highlight">{email}</span></p>
            </div>

            <div className="font__pro data-item">
              <p  className="font__boldPro">
                Contact:
              {" "}
              <span className="font_highlight"> {contact}</span></p>
            </div>

            <div className="font__pro data-item">
              <p  className="font__boldPro">
                Address:
              
              {"  "}
              <span className="font_highlight">{address}</span>  </p>     
            </div>

            <div className="font__pro data-item">
              <p  className="font__boldPro">
                Pin code:
              
              {"  "}
              <span className="font_highlight">{pincode}</span></p>
            </div>

            <div className="font__pro data-item">
              <p  className="font__boldPro">
                Seller of:
              
              {"  "}
              <span className="font_highlight">{sellerType}</span> </p>            
            </div>

          </div>
        </div>
      </Col>
      
      <Col md={8} className="profile-right">
        <div className="user-posts">
          <header className="user-posts-header-wrapper app_color_background">
            {profilePosts !== null || profilePosts !== [] ? (
              <p className="user-posts-header font__p font__bold">Your topics</p>
            ) : (
              <p className="user-posts-header font__p font__bold">
                You haven't made any posts yet
              </p>
            )}
          </header>
          <UserPostsWrapper posts={profilePosts} />
        </div>
      </Col>
    </Row>
  </Container>



    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUserPosts })(Profile);
