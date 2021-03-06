import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import StreetviewIcon from "@material-ui/icons/Streetview";
import Typography from "@material-ui/core/Typography";

import { logOut, userState } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";
import { clearEvents } from "../redux/eventsSlice";
import { makeStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
  },
}));

export const Dropdown = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedIn, hostId } = useSelector(userState);
  const [anchorEl, setAnchorEl] = useState(null);

  const logout = () => {
    dispatch(logOut());
    dispatch(clearCart());
    dispatch(clearEvents());
    history.push("/");
  };

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Button
          variant="contained"
          color="secondary"
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={(evt) => handleClick(evt)}
        >
          MENU
        </Button>

        {loggedIn && (
          <Box m={2}>
            <Typography
              variant="h6"
              color="secondary"
            >{`Hi ${hostId}!`}</Typography>
          </Box>
        )}
      </Grid>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(evt) => handleClose(evt)}
      >
        {!loggedIn && (
          <Link className={classes.link} to="/login">
            <StyledMenuItem>
              <ListItemIcon>
                <InboxIcon color="secondary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="LOGIN" />
            </StyledMenuItem>
          </Link>
        )}

        <Link className={classes.link} to="/profile">
          <StyledMenuItem>
            <ListItemIcon>
              <PersonIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="PROFILE" />
          </StyledMenuItem>
        </Link>

        <Link className={classes.link} to="/events">
          <StyledMenuItem>
            <ListItemIcon>
              <StreetviewIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="EVENTS" />
          </StyledMenuItem>
        </Link>

        {loggedIn && (
          <Link className={classes.link} to="/">
            <StyledMenuItem>
              <ListItemIcon>
                <InboxIcon color="secondary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="LOGOUT" onClick={() => logout()} />
            </StyledMenuItem>
          </Link>
        )}
      </StyledMenu>
    </>
  );
};

export default Dropdown;
