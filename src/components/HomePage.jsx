import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

/*  */

const useStyles = makeStyles({
  grid: {
    fontWeight: "bolder",
    padding: "0 5px",
  },
  title: {
    fontWeight: "bolder",
    margin: "0 5px"
  },
  homeImg: {
    maxWidth: "100%",
    height: "auto",
  }
  
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid spacing={4}>
        <Typography component="h2" className={classes.grid}>LE FOU FOU</Typography>
      </Grid>
      <Grid spacing={4}>
        <Typography className={classes.grid}>JOKES BLAGUES</Typography>
      </Grid>
      <Grid spacing={4}>
        <Typography className={classes.grid}>RIRE NOW</Typography>
      </Grid>
    </Grid>

    <Grid  container>
    <img className={classes.homeImg} src="club-2.jpg" alt="club" />
    </Grid>

    </>
  );
};

export default HomePage;
