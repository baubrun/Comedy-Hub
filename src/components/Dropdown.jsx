import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";
import StreetviewIcon from "@material-ui/icons/Streetview";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { logOut, userState } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";
import { clearEvents } from "../redux/eventsSlice";


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


export const Dropdown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(userState);
  const history = useHistory();
  // const location = useLocation();
  // const isNotLoginPage = location.pathname !== "/login";


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
      <Box>
        <Button
          variant="contained"
          color="secondary"
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={(evt) => handleClick(evt)}
        >
          MENU
        </Button>
      </Box>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(evt) => handleClose(evt)}
      >
            <Link to="/profile">
              <StyledMenuItem>
                <ListItemIcon color="secondary">
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="PROFILE" />
              </StyledMenuItem>
            </Link>
            
          <Link to="/login">
            <StyledMenuItem>
              <ListItemIcon color="secondary">
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="LOGIN" />
            </StyledMenuItem>
          </Link>

        <Link to="/events">
          <StyledMenuItem>
            <ListItemIcon>
              <StreetviewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="EVENTS" />
          </StyledMenuItem>
        </Link>

        <Link to="/events">
          <StyledMenuItem>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="TICKETS" />
          </StyledMenuItem>
        </Link>

        {loggedIn && (
          <Link to="/">
            <StyledMenuItem>
              <ListItemIcon>
                <InboxIcon fontSize="small" />
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
