import { createSlice } from "@reduxjs/toolkit";

export const EventsSlice = createSlice({
  name: "events",
  initialAuthState: {
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

export const { getEvents } = EventsSlice.actions;

export const eventsState = (state) => state.events
export default EventsSlice.reducer;

