import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAmountAction, addToCartAction } from "../actions/actions";
import moment from "moment";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
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

  const dispatchAddToCart = () => {
    dispatch(addToCartAction(props.event));
  };

  console.log('props.event :>> ', props.event);

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
          src={`../../${image}`}
        />
      </Grid>
      <Grid item>
        <List>
          <ListItem>
            <Link to="/cart">
              <Button
                text="RESERVE"
                color="primary"
                onClick={() => dispatchAddToCart()}
                size="large"
              />
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
                Venue: {venue.split("_").join(" ")}
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
                <Link to={`facebook.com/${facebook}`}>
                  <img src={require("../images/fb.png")} alt="facebook" />
                </Link>
              )}
              {instagram && (
                <Link to={`instagram.com/${instagram}`}>
                  <img
                    src={require("../images/ig-color.png")}
                    alt="instagram"
                  />
                </Link>
              )}
              {twitter && (
                <Link to={`instagram.com/${twitter}`}>
                  <img src={require("../images/tt.png")} alt="twitter" />
                </Link>
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
  const events = useSelector((state) => state.events);
  const { addToCart } = useSelector((state) => state.cart);
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
