/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventsHistory from "./EventsHistory";
import EventForm from "./EventForm";

import { compareDates, toggleProfileButtons } from "../Utils";

import { readEvents, eventsState } from "../redux/eventsSlice";
import { authState } from "../redux/authSlice";
import { loading, loaded } from "../redux/loadingSlice";

import Button from "./Button";
import Header from "./Header";

import api from "../api";

import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";


const Profile = (props) => {
  const dispatch = useDispatch();
  const { events } = useSelector(eventsState);
  const { hostId } = useSelector(authState);
  const [state, setState] = useState({
    addMode: false,
    DeleteMode: false,
    editMode: false,
    showHistory: false,
    showEventForm: false,
    selectedEvent: [],
    selectedId: "",
    userEvents: [],
  });


  useEffect(() => {
    if (events.length > 0) {
      showEvents();
    }
  }, [events]);


  const loadEvents = () => {
    dispatch(loading());
    try {
      dispatch(readEvents());
      setTimeout(() => {
        dispatch(loaded());
      }, 2000);
      showEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // change req to delete
  const deleteEvent = async () => {
    if (state.selectedId === "") {
      showAlert()
    } else {
      const confirm = window.confirm("Delete event(s) ?");
      if (confirm) {
        let dataEvents = new FormData();
        dataEvents.append("_id", state.selectedId);

        try {
          await api.create("/deleteEvents", dataEvents);
          loadEvents();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };


  const getHostEvents = () => {
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
      userEvents: getHostEvents(),
      showHistory: true,
      showEventForm: false,
      selectedId: "",
    });
  };


  const toggleForm = (action="") => {
    if (action === "edit"){
      setState({...state, selectedEvent: getSelectedEvent()})
    } 
    setState({
      ...state,
      showHistory: false,
      showEventForm: true,
    });
  };


  return (
    <>
      <Header text="PROFILE" type="dark" />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ backgroundColor: "white", position: "sticky" }}
      >
        <Grid item xs={2}>
          <Button
            color="secondary"
            disabled={state.selectedId ? true : false}
            id="events-history-btn"
            text="LOAD"
            onClick={() => loadEvents()}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            color="secondary"
            disabled={state.selectedId ? true : false}
            id="add-event-btn"
            text="ADD "
            onClick={() => toggleForm()}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            color="primary"
            id="update-event-btn"
            text="EDIT"
            onClick={() => {
              !state.selectedId ? showAlert() : toggleForm("edit");
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            color="secondary"
            id="delete-event-btn"
            text="DELETE"
            onClick={() => deleteEvent()}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            color="secondary"
            text="CANCEL"
            onClick={() => handleCancel()}
          />
        </Grid>
      </Grid>


      <div className="">
        {state.showHistory && (
          <EventsHistory
            userEvents={state.userEvents}
            handleOptionChange={handleOptionChange}
            selectedId={state.selectedId}
          />
        )}
        {state.showEventForm && <EventForm selectedId={state.selectedId} />}
      </div>
    </>
  );
};



export default Profile;
