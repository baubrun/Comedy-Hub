import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";


import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

import { eventsState } from "../redux/eventsSlice";
import Spinner from "./Spinner";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
    borderColor: "#ffffcc",
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

export const UserEvents = (props) => {
  const { loading } = useSelector(eventsState);
  const classes = useStyles();

  if (loading) {
    return (
      <Spinner
        color="rgba(224, 151, 33, 0.7)"
        loading={loading}
        size={200}
        type="Rings"
      />
    );
  }

  if (props.userEvents.length < 1) {
    return (
      <Grid container direction="row" justify="center" alignItems="center" wrap="wrap">
        <Grid item>
          <Typography variant="h4">NO EVENTS</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      {
        props.userEvents.map((event, idx) => (
          <FormControl key={idx}>
            <Card className={classes.root}>
              <CardHeader className={classes.info} title={event.title} />

              <CardMedia
                className={classes.img}
                image={require(`../images/${event.image}`)}
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
                  color="textPrimary"
                  component="p"
                >
                  {moment(`${event.startDate}`).format("DD-MM-YYYY")}
                </Typography>
                <Typography
                  className={classes.info}
                  variant="body1"
                  color="textPrimary"
                  component="p"
                >
                  {event.startTime}
                </Typography>

                <Typography
                  className={classes.info}
                  variant="body1"
                  color="textPrimary"
                  component="p"
                >
                  {event.venue}
                </Typography>

                <Typography
                  className={classes.info}
                  variant="body1"
                  color="textPrimary"
                  component="p"
                >
                  Facebook: {event.facebook}
                </Typography>
                <Typography
                  className={classes.info}
                  variant="body1"
                  color="textPrimary"
                  component="p"
                >
                  Instagram: {event.instagram}
                </Typography>
                <Typography
                  className={classes.info}
                  variant="body1"
                  color="textPrimary"
                  component="p"
                >
                  Twitter: {event.twitter}
                </Typography>
              </CardContent>

              <CardActions className={classes.cardAction}>
                <FormControlLabel
                  value={event._id}
                  control={<Radio />}
                  label="Edit / Delete"
                  checked={props.selectedId === event._id}
                  onChange={(evt) => {
                    props.handleOptionChange(evt);
                  }}
                />
              </CardActions>
            </Card>
          </FormControl>
        ))
      }
    </>
  );
};

export default UserEvents;
