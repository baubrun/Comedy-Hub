import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
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
import { createEvent, updateEvent, eventsState } from "../redux/eventsSlice";

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    textAlign: "center",
    padding: "10px",
  },
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
  facebook: "",
  instagram: "",
  twitter: "",
  errorMsg: "",
};

const EventForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { hostId } = useSelector(userState);
  const { events, error } = useSelector(eventsState);
  const [file, setFile] = useState({});
  const [values, setValues] = useState({
    ...initState,
  });

  useEffect(() => {
    if (props.selectedId) {
      const found = events.find((i) => i._id === props.selectedId);
      setValues(found);
    }
  }, [props.selectedId]);

  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    console.log('evt :>> ', evt);
    evt.preventDefault();
    // evt.stopPropagation();
    // evt.stopImmediatePropagation();
    const data = new FormData();
    data.append("title", values.title);
    data.append("startDate", values.startDate);
    data.append("startTime", values.startTime);
    data.append("endDate", values.endDate);
    data.append("endTime", values.endTime);
    data.append("venue", values.venue);
    data.append("performer", values.performer);
    data.append("price", values.price);
    data.append("hostId", hostId);
    data.append("facebook", values.facebook);
    data.append("instagram", values.instagram);
    data.append("twitter", values.twitter);
    data.append("image", file);

    if (props.editMode) {
      data.append("_id", props.selectedId);
      const form = [props.selectedId, data];
      dispatch(updateEvent(form));
    } else {
      dispatch(createEvent(data));
    }
  };

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
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

            <Grid item xs={12}>
              {values.errorMsg && (
                <Box onClick={() => closeErrors()}>
                  <Typography className={classes.error} component="p">
                    {values.errorMsg}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid direction="row" container justify="center" spacing={2}>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="venue">VENUE</InputLabel>
                  <Select
                    labelId="venue"
                    name="venue"
                    value={values.venue || ""}
                    onChange={(evt) => handleChange(evt)}
                    required
                  >
                    <MenuItem value="LE FOU FOU">LE FOU FOU</MenuItem>
                    <MenuItem value="JOKES BLAGUES">JOKES BLAGUES</MenuItem>
                    <MenuItem value="RIRE NOW">RIRE NOW</MenuItem>
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </Grid>
            </Grid>

            <Grid container justify="space-around">
              <Grid item xs={3}>
                <TextField
                  className={clsx([classes.textField, classes.time])}
                  name="startTime"
                  margin="normal"
                  type="time"
                  onChange={(evt) => handleChange(evt)}
                  value={values.startTime || ""}
                  required
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
                  required
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

            <Grid container justify="center" alignItems="center">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                name="image"
                onChange={(evt) => setFile(evt.target.files[0])}
                type="file"
                alt={values.performer}
              />

              <Grid className={classes.fileUpload} item xs={3}>
                <label htmlFor="icon-button-file">
                  <Button
                    color="secondary"
                    component="span"
                    variant="contained"
                  >
                    UPLOAD IMAGE &nbsp; <FileUpload />
                  </Button>
                </label>
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
