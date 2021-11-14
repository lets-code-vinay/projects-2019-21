import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function VerifyEmail() {
  const { id } = useParams();
  const headers = {
    "Content-Type": "application/json",
  };
  const [user, setUser] = useState();
  useEffect((headers, id) => {
    axios
      .get(`https://mcsocialmedia.herokuapp.com/verify/${id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.error || res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user);
  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
}

export default VerifyEmail;
