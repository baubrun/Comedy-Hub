import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import  EventsHistory  from "./EventsHistory";
import  AddEventContainer  from "./AddEventContainer";
import UpdateEvent from "./UpdateEvent";

import { compareDates, 
  toggleProfileButtons 
} from "../Utils";

import {
  getEvents,
} from "../redux/eventsSlice";
import {
  loading, loaded
} from "../redux/loadingSlice";

import  Button  from "./Button";
import  Header  from "./Header";
// import "./Profile.css";
import { dataRequestGet, dataRequestPost } from "../api";



const Profile = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    showHistory: false,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedEvent: [],
      selectedOption: "",
      userEvents: [],
    
  })

 
  useEffect(() => {
    toggleProfileButtons();
  }, [state.showAddEvent, state.showUpdateEvent])

  const dispatchLoading = async () => {
    dispatch(loading())

    try {
      const data = await dataRequestGet("/events");
      dispatch(getEvents(data));
      setTimeout(() => {
        dispatch(loaded());
        }, 2000);
      ;
      this.showEvents();
    } catch (error) {
      console.log(error);
    }
  

  const showEvents = () => {
    this.setState({
      userEvents: this.getHostEvents(),
      showHistory: true,
      showAddEvent: false,
      showUpdateEvent: false,
      selectedOption: "",
    });
  };

  const dispatchGetEvents = (events) => {
    this.props.getEvents(events);
  };

  const dispatchGetSeatsAvail = (seats) => {
    this.props.getSeatsAvail(seats);
  };

  const deleteEvent = async () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
      const confirm = window.confirm("Delete event(s) ?");
      if (confirm) {
        let dataEvents = new FormData();
        dataEvents.append("_id", this.state.selectedOption);
        
        try {
          await dataRequestPost("/deleteEvents", dataEvents);
          dispatch(loading());
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const getHostEvents = () => {
    const events = this.props.events.filter(
      (event) =>
        event.hostId.toLowerCase().indexOf(this.props.hostId.toLowerCase()) !==
        -1
    );
    return events.sort(compareDates);
  };

  const getSelectedEvent = () => {
    const event = this.state.userEvents.find(
      (evt) => evt._id === this.state.selectedOption
    );
    return event;
  };

  const handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  // toggleProfileButtons = () => {
  //   const doc = document.getElementById("profile-btns");
  //   const addEventShown = this.state.showAddEvent;
  //   const updateEventShown = this.state.showUpdateEvent;
  //   if (addEventShown || updateEventShown) {
  //     doc.style.display = "none";
  //   } else {
  //     doc.style.display = "flex";
  //   }
  // };

  const showAddEvent = () => {
    this.setState({
      showHistory: false,
      showAddEvent: true,
      showUpdateEvent: false,
      userEvents: this.getHostEvents(),
    });
  };

  const showUpdateEventForm = () => {
    if (this.state.selectedOption === "") {
      window.alert("Please select an event.");
      return;
    } else {
      this.setState({
        selectedEvent: this.getSelectedEvent(),
        showHistory: false,
        showAddEvent: false,
        showUpdateEvent: true,
      });
    }
  };



  const renderProfileButtons = () => {
    return (
      <div id="profile-btns" className="row sticky-top text-center" style={{ backgroundColor: "white" }}>
        <div className="col-6 col-md-3 my-2 justify-content-center">
          <Button
            color="secondary"
            id="add-event-btn"
            text="ADD EVENTS"
            onClick={this.showAddEvent}
          />
        </div>
        <div className="col-6 col-md-3 my-2">
          <Button
            color="danger"
            id="delete-event-btn"
            text="DELETE EVENT"
            onClick={this.deleteEvent}
          />
        </div>
        <div className="col-6 col-md-3 my-2">
          <Button
            color="dark"
            id="events-history-btn"
            text="LOAD EVENTS"
            onClick={this.dispatchLoading}
          />
        </div>
        <div className="col-6 col-md-3 my-2">
          <Button
            color="primary text-white"
            id="update-event-btn"
            text="UPDATE EVENT"
            onClick={this.showUpdateEventForm}
          />
        </div>
      </div>
    );
  };

    return (
      <div>
        <Header text="PROFILE" type="dark" />
        {this.renderProfileButtons()}

        <div className="">
          {this.state.showHistory && (
            <EventsHistory
              userEvents={this.state.userEvents}
              handleOptionChange={this.handleOptionChange}
              selectedOption={this.state.selectedOption}
            />
          )}
          {this.state.showAddEvent && (
            <AddEventContainer
              userEvents={this.state.userEvents}
              dispatchLoading={this.dispatchLoading}
            />
            
          )}
          {this.state.showUpdateEvent && (
            <UpdateEvent
              event={this.state.selectedEvent}
              id={this.state.selectedOption}
              dispatchLoading={this.dispatchLoading}
            />
          )}
        </div>
      </div>
    );
          }
        }

export default Profile
