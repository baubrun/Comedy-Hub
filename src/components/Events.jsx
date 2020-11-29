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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListIcon from "@material-ui/icons/List";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';



import { getEventsAction } from "../actions/actions";
import { compareDates } from "../Utils";
import Header from "./Header";
import { dataRequestGet } from "../api";

import CalendarView from "./CalendarView";
import Event from "./Event";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderColor: theme.palette.secondary,
  },
  icons: {
    margin: theme.spacing(1),
  }
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
      return <Typography variant="h3">NO EVENTS</Typography>;
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="LE_FOU_FOU">LE FOU FOU</MenuItem>
              <MenuItem value="JOKES_BLAGUES">JOKES BLAGUES</MenuItem>
              <MenuItem value="RIRE_NOW">RIRE NOW</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Box className={classes.icons}>
            <IconButton id="list-view" onClick={toggleCalendarView} color="secondary">
              <ListIcon />
            </IconButton>

            <IconButton  id="calendar-view" onClick={toggleCalendarView} color="primary">
              <CalendarTodayIcon />
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
