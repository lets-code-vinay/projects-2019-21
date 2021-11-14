import React, { useEffect, createContext, useReducer, useContext } from "react";
import Header from "./Components/header/Header";
import LoignSignup from "./Components/loginSignup/LoginSignup";
import Body from "./Components/Body";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./styles.css";
import VerifyEmail from "./Components/loginSignup/VerifyEmail";
import { reducer, initialState } from "./reducers/userReducer";
import Chat from "./Components/chat/Chat";
import Profile from "./Components/profile/Profile";
import Friends from "./Components/friends/Friends";
import Comments from "./Components/comments/Comments";
import Search from "./Components/search/Search";
import ForgotPass from "./Components/forgotPassword/ForgotPass";
import { ProtectedRoute } from "./ProtectedRoute";
import Reset from "./Components/reset/Reset";
import Home from "./Components/home/Home";
import Error from "./Components/error/Error";

export const UserContext = createContext();

function Routing() {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("mode")
  );

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      console.log("");
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/joinus" component={LoignSignup} />
        <Route exact path="/forgot" component={ForgotPass} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/" component={Home}/>
        <ProtectedRoute exact path="/verify/:id" component={VerifyEmail} />
        <ProtectedRoute exact path="/feed" component={Body} />
        <ProtectedRoute exact path="/chat" component={Chat} />
        <ProtectedRoute exact path="/profile/:id" component={Profile} />
        <ProtectedRoute exact path="/friends/:id" component={Friends} />
        <ProtectedRoute exact path="/post/comments/:id" component={Comments} />
        <ProtectedRoute exact path="/explore" component={Search} />
        <ProtectedRoute exact path="/chat/:id" component={Chat}/>
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
