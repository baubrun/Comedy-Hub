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

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: "auto",
    top: 0,
  },
  title: {
    color: "white",
    fontWeight: "bolder",
    padding: "5px"
  },
  toolbar: theme.mixins.toolbar,
}));



const NavBar = (props) => {
  const currentPage = useLocation().pathname;
  const classes = useStyles()

  return (
    <>
    <CssBaseline />
      <AppBar className={classes.appBar} color="primary" position="static">
        <Toolbar className={classes.toolbar}>
        <Box>
          <Typography component="h1">
            <Link id="logo" className="badge-primary font-weight-bolder" to="/">
              <Typography className={classes.title} component="h1">
                LE COMEDY HUB
              </Typography>
            </Link>
          </Typography>
          <Dropdown />
    
        </Box>
        </Toolbar>
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
