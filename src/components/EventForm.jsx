import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";

import clsx from "clsx";
import { userState } from "../redux/userSlice";
import { createEvent, eventsState, loading } from "../redux/eventsSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  fileUpload: {
    margin: "16px",
  },
  input: {
    display: "none",
  },
  paper: {
    margin: theme.spacing(1),
    minWidth: "50vw",
  },
  root: {
    flexGrow: 1,
    margin: "auto",
  },
  time: {
    minWidth: 170,
  },
}));

const initState = {
  title: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  venue: "",
  performer: "",
  image: "",
  price: "",
  // noVenues: false,
};

const EventForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { hostId } = useSelector(userState);
  const { events } = useSelector(eventsState);
  const [file, setFile] = useState({});
  const history = useHistory();
  const [values, setValues] = useState({
    ...initState,
  });

  useEffect(() => {
    if (props.selectedId) {
      const found = events.find((i) => i._id === props.selectedId);
      setValues(found);
    }
  }, [props.selectedId, events]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const data = new FormData();
    data.append("title", values.title);
    data.append("startDate", values.startDate);
    data.append("startTime", values.startTime);
    data.append("endDate", values.endDate);
    data.append("endTime", values.endTime);
    data.append("venue", values.venue);
    data.append("performer", values.performer);
    data.append("price", values.price);
    data.append("hostId", values.hostId);
    data.append("image", values.image);

    dispatch(createEvent(data));
  };

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.title} variant="h6">
                  EVENT
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={(evt) => handleSubmit(evt)}>
            <Grid direction="row" container justify="center" spacing={2}>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="venue">VENUE</InputLabel>
                  <Select
                    labelId="venue"
                    name="venue"
                    value={values.venue || ""}
                    onChange={(evt) => handleChange(evt)}
                  >
                    <MenuItem value="LE_FOU_FOU">LE FOU FOU</MenuItem>
                    <MenuItem value="JOKES_BLAGUES">JOKES BLAGUES</MenuItem>
                    <MenuItem value="RIRE_NOW">RIRE NOW</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  label="Title"
                  name="title"
                  margin="normal"
                  onChange={(evt) => handleChange(evt)}
                  value={values.title || ""}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  label="Price"
                  name="price"
                  margin="normal"
                  type="number"
                  onChange={(evt) => handleChange(evt)}
                  value={values.price || ""}
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  label="Performer"
                  name="performer"
                  margin="normal"
                  onChange={(evt) => handleChange(evt)}
                  value={values.performer || ""}
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
                  value={values.startDate || ""}
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
                  value={values.endDate || ""}
                />
              </Grid>
            </Grid>

            <Grid container justify="space-around">
              <Grid item xs={3}>
                <TextField
                  className={clsx([classes.textField, classes.time])}
                  // label="Start-time"
                  name="startTime"
                  margin="normal"
                  type="time"
                  onChange={(evt) => handleChange(evt)}
                  value={values.startTime || ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Start Time
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{}}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={clsx([classes.textField, classes.time])}
                  name="endTime"
                  margin="normal"
                  type="time"
                  onChange={(evt) => handleChange(evt)}
                  value={values.endTime || ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">End Time</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{}}
                />
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
                  value={values.facebook || ""}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField || ""}
                  label="Instagram"
                  name="instagram"
                  margin="normal"
                  onChange={(evt) => handleChange(evt)}
                  value={values.instagram || ""}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  label="Twitter"
                  name="twitter"
                  margin="normal"
                  onChange={(evt) => handleChange(evt)}
                  value={values.twitter || ""}
                />
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  name="image"
                  onChange={(evt) => setFile(evt.target.files[0])}
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <Button
                    className={classes.fileUpload}
                    color="secondary"
                    component="span"
                    variant="contained"
                  >
                    Image &nbsp; <FileUpload />
                  </Button>
                </label>
                <span className={classes.filename}>
                  {values.image ? values.image : ""}
                </span>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  
                  type="submit"
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EventForm;
