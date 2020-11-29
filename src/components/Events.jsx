/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";


import {
  getEventsAction,
} from "../actions/actions";
import { compareDates } from "../Utils";
import Header from "./Header";
import { dataRequestGet } from "../api";

import CalendarView from "./CalendarView";
import Event from "./Event";




const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderColor: theme.palette.secondary
  },
}));


const Events = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const eventsState = useSelector((state) => state.events);

  const [values, setValues] = useState({
    calendarViewShow: false,
    listViewShow: true,
    venue: "",
    startDate: "",
    events: [],
  });

  useEffect(() => {
    fetchData();
    eventsByVenue();
  }, []);

  useEffect(() => {
    eventsByVenue();
  }, [values.venue]);

  const fetchData = async () => {
    try {
      const data = await dataRequestGet("/events");
      dispatch(getEventsAction(data));
    } catch (error) {
      console.log(error);
    }
  };

  const eventsByVenue = () => {
    const found = eventsState.filter(
      (event) => event.venue.indexOf(values.venue) !== -1
    );
    const eventsSorted = found.sort(compareDates);
    setValues({ ...values, events: eventsSorted });
  };

  const handleSearchInput = (event) => {
    setValues({ ...values, searchInput: event.target.value });
  };

  const handleVenueChange = (event) => {
    setValues({ ...values, venue: event.target.value });
  };

  const toggleCalendarView = () => {
    setValues({
      ...values,
      calendarViewShow: true,
      listViewShow: false,
    });
  };

  const toggleListView = () => {
    setValues({
      ...values,
      listViewShow: true,
      calendarViewShow: false,
    });
  };

  const showEvents = () => {
    if ((!values.listViewShow && values.events.length < 1) || !values.venue) {
      return <h3 className="text-center">NO EVENTS</h3>;
    }
    if (values.listViewShow && values.events.length > 0) {
      return values.events
        .filter((event) =>
          event.venue.toLowerCase().includes(values.venue.toLowerCase())
        )
        .map((event, idx) => (
          <Event
            events={event}
            key={idx}
            // seatsAvail={seatsAvail}
            venue={values.venue}
          />
        ));
    }
    if (values.calendarViewShow)
      return (
        <div className="container-fluid">
          <CalendarView events={values.events} />
        </div>
      );
    else {
      return <h3>NO EVENTS</h3>;
    }
  };

  return (
    <>
      <Header text="EVENTS" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl} >
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
        </Grid>
      </Grid>
      <div className="row mb-4 events-toggler">
        <div className="col text-right">
          <img
            id="list-view"
            onClick={toggleListView}
            src="list-view-30px.png"
            alt="list-view"
          />
        </div>
        <div className="col">
          <img
            id="calendar-view"
            onClick={toggleCalendarView}
            src="calendar2-view-30px.png"
            alt="calendar-view"
          />
        </div>
      </div>
      <div
        className="d-md-flex flex-wrap justify-content-center"
        id="events-body"
      >
        {showEvents()}
      </div>
    </>
  );
};

export default Events;
