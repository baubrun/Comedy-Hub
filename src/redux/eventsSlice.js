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
        `${domain}/events/${eventId}` 
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
        `${domain}/events`
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
        `${domain}/updateEvent/${eventId}`, data
      )
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })


export const removeEvent = createAsyncThunk(
  "/delete",
  async (eventId) => {
    try {
      const res = await axios.delete(
        `${domain}/events/${eventId}`
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
    error: false,
    loading: false
  },
  reducers: {
   
    clearEvents: (state) => {
      state.events = []
    },
  },
  extraReducers: {

    [createEvent.pending]: (state) => {
      state.loading = true
    },
    [createEvent.fulfilled]: (state, action) => {
      const { error } = action.payload;
      if (error) {
        state.error = error
      } else {
        state.loading = false
        state.events = [...action.payload]
      }
    },
    [createEvent.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },


    [readEvents.pending]: (state) => {
      state.loading = true
    },
    [readEvents.fulfilled]: (state, action) => {
      state.loading = false
      state.events = [...action.payload]
    },
    [readEvents.rejected]: (state, action) => {
      state.error = action.error
    },


    [removeEvent.pending]: (state, action) => {
      state.loading = true
    },
    [removeEvent.fulfilled]: (state, action) => {
      state.loading = false
      if (!action.payload.error){
        state.events = action.payload.events
      }

    },

    [removeEvent.rejected]: (state, action) => {
      state.error = action.error
      state.loading = false

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
} = EventsSlice.actions;

export const eventsState = (state) => state.events
export default EventsSlice.reducer;