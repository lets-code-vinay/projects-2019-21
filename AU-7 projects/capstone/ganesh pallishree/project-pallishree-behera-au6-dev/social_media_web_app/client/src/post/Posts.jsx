import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";
import { like, unlike } from "./apiPost";
import { isAuthenticated } from "../auth";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1,
      like: false,
      likes:0,
      post: "",
      redirectToHome: false,
      redirectToSignin: false,
    };
  }

  loadPosts = (page) => {
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  //like check for user
  checkLike = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount() {
    this.loadPosts(this.state.page);

 /*    //like
    const postId = this.props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments,
        });
      }
    }); */

    
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };


///like unlike function
  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    
    callApi(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  }









  renderPosts = (posts) => {


    //like
    const { like, likes } = this.state
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          const photoUrl = post.postedBy
          ? `${process.env.REACT_APP_API_URL}/user/photo/${
           post.postedBy._id
            }?${new Date().getTime()}`
          : DefaultProfile;
         
          return (
            <div className="card col-md-5 offset-3 my-2" key={i}>
              <div className="card-body">
               <img src={photoUrl} onError={i => (i.target.src = `${DefaultProfile}`)} width="50px" height="50px" style={{borderRadius:"50%"}} /> 
                <h4 style={{color:'#30336b' , float:'right'}} className="font-italic"> {posterName.toUpperCase()} </h4>
                <p className="font-italic text-muted small">posted on {new Date(post.created).toDateString()}</p>
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(i) => (i.target.src = `${DefaultPost}`)}
                  className="img-thunbnail mb-3 img-fluid w-100"
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}</p>
              
               



             {/*    <p className="font-italic text-muted small">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p> */}
                <Link to={`/post/${post._id}`} className="text-primary">
                <button  
                className="btn btn-raised "
                style={{background:'#30336b', color:"white"}}
                >
                  Read more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5" style={{color:'#30336b', textAlign:"center"}}>
          {!posts.length ? "No more posts!" : "Recent Posts"}
        </h2>

        {this.renderPosts(posts)}

        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised  mt-5 mb-5"
            onClick={() => this.loadMore(1)}
            style={{background:'#30336b', color:"white"}}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;
