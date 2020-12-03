import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

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


import { cartState } from "../redux/cartSlice";

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: 15,
    left: -50,
    height: 36,
    width: 36,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
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

const NavBar = () => {
  const classes = useStyles();
  const { items } = useSelector((state) => state.cart);
  const { purchaseCreated } = useSelector(cartState);
  const [checkedOut, setCheckedOut] = useState(false)

  useEffect(() => {
    if (purchaseCreated){
      setCheckedOut(true)
    }
  },[purchaseCreated])


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
              
              {!checkedOut && ( 
              <Grid item>
                <StyledBadge
                  badgeContent={(items && items.length)}
                  color="secondary"
                >
                  {items && items.length > 0 && (
                    <ShoppingCartIcon style={{ fontSize: 40 }} />
                  )}
                </StyledBadge>
              </Grid>
              )}

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
