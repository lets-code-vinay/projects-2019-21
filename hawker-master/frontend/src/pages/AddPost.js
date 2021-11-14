import React, { useState } from "react";
import { connect } from "react-redux";
import { clearPost, createPost } from "../actions/posts.action";
import { Link } from "react-router-dom";

const AddPost = ({ clearPost, createPost, posts: { post } }) => {
  let [textOfThePost, setTextOfThePost] = useState("");

  const onChange = (e) => setTextOfThePost(e.target.value);

  const submitData = () => {
    if (textOfThePost !== "" && textOfThePost !== null) {
      createPost(textOfThePost);
    } else {
      alert("Text is empty!");
    }
    setTextOfThePost("");

    setTimeout(() => {
      clearPost();
    }, 5000);
  };

  return (
    <div className="make-post-wrapper">
      { post === null ? (
        <div className="tips-wrapper">
          <p className="font__p p__size font__bold app_color_font">
            <i className="fas fa-check-circle small_margin_right"></i>
            Add Your Todo here
          </p>
          <br />

          <form>
            <textarea
              type="text"
              value={textOfThePost}
              onChange={(e) => onChange(e)}
            />
            <div
              onClick={() => submitData()}
              className="app_color_background add-post-button font__p font__bold"
            >
              Add ToDo
            </div>
          </form>
        </div>
      ) : (
        <div className="output">
          <div className="output-header">
            <p className="font__bold font__p app_color_font">POST ADDED</p>
          </div>
          <div className="output-buttons-wrapper">
            <div className="output-buttons">
              <div onClick={() => clearPost()}>
                <p className="p__size font__p">Add New Todo</p>
              </div>
              <div className="view-comment output-button app_color_background">
                <Link
                  to="/topics"
                  className="white__color__font"
                  style={{ textDecoration: "none" }}
                >
                  <p className="p__size font__p">View ToDos</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  createPost,
  clearPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
