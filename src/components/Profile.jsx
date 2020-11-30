import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EventsHistory from "./EventsHistory";
import AddEventContainer from "./AddEventContainer";
import UpdateEvent from "./UpdateEvent";

import { compareDates, toggleProfileButtons } from "../Utils";

import { getEvents } from "../redux/eventsSlice";
import { loading, loaded } from "../redux/loadingSlice";

import Button from "./Button";
import Header from "./Header";
// import "./Profile.css";
import api from "../api";

const Profile = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    showHistory: false,
    showAddEvent: false,
    showUpdateEvent: false,
    selectedEvent: [],
    selectedOption: "",
    userEvents: [],
  });

  useEffect(() => {
    toggleProfileButtons();
  }, [state.showAddEvent, state.showUpdateEvent]);

  const getHostEvents = () => {
    const events = props.events.filter(
      (event) =>
        event.hostId.toLowerCase().indexOf(props.hostId.toLowerCase()) !== -1
    );
    return events.sort(compareDates);
  };

  const showEvents = () => {
    setState({
      userEvents: getHostEvents(),
      showHistory: true,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedOption: "",
    });
  };

  const loadEvents = async () => {
    dispatch(loading());

    try {
      const data = await api.read("/events");
      if (data.success) {
        dispatch(getEvents(data));
        setTimeout(() => {
          dispatch(loaded());
        }, 2000);
        showEvents();
      }
    } catch (error) {
      console.log(error);
    }

    const dispatchGetEvents = (events) => {
      dispatch(getEvents(events));
    };

    const deleteEvent = async () => {
      if (state.selectedOption === "") {
        window.alert("Please select an event.");
        return;
      } else {
        const confirm = window.confirm("Delete event(s) ?");
        if (confirm) {
          let dataEvents = new FormData();
          dataEvents.append("_id", state.selectedOption);

          try {
            await api.create("/deleteEvents", dataEvents);
            loadEvents();
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    const getSelectedEvent = () => {
      const event = state.userEvents.find(
        (evt) => evt._id === state.selectedOption
      );
      return event;
    };

    const handleOptionChange = (event) => {
      setState({
        selectedOption: event.target.value,
      });
    };

    // toggleProfileButtons = () => {
    //   const doc = document.getElementById("profile-btns");
    //   const addEventShown = state.showAddEvent;
    //   const updateEventShown = state.showUpdateEvent;
    //   if (addEventShown || updateEventShown) {
    //     doc.style.display = "none";
    //   } else {
    //     doc.style.display = "flex";
    //   }
    // };

    const showAddEvent = () => {
      setState({
        showHistory: false,
        showAddEvent: true,
        showUpdateEvent: false,
        userEvents: getHostEvents(),
      });
    };

    const showUpdateEventForm = () => {
      if (state.selectedOption === "") {
        window.alert("Please select an event.");
        return;
      } else {
        setState({
          selectedEvent: getSelectedEvent(),
          showHistory: false,
          showAddEvent: false,
          showUpdateEvent: true,
        });
      }
    };

    const renderProfileButtons = () => {
      return (
        <div
          id="profile-btns"
          className="row sticky-top text-center"
          style={{ backgroundColor: "white" }}
        >
          <div className="col-6 col-md-3 my-2 justify-content-center">
            <Button
              color="secondary"
              id="add-event-btn"
              text="ADD EVENTS"
              onClick={showAddEvent}
            />
          </div>
          <div className="col-6 col-md-3 my-2">
            <Button
              color="danger"
              id="delete-event-btn"
              text="DELETE EVENT"
              onClick={deleteEvent}
            />
          </div>
          <div className="col-6 col-md-3 my-2">
            <Button
              color="dark"
              id="events-history-btn"
              text="LOAD EVENTS"
              onClick={loadEvents}
            />
          </div>
          <div className="col-6 col-md-3 my-2">
            <Button
              color="primary text-white"
              id="update-event-btn"
              text="UPDATE EVENT"
              onClick={showUpdateEventForm}
            />
          </div>
        </div>
      );
    };

    return (
      <div>
        <Header text="PROFILE" type="dark" />
        {renderProfileButtons()}

        <div className="">
          {state.showHistory && (
            <EventsHistory
              userEvents={state.userEvents}
              handleOptionChange={handleOptionChange}
              selectedOption={state.selectedOption}
            />
          )}
          {state.showAddEvent && (
            <AddEventContainer
              userEvents={state.userEvents}
              loadEvents={loadEvents}
            />
          )}
          {state.showUpdateEvent && (
            <UpdateEvent
              event={state.selectedEvent}
              id={state.selectedOption}
              loadEvents={loadEvents}
            />
          )}
        </div>
      </div>
    );
  };
};

export default Profile;
