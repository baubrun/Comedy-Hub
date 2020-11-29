import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
    backgroundColor: "#020202",
    color: "white",
    margin: "12px",
  },
  info: {
    color: "white",
    fontFamily: "Courier Prime ",
  },
  img: {
    height: 250,
    width: 350,
    objectFit: "cover",
  },
});

const Event = (props) => {
  const classes = useStyles();

  const { title, startDate, performer, startTime, image } = props.events;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.info}
        title={title}
        subheader={moment(`${startDate}`).format("DD-MM-YYYY")}
      />

      <Link to={`/event/${title}`}>
        <CardMedia
          className={classes.img}
          image={image}
          component="img"
          title={title}
        />
      </Link>

      <CardContent>
        <Typography
          className={classes.info}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {performer}
        </Typography>
        <Typography
          className={classes.info}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {moment(`${startDate}`).format("DD-MM-YYYY")}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5" size="small" color="primary">
          {startTime}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Event;
