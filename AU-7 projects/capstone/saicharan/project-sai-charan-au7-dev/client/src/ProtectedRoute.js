import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../src/Services/authService";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getCurrentUser()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/joinus",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
