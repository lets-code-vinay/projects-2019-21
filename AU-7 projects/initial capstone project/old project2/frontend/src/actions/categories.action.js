import {
  MAKE_CATEGORY,
  CATEGORY_ERROR,
  //REMOVE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
  CLEAR_CATEGORY,
  CLEAR_CATEGORIES,
  //SEARCH_CATEGORIES,
} from "../constants/categories.constants";
import axios from "axios";
import { getUserPosts } from "./users.action";

export const clearCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CATEGORY });
  } catch (error) {
    dispatch({
      type:  CATEGORY_ERROR,
      payload: error,
    });
  }
};

export const clearCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CATEGORIES });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("localhost:5000/api/categories/getcategory");
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR ,
      payload: error,
    });
  }
};

export const getCategory = (category_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/categories/${category_id}`
    );
    dispatch({ type: GET_CATEGORY, payload: res.data });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
  }
};
//--------------------  ^ ------------
export const createCategory = (textOfThePost) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ textOfThePost });
    const res = await axios.post(
      `http://localhost:5000/api/categories/create`,
      body,
      config
    );

    dispatch({ type: MAKE_CATEGORY, payload: res.data });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
  }
};

// export const createComment = (textOfTheComment, post_id) => async (
//   dispatch
// ) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const body = JSON.stringify({ textOfTheComment });
//     const res = await axios.put(
//       `http://localhost:5000/api/posts/add_comment/${post_id}`,
//       body,
//       config
//     );

//     dispatch({ type: ADD_COMMENT, payload: res.data });
//     dispatch(getPost(post_id));
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const searchTopics = (searchInput) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const body = JSON.stringify({ searchInput });
//     const res = await axios.put(
//       `http://localhost:5000/api/posts/search_for_post`,
//       body,
//       config
//     );

//     dispatch({ type: SEARCH_TOPICS, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const addLikeToPost = (
//   post_id,
//   isOldest,
//   isMostRecent,
//   isMostCommented,
//   isMostLiked
// ) => async (dispatch) => {
//   try {
//     const res = await axios.put(
//       `http://localhost:5000/api/posts/likes/${post_id}`
//     );
//     dispatch({ type: ADD_LIKE, payload: res.data });

//     if (isOldest) {
//       dispatch(getPosts());
//     } else if (isMostRecent) {
//       dispatch(getMostRecentPosts());
//     } else if (isMostCommented) {
//       dispatch(getMostCommentedPosts());
//     } else if (isMostLiked) {
//       dispatch(getMostLikedPosts());
//     }
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const addLikeToComment = (post_id, comment_id) => async (dispatch) => {
//   try {
//     const res = await axios.put(
//       `http://localhost:5000/api/posts/like_comment/${post_id}/${comment_id}`
//     );
//     dispatch({ type: LIKE_COMMENT, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const removeLikeFromTopicPost = (
//   post_id,
//   like_id,
//   isOldest,
//   isMostRecent,
//   isMostCommented,
//   isMostLiked
// ) => async (dispatch) => {
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/posts/remove_like_from_post/${post_id}/${like_id}`
//     );
//     dispatch({
//       type: REMOVE_LIKE,
//       payload: res.data,
//     });
//     if (isOldest) {
//       dispatch(getPosts());
//     } else if (isMostRecent) {
//       dispatch(getMostRecentPosts());
//     } else if (isMostCommented) {
//       dispatch(getMostCommentedPosts());
//     } else if (isMostLiked) {
//       dispatch(getMostLikedPosts());
//     }
//   } catch (error) {
//     console.log(error.message);
//     dispatch({ type: POST_ERROR });
//   }
// };

// export const removePost = (post_id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/posts/delete_post/${post_id}`
//     );
//     dispatch({ type: REMOVE_POST, payload: res.data });
//     dispatch(getUserPosts());
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const removeLikeFromPost = (post_id, like_id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/posts/remove_like_from_post/${post_id}/${like_id}`
//     );
//     dispatch({ type: REMOVE_POST, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const removeComment = (post_id, comment_id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/posts/remove_comment/${post_id}/${comment_id}`
//     );
//     dispatch({ type: REMOVE_COMMENT, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };

// export const removeLikeFromComment = (post_id, comment_id, like_id) => async (
//   dispatch
// ) => {
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/posts/remove_like_from_comment/${post_id}/${comment_id}/${like_id}`
//     );
//     dispatch({ type: REMOVE_LIKE_FROM_COMMENT, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: error,
//     });
//   }
// };
