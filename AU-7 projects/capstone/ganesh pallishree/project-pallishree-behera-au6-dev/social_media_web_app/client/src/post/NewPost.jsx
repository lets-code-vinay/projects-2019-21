import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };

  render() {
    const {
      title,
      body,
      photo,
      user,
      error,
      loading,
      redirectToProfile,
    } = this.state;

    // if (redirectToProfile) {
    //   return <Redirect to={`/user/${user._id}`} />;
    // }

    return (
      <div className="container">
        <div className="card mt-5">
          <div className="card-header text-white text-center" style={{background:'#30336b'}}>
            <h2>Create New Post</h2>
          </div>
          <div className="card-body">
            <p
              className="text-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </p>

            {loading ? (
              <p className="text-center text-danger">Loading...</p>
            ) : (
              ""
            )}
            <form>
              <div className="form-group">
                <label className="text-muted">upload photo</label>
                <input
                  onChange={this.handleChange("photo")}
                  type="file"
                  accept="image/*"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                  onChange={this.handleChange("title")}
                  type="text"
                  className="form-control"
                  value={title}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                  onChange={this.handleChange("body")}
                  type="text"
                  className="form-control"
                  value={body}
                />
              </div>

              <button
                onClick={this.clickSubmit}
                className="btn btn-raised "
                style={{background:'#30336b', color:"white"}}
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
