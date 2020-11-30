/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddEvent from "./AddEvent";
import { authState } from "../redux/authSlice";

const AddEventContainer = (props) => {
  const [state, setState] = useState({
    userEvents: props.userEvents,
  });

  const eventsByVenueHostId = () => {
    const filter = {
      venue: state.venue,
    };
    const userEvents = props.userEvents.filter((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key] || !item[key]) return false;
      }
      return true;
    });
    setState({ ...state, userEvents });
  };

  useEffect(() => {
    eventsByVenueHostId();
  }, [eventsByVenueHostId]);

  return (
    <>
      <AddEvent />
    </>
  );
};

export default AddEventContainer;
