import axios from "axios";
import {
  GET_USER_POSTS,
  GET_USERS,
  USER_ERROR,
  GET_POST_BY_USER_ID,
  GET_USER_BY_ID,
//  GET_CATEGORY_BY_USER_ID,
  GET_CATEGORY
} from "../constants/users.constants";
import { SEARCH_BY_USERNAME } from "../constants/auth.constants";

//-----------------------post------------------------------------
export const getUserPostsById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/posts/user_posts/${user_id}`
    );
    dispatch({ type: GET_POST_BY_USER_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const getUserPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/user_posts`);
    dispatch({ type: GET_USER_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
//---------------------------------------------------------------
//---------------------------users-------------------------------
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/users/users`);
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const getUserById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/get_user_by_id/${user_id}`
    );
    dispatch({ type: GET_USER_BY_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const searchByUsername = (userNameFromSearch) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ userNameFromSearch });
    const response = await axios.put(
      `http://localhost:5000/api/users/search_by_username`,
      body,
      config
    );
    dispatch({
      type: SEARCH_BY_USERNAME,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
//----------------------------------------------------------------

////----------------------Categories------------------------------//

export const getcategories = () => async (dispatch) =>{
  try{
    const res = await axios.get(`localhost:5000/api/categories/getcategory`);
    dispatch({ type: GET_CATEGORY, payload: res.data });
  } catch (error){
    dispatch({
      type:USER_ERROR,
      payload : error,
    })
  }
};
// export const getUserCategoriesById = (user_id) => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/api/categories/user_categories/${user_id}`
//     );
//     dispatch({ type: GET_CATEGORY_BY_USER_ID, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: USER_ERROR,
//       payload: error,
//     });
//   }
// };

// export const getUserCategories = () => async (dispatch) => {
//   try {
//     const res = await axios.get(`http://localhost:5000/api/categories/user_categories`);
//     dispatch({ type: GET_USER_POSTS, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: USER_ERROR,
//       payload: error,
//     });
//   }
// };
// ////-------------------------------------------------------------//