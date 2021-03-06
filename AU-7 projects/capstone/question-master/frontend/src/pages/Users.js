import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers, searchByUsername } from "../actions/users.action";
import UsersWrapper from "./Users/UsersWrapper";

const Users = ({ getUsers, searchByUsername, auth }) => {
  useEffect(() => {
    getUsers();
  }, []);

  let [searchedUsername, setSearchedUsername] = useState("");

  const onChange = (e) => setSearchedUsername(e.target.value);

  const searchForUser = () => {
    if (searchedUsername === "" || searchedUsername === null) getUsers();
    else searchByUsername(searchedUsername);
  };

  return (
    <div>
      <header className="users-header">
        <p className="app_color_font font__bold font__p users-headline">
          Users
        </p>
        <br />

        <form className="search-user-wrapper">
          <textarea
            type="text"
            onChange={(e) => onChange(e)}
            value={searchedUsername}
          />

          <div
            className="user-search-button app_color_background font__p font__bold"
            onClick={() => searchForUser()}
          >
            Search for user
          </div>
        </form>
      </header>

      <div className="users-wrapper">
        <UsersWrapper users={auth.users} key={auth._id} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers, searchByUsername })(Users);
