import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"

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

import {authState} from "../redux/authSlice"
import {loading, loaded, loadingState,} from "../redux/loadingSlice"
import {readEvents, updateEvent, eventsState} from "../redux/eventsSlice"
import api from "../api"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  fileUpload: {
      margin: "16px 0"
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
  const {hostId} = useSelector(authState)
  const {loading} = useSelector(loadingState)
  const dispatch = useDispatch()
  const history = useHistory()
  const [image, setImage] = useState({})
  const [values, setValues] = useState({
   ...initState,
  });
  const {events} = useSelector(eventsState)
  console.log('events :>> ', events);
  useEffect(() => {
    if (props.selectedId){
      const found = events.find(i => i._id === props.selectedId)
      console.log('found :>> ', found);
      setValues(found)
    }
  },[props.selectedId, events])


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
    form.append("title", values.title);
    form.append("startDate", values.startDate);
    form.append("startTime", values.startTime);
    form.append("endDate", values.endDate);
    form.append("endTime", values.endTime);
    form.append("venue", values.venue);
    form.append("performer", values.performer);
    form.append("image", image);
    form.append("price", values.price);
    form.append("hostId", hostId);

    // if (!eventId) {
    //   dispatch()
    // }
    
  };
  

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography className={classes.title} variant="h6">
                EVENT
              </Typography>
            </Grid>
          </Grid>


        <Grid container justify="center" spacing={2}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="venue">
                  VENUE
                </InputLabel>
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

      


          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <TextField
                className={classes.textField}
                label="Title"
                name="title"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.title || ""}
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
                className={classes.textField}
                label="Start-time"
                name="startTime"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.startTime || ""}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                label="End-time"
                name="endTime"
                margin="normal"
                onChange={(evt) => handleChange(evt)}
                value={values.endTime || ""}
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

          <Grid  container justify="center">
          <Grid item xs={3}>
            <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            name="image"
            onChange={(evt) => setImage(evt.target.files[0])}
            type="file"
            
          />
            <Button className={classes.fileUpload} color="secondary" component="span" variant="contained">
              Image &nbsp; <FileUpload />
            </Button>

            </Grid>
          </Grid>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default EventForm;
