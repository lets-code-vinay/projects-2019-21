import axios from "axios";

const API_URL = "https://mcsocialmedia.herokuapp.com/";

const register = async (fullname, username, email, password) => {
  try {
    const response = await axios.post(API_URL + "signup", {
      headers: {
        "Content-Type": "application/json",
      },
      fullname,
      username,
      email,
      password,
    });
    if (response.data.email) {
      localStorage.setItem("email", JSON.stringify(response.data.email));
    }
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      headers: {
        "Content-Type": "application/json",
      },
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
