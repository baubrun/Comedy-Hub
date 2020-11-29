import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titleBar: {
    backgroundColor: "black",
    // width: "100vw",
  },
}));

const Header = ({ text }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.titleBar}
    >
      <Grid item>
        <Typography variant="h5" style={{ color: "white" }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
