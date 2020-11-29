import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../actions/actions";
import moment from "moment";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';


// const mapStateToProps = (state) => {
//   return {
//     events: state.events,
//     cart: state.cart,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (item) => dispatch(addToCartAction(item)),
//   };
// };

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const ED = (props) => {
  const classes = useStyles();

  const dispatchAddToCart = () => {
    props.addToCart(props.event);
  };

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
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        id="event-detail-body"
      >
        <Grid item className="col-12 col-md-5 offset-2 mt-5 img-detail">
          <img
            id="performer-img-detail"
            className="img-detail "
            src={`../../${image}`}
            alt=""
          />
        </Grid>
        <Grid item className="col-12 col-md-5 mt-5">
          <List id="event-detail" className="list-group ">
            <ListItem className="list-group-item ">
              <Link to="/cart">
                <Button
                  text="RESERVE"
                  color="secondary"
                  onClick={dispatchAddToCart}
                />
              </Link>
            </ListItem>

            <ListItem className="list-group-item">
              <ListItemText>
              Title: {title}
              </ListItemText>
              </ListItem>
            <ListItem className="list-group-item">
              <ListItemText>
              Date: {moment(`${startDate}`).format("DD-MM-YYYY")}
              </ListItemText>
            </ListItem>
            <ListItem className="list-group-item">
              <ListItemText>
              Time: {startTime}
              </ListItemText>
            </ListItem>
            <ListItem className="list-group-item">
              <ListItemText>
              Venue: {venue.split("_").join(" ")}
              </ListItemText>
             
            </ListItem>
            <ListItem className="list-group-item">
              <ListItemText>
              Performer: {performer}
              </ListItemText>
              </ListItem>
            <ListItem className="list-group-item">
              <ListItemText>
              Price: {price} $
              </ListItemText>
            </ListItem>
            <ListItem className="list-group-item">
              <Box className="social-media">
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
    </>
  );
};


const EventDetail = () => {
  
  const history = useHistory()
  const events = useSelector(state => state.events)
  const {addToCart} = useSelector(state => state.cart)
  const match = useRouteMatch()

  if (events.length < 1) {
    history.push("/events")
  }

  const eventID = match.params.id
  console.log('eventID :>> ', eventID);
  const selectedTitle = events.find((event) => {
    return event._id === eventID;
  });
  return <ED event={selectedTitle} addToCart={addToCart} />;
};

export default EventDetail;
