import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row " >
                <div className="col-md-4">
                        <p className="text-primary text-white" >{posts.length} Posts</p>
                        <hr />
                        {posts.map((post, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/post/${post._id}`}>
                                        <div>
                                            <p>{post.title}</p>
                                            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} width="100%" height="100%" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>





                    <div className="col-md-4">
                        <p className="text-primary">
                            {followers.length} Followers
                        </p>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p>
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <p className="text-primary">
                            {following.length} Following
                        </p>
                        <hr />
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p>
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                   
                </div>
            </div>
        );
    }
}

export default ProfileTabs;
