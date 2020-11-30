import React, { useState } from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderColor: theme.palette.secondary,
  },
  icons: {
    margin: "0 24px",
    width: 60,
    height: 60,
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
    <form>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h6">
            Sign In
          </Typography>

          <TextField
            className={classes.textField}
            id="title"
            label="title"
            name="title"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            value={values.title}
          ></TextField>
          <br />
          <TextField
            className={classes.textField}
            id="start-date"
            label="start-date"
            name="startDate"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="date"
            value={values.startDate}
          />

          <TextField
            className={classes.textField}
            id="start-time"
            label="start-time"
            name="startTime"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            value={values.startTime}
          />

            <TextField
            className={classes.textField}
            id="end-date"
            label="end-date"
            name="endDate"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="date"
            value={values.endDate}
          />

            <TextField
            className={classes.textField}
            id="end-time"
            label="end-time"
            name="endTime"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            value={values.endTime}
          />


<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select">Venue</InputLabel>
            <Select
              labelId="select"
              id="select"
              value={values.venue}
              onChange={handleVenueChange}
              label="Venue"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="LE_FOU_FOU">LE FOU FOU</MenuItem>
              <MenuItem value="JOKES_BLAGUES">JOKES BLAGUES</MenuItem>
              <MenuItem value="RIRE_NOW">RIRE NOW</MenuItem>
            </Select>
          </FormControl>



        </CardContent>
        <CardActions>
          <Button
            className={classes.submit}
            color="primary"
            onClick={(evt) => handleSubmit(evt)}
            variant="contained"
          >
            submit
          </Button>
        </CardActions>
        <br />

        <Typography variant="body2" component="p">
          Not registered? &nbsp;
          <span>
            <Link className={classes.signUp} to="//register">
              Sign Up
            </Link>
          </span>
        </Typography>
      </Card>
    </form>
  );
};

export default AddEvent;
