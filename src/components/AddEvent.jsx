import React, { useState } from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  paper: {
    margin: theme.spacing(1),
    minWidth: "50vw",
  },
  root: {
    flexGrow: 1,
    margin: "auto",
  },
}));

const AddEvent = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: "",
    errors: [],
  });

  const handleVenueChange = (event) => {
    setValues({ ...values, venue: event.target.value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("username", values.username);
    form.append("password", values.password);
    setValues({
      ...values,
      username: "",
      password: "",
    });

    // const data = await api.login("/login", form);
    // if (data.success) {
    //   dispatch(logIn(data.hostId));
    //   history.push("/profile");
    // } else {
    //   setValues({ ...values, errors: data.errors });
  };

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography className={classes.title} variant="h6">
                ADD EVENT
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <TextField
                className={classes.textField}
                label="Title"
                name="title"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.title}
              />
            </Grid>
          </Grid>

          <Grid container justify="space-around">
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                label="Start-date"
                name="startDate"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                type="date"
                value={values.startDate}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                label="End-date"
                name="endDate"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                type="date"
                value={values.endDate}
              />
            </Grid>
          </Grid>

          <Grid container justify="space-around">
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                label="Start-time"
                name="startTime"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.startTime}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                label="End-time"
                name="endTime"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.endTime}
              />
            </Grid>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="select">
                  CHOOSE A VENUE
                </InputLabel>
                <Select
                  labelId="select"
                  value={values.venue}
                  onChange={handleVenueChange}
                  placeholder="Venue"
                >
                  {/* <MenuItem value="">
                    <em></em>
                  </MenuItem> */}
                  <MenuItem value="LE_FOU_FOU">LE FOU FOU</MenuItem>
                  <MenuItem value="JOKES_BLAGUES">JOKES BLAGUES</MenuItem>
                  <MenuItem value="RIRE_NOW">RIRE NOW</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container justify="space-around">
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                label="Facebook"
                name="facebook"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.facebook}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                label="Instagram"
                name="instagram"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.instagram}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                label="Twitter"
                name="twitter"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.twitter}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddEvent;
