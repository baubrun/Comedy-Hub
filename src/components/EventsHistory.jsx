import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from "../redux/eventsSlice";

import moment from "moment";

import { loadingState } from "../redux/loadingSlice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";
import Header from "./Header";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
    // backgroundColor: "#020202",
    color: "secondary",
    margin: "12px",
  },
  info: {
    color: "secondary",
    fontFamily: "Courier Prime ",
  },
  img: {
    height: 250,
    width: 350,
    objectFit: "cover",
  },
});

const loadingSize = 200;

export const EventsHistory = (props) => {
  const { loading } = useSelector(loadingState);
  const classes = useStyles();

  return (
    <>
      {/* <div className="d-flex justify-content-center">
        <Loader
          type="Rings"
          color="rgba(224, 151, 33, 0.7)"
          height={loadingSize}
          width={loadingSize}
          visible={loading}
        />
      </div> */}

      {!props.loading &&
        (props.userEvents.length > 0 ? (
          props.userEvents.map((event, idx) => (
            <FormControl key={idx}>
              <Card className={classes.root}>
                <CardHeader
                  className={classes.info}
                  title={event.title}
                  subheader={moment(`${event.startDate}`).format("DD-MM-YYYY")}
                />

                <CardMedia
                  className={classes.img}
                  image={event.image}
                  component="img"
                  title={event.title}
                />

                <CardContent>
                  <Typography
                    className={classes.info}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {event.performer}
                  </Typography>
                  <Typography
                    className={classes.info}
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    {moment(`${event.startDate}`).format("DD-MM-YYYY")}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Typography variant="h5" size="small" color="primary">
                    {event.startTime}
                  </Typography>
                  <FormControlLabel
                    value={event._id}
                    control={<Radio />}
                    label="Delete / Update"
                    checked={props.selectedOption === event._id}
                    onChange={(evt) => {
                      props.handleOptionChange(evt);
                    }}
                  />
                </CardActions>
              </Card>
            </FormControl>
          ))
        ) : (
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h4">NO EVENTS</Typography>
            </Grid>
          </Grid>
        ))}
    </>
  );
};

export default EventsHistory;
