import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Login from "./Login";
import { userState } from "../redux/userSlice";


const PrivateRoute = ({ component, ...options }) => {
  const { loggedIn } = useSelector(userState);

  
  const finalComponent = loggedIn ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
