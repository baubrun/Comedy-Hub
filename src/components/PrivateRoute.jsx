import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { userState } from "../redux/userSlice";
import Login from "./Login";

const PrivateRoute = ({ component, ...options }) => {
  const { loggedIn } = useSelector(userState);

  
  const finalComponent = loggedIn ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
