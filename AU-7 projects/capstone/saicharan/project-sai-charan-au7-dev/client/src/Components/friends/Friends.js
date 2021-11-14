import React, { useEffect, useState } from "react";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import authHeader from "../../Services/authHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};
const URL = "https://mcsocialmedia.herokuapp.com";
function Friends() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  console.log(data);
  useEffect(() => {
    axios
      .get(URL + "/api/followers", {
        headers: header,
      })
      .then((res) => {
        setData(res.data.users.following);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const unfollowUser = (id) => {
    axios
      .put(
        URL + "/api/unfollow",
        JSON.stringify({
          unfollowId: id,
        }),
        { headers: header }
      )
      .then((data) => {
        console.log(data.data);
      });
  };

  return (
    <div>
      <div
        className="w3-container w3-content"
        style={{ maxWidth: "1400px", marginTop: "40px" }}
      >
        <div className="w3-row">
          <div className="w3-col m12">
            <ul className="w3-ul w3-card-4">
              {data ? (
                data.map((item) => {
                  return (
                    <li className="w3-bar w3-center" key={item._id}>
                      {/*<IconButton className="w3-bar-item w3-button w3-white w3-xlarge w3-right w3-center">
                        <CancelIcon onClick={unfollowUser(item._id)} />
                      </IconButton>*/}
                      <Link to={`/profile/${item._id}`}>
                        <img
                          src={item.pic}
                          className="w3-bar-item w3-circle w3-hide-small"
                          style={{ width: "85px" }}
                        />
                        <div className="w3-bar-item">
                          <span className="w3-large">{item.username}</span>
                          <br />
                          <span></span>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <div>
                  <h3>No Followers... Please Follow..</h3>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
