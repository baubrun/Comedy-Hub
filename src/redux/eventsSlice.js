import { createSlice } from "@reduxjs/toolkit";

export const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
},
  reducers: {
    getEvents: (state, action) => {
      state.events = [...action.payload]
    },
    clearEvents: (state) => {
      state.events = []
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((item) => item._id !== action.payload._id);
    },
    
  },
});

export const { getEvents, clearEvents, removeEvent } = EventsSlice.actions;

export const eventsState = (state) => state.events
export default EventsSlice.reducer;

