import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../Services/authHeader";
import "../comments/Comments.css";
import { UserContext } from "../../App";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};
const URL = "https://mcsocialmedia.herokuapp.com";
function Comments() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  const likes = data.likes;
  console.log(data);
  useEffect(() => {
    axios
      .get(URL + `/api/comments/${id}`, {
        headers: header,
      })
      .then((res) => {
        setData(res.data.posts);
        setComment(res.data.posts.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const makeComment = (text, postId) => {
    axios
      .put(
        URL + "/post/comment",
        JSON.stringify({
          postId,
          text,
        }),
        { headers: header }
      )
      .then((result) => {
        console.log(result);

        setData(result.data);
        setComment(result.data.comments);
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        console.log(result.data);

        setData(result.data);
        setComment(result.data.comments);
        setCount(count + 1);
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
        setData(result.data);
        setComment(result.data.comments);
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="w3-container w3-content"
      style={{ maxWidth: "1400px", marginTop: "80px" }}
    >
      <div className="w3-row w3-center">
        <div className="w3-col"></div>
        <div className="w3-row-padding w3-center">
          <div className="w3-col ">
            <div className="w3-col m8 w3-center">
              <div className="w3-container w3-card w3-white w3-round w3-margin">
                <br />
                <img
                  src={data.postedBy ? data.postedBy.pic : ""}
                  className="w3-left w3-circle w3-margin-right"
                  style={{ width: "60px" }}
                />
                <h4>{data.postedBy ? data.postedBy.username : ""}</h4>
                <br />
                <hr className="w3-clear" />
                <p>{data.body || ""}</p>
                <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
                  <div className="w3-container">
                    <img
                      src={data.media}
                      style={{ width: "100%" }}
                      alt="Northern Lights"
                      className="w3-margin-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w3-col m4 ">
              <ul class="comment-section">
                <li class="write-new">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, data._id);
                      e.target[0].value = "";
                    }}
                  >
                    <textarea
                      placeholder="Write your comment here"
                      name="comment"
                    ></textarea>

                    <div>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </li>
                {data ? (
                  comment.map((item) => {
                    return (
                      <li class="comment author-comment" key={item._id}>
                        <div class="info">
                          <a href="#">{item.postedBy.username}</a>
                        </div>

                        <a class="avatar" href="#">
                          <img
                            src={item.postedBy.pic}
                            width="35"
                            alt={item.postedBy.username}
                          />
                        </a>

                        <p>{item.text}</p>
                      </li>
                    );
                  })
                ) : (
                  <div>No Comments Yet Please make a Comment</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
