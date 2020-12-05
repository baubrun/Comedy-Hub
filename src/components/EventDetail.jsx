import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


import {addToCart} from "../redux/cartSlice"

const useStyles = makeStyles((theme) => ({
  btn: {
    fontWeight: "bolder",
    letterSpacing: "2px",
  },
  grid: {
    backgroundColor: "black",
    color: "white",
    margin: "5% 0",
  },
  large: {
    width: 450,
    height: 450,
  },
  listItem: {
    fontFamily: "Courier Prime",
  },
}));

const ED = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    title,
    venue,
    startDate,
    performer,
    startTime,
    image,
    price,
    facebook,
    instagram,
    twitter,
  } = props.event;
  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item>
        <Avatar
          className={classes.large}
          alt={title}
          id="performer-img-detail"
          src={image}
        />
      </Grid>
      <Grid item>
        <List>
          <ListItem>
            <Link to="/cart">
              <Button
              className={classes.btn}
                color="secondary"
                onClick={() => dispatch(addToCart(props.event))}
                size="large"
                variant="contained"
              >RESERVE</Button>
            </Link>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography
                className={classes.listItem}
                variant="h5"
              >{`Title: ${title}`}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                Date: {moment(`${startDate}`).format("DD-MM-YYYY")}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                Time: {startTime}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                Venue: {venue}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography className={classes.listItem} variant="h5">
                Performer: {performer}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                Price: {price} $
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Box>
              {facebook && (
                <a href={`https://facebook.com/${facebook}`}>
                  <img 
                  src={require("../images/icons/fb.png")} 
                  alt="facebook" />
                </a>
              )}
              {instagram && (
                <a href={`https://instagram.com/${instagram}`}>
                  <img
                    src={require("../images/icons/ig-color.png")}
                    alt="instagram"
                  />
                </a>
              )}
              {twitter && (
                <a href={`https://instagram.com/${twitter}`}>
                  <img 
                  src={require("../images/icons/tt.png")} 
                  alt="twitter" />
                </a>
              )}
            </Box>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

const EventDetail = () => {
  const history = useHistory();
  const {events} = useSelector((state) => state.events);
  const match = useRouteMatch();

  if (events.length < 1) {
    history.push("/events");
  }

  const eventID = match.params.id;
  const selected = events.find((event) => {
    return event._id === eventID;
  });
  return <ED event={selected} />;
};

export default EventDetail;
