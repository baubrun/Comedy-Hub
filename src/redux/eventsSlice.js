import { createSlice } from "@reduxjs/toolkit";

export const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
},
  reducers: {
    getEvents: (state, action) => {
      state.events = action.payload
    },
    clearEvents: (state) => {
      state.events = []
    },
    
  },
});

export const { getEvents, clearEvents } = EventsSlice.actions;

export const eventsState = (state) => state.events
export default EventsSlice.reducer;

