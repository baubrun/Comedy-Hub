import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import {
  logOutAction,
  resetSeatsAvailAction,
  resetEventsAction,
  emptyCartAction,
} from "../actions/actions";
// import "./NavBar.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    bottom: "auto",
    top: 0,
  },
  title: {
    color: "white",
    fontWeight: "bolder",
    padding: "5px"
  }

})

const NavBar = (props) => {
  const currentPage = useLocation().pathname;
  const classes = useStyles()

  const logout = () => {
    props.logoutUser();
    props.emptyCart();
    props.resetSeatsAvail();
    props.resetEvents();
  };

  return (
    <>
      <AppBar className={classes.appBar} color="primary" position="static">
        <Box>
          <Typography component="h1">
            <Link id="logo" className="badge-primary font-weight-bolder" to="/">
              <Typography className={classes.title} color="white" component="h1">
                LE COMEDY HUB
              </Typography>
            </Link>
          </Typography>
          <Dropdown />
    
        </Box>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
    cart: state.cart,
    checkedOut: state.checkedOut,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logOutAction()),
    resetSeatsAvail: () => dispatch(resetSeatsAvailAction()),
    resetEvents: () => dispatch(resetEventsAction()),
    emptyCart: () => dispatch(emptyCartAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
