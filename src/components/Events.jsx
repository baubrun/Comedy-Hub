/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import ListIcon from "@material-ui/icons/List";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import { readEvents } from "../redux/eventsSlice";
import { compareDates } from "../Utils";
import Header from "./Header";

import CalendarView from "./CalendarView";
import Event from "./Event";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderColor: theme.palette.secondary.main,
  },
  icons: {
    margin: "0 24px",
    width: 60,
    height: 60,
  },
}));

const Events = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  const [values, setValues] = useState({
    calendarViewShow: false,
    listViewShow: true,
    venue: "",
    startDate: "",
    events: [],
  });

  useEffect(() => {
    dispatch(readEvents());
  }, []);

  useEffect(() => {
    if (events) {
      eventsByVenue();
    }
  }, [events]);

  const eventsByVenue = () => {
    const found = events.filter(
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
      return <Typography variant="h3">CHOOSE A VENUE</Typography>;
    }
    if (values.listViewShow && values.events.length > 0) {
      return values.events
        .filter((event) =>
          event.venue.toLowerCase().includes(values.venue.toLowerCase())
        )
        .map((event, idx) => (
          <Event
            event={event}
            key={idx}
            venue={values.venue}
          />
        ));
    }

    if (values.calendarViewShow)
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className="container-fluid"
        >
          <Grid item>
            <CalendarView events={values.events} />
          </Grid>
        </Grid>
      );
    else {
      return <Typography variant="h3">NO EVENTS</Typography>;
    }
  };

  return (
    <>
      <Header text="EVENTS" />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select">Venue</InputLabel>
            <Select
              labelId="select"
              id="select"
              value={values.venue}
              onChange={handleVenueChange}
              label="Venue"
            >
           
              <MenuItem value="LE FOU FOU">LE FOU FOU</MenuItem>
              <MenuItem value="JOKES BLAGUES">JOKES BLAGUES</MenuItem>
              <MenuItem value="RIRE NOW">RIRE NOW</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Box display="flex">
            <IconButton
              id="list-view"
              onClick={() => toggleListView()}
              color="secondary"
            >
              <ListIcon className={classes.icons} />
            </IconButton>

            <IconButton
              id="calendar-view"
              onClick={() =>toggleCalendarView()}
              color="primary"
            >
              <CalendarTodayIcon className={classes.icons} />
            </IconButton>
          </Box>
        </Grid>

        <Grid item id="events-body">
          {showEvents()}
        </Grid>
      </Grid>
    </>
  );
};

export default Events;
