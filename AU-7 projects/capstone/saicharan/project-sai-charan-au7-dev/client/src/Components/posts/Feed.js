import React, { useState, useEffect, useContext } from "react";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import { UserContext } from "../../App";
import axios from "axios";
import authHeader from "../../Services/authHeader";
import { Link } from "react-router-dom";
import NewPost from "../newPost/NewPost";
import logo from "../../Components/Loader.svg";
const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};
const URL = "https://mcsocialmedia.herokuapp.com";

function Feed() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log(counter);
  console.log(data);
  useEffect(() => {
    axios
      .get(URL + "/post/followingposts", {
        headers: header,
      })
      .then((res) => {
        setData(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter]);

  const likePost = async (id) => {
    await axios
      .put(
        URL + "/post/like",
        JSON.stringify({ postId: id }),

        {
          headers: header,
        }
      )
      .then((result) => {
        setData(data);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    axios
      .put(
        URL + "/post/unlike",
        JSON.stringify({
          postId: id,
        }),

        {
          headers: header,
        }
      )
      .then((result) => {
        
        setData(data);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading === true) {
    return (
      <div>
        <img src={logo}></img>
      </div>
    );
  }
  return (
    <div className="w3-col m7">
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">Write any Thing To Post</h6>
              <NewPost />
            </div>
          </div>
        </div>
      </div>
      {data ? (
        data.map((item) => {
          return (
            <div
              className="w3-container w3-card w3-white w3-round w3-margin"
              key={item._id}
            >
              <br />
              <Link to={`/profile/${item.postedBy._id}`}>
                <img
                  src={item.postedBy.pic}
                  alt="Avatar"
                  className="w3-left w3-circle w3-margin-right"
                  style={{ width: "60px" }}
                />
              </Link>
              <Link to={`/profile/${item.postedBy._id}`}>
                <h3 style={{ fontWeight: "bolder" }}>
                  {" "}
                  {item.postedBy.username}
                </h3>
              </Link>
              <span className="w3-right w3-opacity">{item.createdAt}</span>

              <br />
              <hr className="w3-clear" />
              <p>{item.body || ""}</p>
              <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
                <div className="w3-container">
                  <img
                    src={item.media || ""}
                    style={{ width: "100%" }}
                    alt=""
                    className="w3-margin-bottom"
                  />
                </div>
              </div>
              <div className="feed__buttons">
                <div className="w3-button">
                  {item.likes.includes(state.user._id) ? (
                    <IconButton
                      style={{
                        color: "#ff0080",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    >
                      <FavoriteBorderIcon
                        className="fa fa-thumbs-up"
                        style={{ color: "#ff0080" }}
                      ></FavoriteBorderIcon>
                      {item.likes.length}{" "}
                    </IconButton>
                  ) : (
                    <IconButton
                      style={{ color: "#000000" }}
                      onClick={() => {
                        likePost(item._id);
                      }}
                    >
                      <FavoriteBorderIcon className="fa fa-thumbs-up"></FavoriteBorderIcon>
                      {item.likes.length}{" "}
                    </IconButton>
                  )}
                  <span
                    style={
                      item.likes.includes(state.user._id)
                        ? { marginLeft: "0.75em", color: "#346eeb" }
                        : { marginLeft: "0.75em", color: "#000000" }
                    }
                  ></span>
                </div>
                <div className="w3-button">
                  <IconButton>
                    <Link to={`/post/comments/${item._id}`}>
                      <CommentIcon className="fa fa-comment">
                        Comments
                      </CommentIcon>
                    </Link>
                  </IconButton>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <img src="Infinity-1s-200px.svg"> </img>
        </div>
      )}
    </div>
  );
}

export default Feed;
