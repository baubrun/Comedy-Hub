import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import {
  logOutAction,
  resetSeatsAvailAction,
  resetEventsAction,
  clearCartAction,
} from "../actions/actions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from "@material-ui/core/styles";

// const mapStateToProps = (state) => {
//   return {
//     loggedIn: state.auth.loggedIn,
//     hostId: state.auth.hostId,
//     cart: state.cart,
//     checkedOut: state.checkedOut,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     logoutUser: () => dispatch(logOutAction()),
//     resetSeatsAvail: () => dispatch(resetSeatsAvailAction()),
//     resetEvents: () => dispatch(resetEventsAction()),
//     emptyCart: () => dispatch(clearCartAction()),
//   };
// };

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: 15,
    left: -45,
    height: 36,
    width: 36,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    // marginLeft: "4px"
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: "auto",
    top: 0,
  },
  title: {
    color: "white",
    fontWeight: "bolder",
    padding: "5px",
  },
  toolbar: theme.mixins.toolbar,
  badge: {
    fontSize: "24px",
  },
}));

const NavBar = (props) => {
  const currentPage = useLocation().pathname;
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} color="primary" position="static">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography component="h1">
                <Link to="/">
                  <Typography className={classes.title} component="h1">
                    LE COMEDY HUB
                  </Typography>
                </Link>
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Dropdown />
              </Grid>
              <Grid item>
                <StyledBadge badgeContent={100} color="secondary">
                  <ShoppingCartIcon style={{ fontSize: 40 }} />
                </StyledBadge>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;
