import React, { useState, useEffect, useContext } from "react";
import "./Search.css";
import Axios from "axios";
import authHeader from "../../Services/authHeader";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import logo from "../../Components/Loader.svg";
import { UserContext } from "../../App";
import CancelIcon from '@material-ui/icons/Cancel';


const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};
const URL = "https://mcsocialmedia.herokuapp.com";
function Search() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  console.log(data);
  useEffect(() => {
    Axios.get(URL + `/api/getUserByName/${value}`, {
      headers: header,
    })
      .then((users) => {
        setData(users.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value.length == 0) {
      setData([]);
    } else {
      setValue(e.target.value);
    }
  };

  const followUser = (id)=>{
    console.log("infollow user",id)
    Axios.put(URL+"/api/follow",JSON.stringify({followId:id}),{headers:header})
  }
  const unFollowUser = (id)=>{
    console.log("in unfollow user",id)
    Axios.put(URL+"/api/unfollow",JSON.stringify({unfollowId:id}),{headers:header})
  } 
  if (loading === true) {
    return (
      <div>
        <img src={logo}></img>
      </div>
    );
  }
  return (
    <div
      className="w3-container w3-content  "
      style={{ maxWidth: "1400px", marginTop: "80px" }}
    >
      <div className="w3-row">
        <div className="w3-col m4"></div>
        <div className="w3-col m12 ">
          <h1>Search for Friends.....</h1>
          <div className="">
            <input
              type="text"
              name="search"
              placeholder="Search.."
              id="myInput"
              onChange={handleChange}
              style={{ border: "none" }}
            ></input>
            <ul id="myUL">
              {data ? (
                data.map((item) => {
                  return (
                    <li key={item._id}>
                      <p>
                        <img
                          src={item.pic}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50px",
                          }}
                        ></img>
                        
                          {item.username}
                          
                        {
                          state.user.following.includes(item._id)? 
                            <IconButton className="w3-bar-item w3-button w3-white w3-xlarge w3-right w3-center" onClick={()=>{unFollowUser(item._id)}}>
                              <CancelIcon />
                            </IconButton>
                          :
                            <IconButton className="w3-bar-item w3-button w3-white w3-xlarge w3-right w3-center" onClick={()=>{followUser(item._id)}}>
                              <AddCircleOutlineIcon /> 
                            </IconButton>
                        }

                          
                        
                      </p>
                    </li>
                  );
                })
              ) : (
                <li>
                  <p>
                    <img src={logo}></img>
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
