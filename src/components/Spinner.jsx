import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Grid from "@material-ui/core/Grid";


const Spinner = ({ loading, size, type, color }) => {
  return (
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    >
      <Grid item>
        <Loader
          type={type}
          color={color}
          height={size}
          width={size}
          visible={loading}
        />
      </Grid>
    </Grid>
  );
};

export default Spinner;
