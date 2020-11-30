import axios from "axios"
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {domain} from "../api"


export const updateEvent = createAsyncThunk(
  "/updateEvent/:eventId",
  async (eventId, data) => {
    try {
      const res = await axios.patch(
        domain + /updateEvent/ + eventId, data
      )
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })





export const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    error: false
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
  extraReducers: {
    [updateEvent.fulfilled]: (state, action) => {
      const foundIdx = state.events.findIndex(i => i._id === action.payload._id)
      let newEvents = state.events.splice(foundIdx, 1, action.payload)
      state.events = newEvents 
    },
    [updateEvent.rejected]: (state) => {
      state.error = true
    },

  }
});

export const {
  getEvents,
  clearEvents,
  removeEvent
} = EventsSlice.actions;

export const eventsState = (state) => state.events
export default EventsSlice.reducer;