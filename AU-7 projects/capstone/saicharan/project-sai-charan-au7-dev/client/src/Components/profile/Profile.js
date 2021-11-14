import React, { useState, useEffect, useContext } from "react";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import authHeader from "../../Services/authHeader";

const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};
const URL = "https://mcsocialmedia.herokuapp.com";
function Profile() {
  const clik = () => {
    document.getElementById("file-input").click();
  };
  const clikProfile = () => {
    document.getElementById("profile-input").click();
  };

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [counter, setCounter] = useState(0);
  const [banner, setBanner] = useState("");
  const [pic, setPic] = useState("");

  const { state, dispatch } = useContext(UserContext);
  console.log(data);
  useEffect(() => {
    axios
      .get(URL + `/api/user/${id}`, {
        headers: header,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        setData(res.data.posts);
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
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
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
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(data);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (banner) {
      const image = new FormData();
      image.append("file", banner);
      image.append("upload_preset", "saisricharanbannerpreset");
      image.append("cloud_name", "saisricharan");
      image.append("api_key", "266946824166371");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/saisricharan/image/upload",
          image,

          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          axios
            .put(
              URL + "/api/updatebanner",
              JSON.stringify({ banner: res.data.url }),
              { headers: header }
            )
            .then((result) => {
              console.log(result);
              JSON.stringify({ ...user, banner: result.banner });
              setCounter(counter + 1);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  }, [banner]);

  const updateBanner = (file) => {
    setBanner(file);
  };

  useEffect(() => {
    if (pic) {
      const image = new FormData();
      image.append("file", pic);
      image.append("upload_preset", "saisricharanpicpreset");
      image.append("cloud_name", "saisricharan");
      image.append("api_key", "266946824166371");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/saisricharan/image/upload",
          image,

          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          axios
            .put(
              URL + "/api/updateprofilepic",
              JSON.stringify({ pic: res.data.url }),
              { headers: header }
            )
            .then((result) => {
              console.log(result);
              JSON.stringify({ ...user, pic: result.pic });
              setCounter(counter + 1);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  }, [pic]);
  const updatePic = (file) => {
    setPic(file);
  };

  if (!id) return <div>Not a valid Page</div>;

  return (
    <div>
      <div
        className="w3-container w3-content"
        style={{ maxWidth: "1400px", marginTop: "0px" }}
      >
        <div className="w3-row">
          <div className="w3-col m12">
            <div
              className="w3-col m8"
              style={{
                backgroundImage: `url(${user.banner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                cursor: "pointer",
                width: "150vw",
                height: "50vh",
              }}
              onClick={clik}
              type="file"
              value={banner}
              onChange={(e) => updateBanner(e.target.files[0])}
            >
              <input
                id="file-input"
                type="file"
                style={{ visibility: "hidden" }}
              />
            </div>
            <br />
            <br />
            <br />
            <div className="w3-row">
              <div className="w3-col m3" style={{ marginTop: "5vh" }}>
                <div className="w3-card w3-round w3-white">
                  <div className="w3-container">
                    <h4 className="w3-center">My Profile</h4>
                    <p className="w3-center">
                      <div
                        className="profilePicture"
                        style={{
                          backgroundImage: `url(${user.pic})`,
                          backgroundPosition: "50% 50%",
                          height: "106px",
                          width: "106px",
                          backgroundSize: "cover",
                          cursor: "pointer",
                        }}
                        onClick={clikProfile}
                        type="file"
                        value={pic}
                        onChange={(e) => updatePic(e.target.files[0])}
                      >
                        <input
                          id="profile-input"
                          type="file"
                          style={{ visibility: "hidden" }}
                        />
                      </div>
                    </p>
                    <p>Update Profile Pic</p>
                    <hr />
                    <Link to={`/friends/${user._id}`}>
                      <p style={{ fontWeight: "900" }}>Friends</p>
                    </Link>
                  </div>
                </div>
              </div>
              {/*Your Posts*/}
              <div className="w3-col m8" style={{ marginTop: "5vh" }}>
                {data.length ? (
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
                        <span className="w3-right w3-opacity">
                          {item.createdAt}
                        </span>

                        <br />
                        <hr className="w3-clear" />
                        <p>{item.body || ""}</p>
                        <div
                          className="w3-row-padding"
                          style={{ margin: "0 -16px" }}
                        >
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
                    <h3>There are no posts... Please post Some Thing...</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
