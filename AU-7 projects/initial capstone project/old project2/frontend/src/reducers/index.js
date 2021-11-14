import { combineReducers } from "redux";
import users from "./users.reducer";
import posts from "./posts.reducer";
import categories from "./categories.reducer";
import auth from "./auth.reducer";

export default combineReducers({
  users,
  posts,
  auth,
  categories,
});
