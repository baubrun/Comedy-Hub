import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Nav = ({ text, loc, type }) => {
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

      {/* <Typography variant="h4" style={{ color: "white" }}>
          </Typography> */}
    </Grid>
  );
};

export default Nav;
