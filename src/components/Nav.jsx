import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Nav = ({ text, loc }) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="container-fluid"
    >
      <Grid item >
        <Link to={`/${loc}`}>
          <Button 
          variant="contained" 
          size="large" 
          color="secondary">
            {text}
            </Button>
        </Link>
      </Grid>

    </Grid>
  );
};

export default Nav;
