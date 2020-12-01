import axios from "axios"
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {domain} from "../Utils"



export const createEvent = createAsyncThunk(
  "/createEvent",
  async (data) => {
    try {
      const res = await axios.post(
        domain + "/events", data
      )
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })


export const deleteEvent = createAsyncThunk(
  "/deleteEvent",
  async (eventId) => {
    try {
      const res = await axios.delete(
        domain + "/events/" + eventId, 
      )
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })


export const readEvents = createAsyncThunk(
  "/events",
  async () => {
    try {
      const res = await axios.get(
        domain + "/events"
      )
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })


export const updateEvent = createAsyncThunk(
  "/updateEvent",
  async (eventId, data) => {
    try {
      const res = await axios.patch(
        domain + "/updateEvent/" + eventId, data
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
   
    clearEvents: (state) => {
      state.events = []
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((item) => item._id !== action.payload._id);
    },
  },
  extraReducers: {

    [createEvent.fulfilled]: (state, action) => {
      state.events = [...action.payload]
    },
    [createEvent.rejected]: (state) => {
      state.error = true
    },

    
    [readEvents.fulfilled]: (state, action) => {
      state.events = [...action.payload]
    },
    [readEvents.rejected]: (state) => {
      state.error = true
    },


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
  clearEvents,
  removeEvent
} = EventsSlice.actions;

export const eventsState = (state) => state.events
export default EventsSlice.reducer;