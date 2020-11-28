import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import PersonIcon from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";
import ShopIcon from '@material-ui/icons/Shop';



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

export const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

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
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="secondary"
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

        <Link to="/events">
          <StyledMenuItem>
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="EVENTS" />
          </StyledMenuItem>
        </Link>


        <Link to="/events">
          <StyledMenuItem>
            <ListItemIcon>
              <ShopIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="TICKETS" />
          </StyledMenuItem>
        </Link>

        <Link to="/">
          <StyledMenuItem>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="LOGOUT" />
          </StyledMenuItem>
        </Link>



      </StyledMenu>
    </>
  );
};

export default Dropdown;
