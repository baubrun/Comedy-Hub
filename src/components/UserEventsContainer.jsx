import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserEvents from "./UserEvents";
import EventForm from "./EventForm";

import { compareDates } from "../Utils";

import { readEvents, eventsState, deleteEvent } from "../redux/eventsSlice";
import { userState } from "../redux/userSlice";

import Button from "@material-ui/core/Button";
import Header from "./Header";

import Grid from "@material-ui/core/Grid";
import Spinner from "./Spinner";

const UserEventsContainer = () => {
  const dispatch = useDispatch();
  const { hostId, loading, loggedIn } = useSelector(userState);
  const { events } = useSelector(eventsState);
  const [state, setState] = useState({
    addMode: false,
    DeleteMode: false,
    editMode: false,
    showEventForm: false,
    selectedEvent: [],
    selectedId: "",
    userEvents: [],
  });


  useEffect(() => { 
      dispatch(readEvents());
  }, []);

  useEffect(() => {
    if (events) {
      showEvents();
    }
  }, [events]);

  const handleDelete = async () => {
    if (state.selectedId === "") {
      showAlert();
    } else {
      const confirm = window.confirm("Delete event(s) ?");
      if (confirm) {
        dispatch(deleteEvent(state.selectedId));
      }
    }
  };

  const getUserEvents = () => {
    const ev = events.filter(
      (event) => event.hostId.toLowerCase().indexOf(hostId.toLowerCase()) !== -1
    );
    return ev.sort(compareDates);
  };

  const getSelectedEvent = () => {
    const event = state.userEvents.find((evt) => evt._id === state.selectedId);
    return event;
  };

  const handleCancel = () => {
    setState({
      selectedId: "",
      addMode: false,
      DeleteMode: false,
      editMode: false,
    });
    showEvents();
  };

  const handleOptionChange = (event) => {
    setState({
      ...state,
      selectedId: event.target.value,
    });
  };

  const showAlert = () => {
    window.alert("Please select an event.");
    return;
  };

  const showEvents = () => {
    setState({
      ...state,
      userEvents: getUserEvents(),
      showEventForm: false,
      selectedId: "",
    });
  };

  const toggleForm = (action = "") => {
    if (action === "edit") {
      setState(
        { 
          ...state, 
          editMode: true, 
          selectedEvent: getSelectedEvent(),
          showEventForm: true,
        });
    } else {
      setState({
        ...state,
        showEventForm: true,
      });
    }
  
  };

  if (loading) {
    return (
      <Spinner
        color="rgba(224, 151, 33, 0.7)"
        loading={loading}
        size={200}
        type="Rings"
        timeout={2000}
      />
    );
  }



  return (
    <>
      <Header text="MY EVENTS" type="dark" />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ backgroundColor: "white", position: "sticky" }}
      >
        <Grid item xs={2}>
          <Button
          variant="contained"
            color="secondary"
            disabled={state.selectedId ? true : false}
            onClick={() => toggleForm()}
          >ADD </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              !state.selectedId 
              ? showAlert() 
              : toggleForm("edit") 
            }}
          >EDIT</Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bolder",
            }}
            variant="contained"
            onClick={() => handleDelete()}
          >DELETE</Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleCancel()}
          >CANCEL</Button>
        </Grid>
      </Grid>

      <>
        {!state.showEventForm && (
          <UserEvents
            userEvents={state.userEvents}
            handleOptionChange={handleOptionChange}
            selectedId={state.selectedId}
          />
        )}
        {state.showEventForm && (
          <EventForm selectedId={state.selectedId} editMode={state.editMode} />
        )}
      </>
    </>
  );
};

export default UserEventsContainer;
