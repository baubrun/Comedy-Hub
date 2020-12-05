import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";

export const createEvent = createAsyncThunk(
  "/events/create", 
  async (data) => {
  try {
    const res = await axios.post(domain + "/events", data);
 
    return res.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
});


export const deleteEvent = createAsyncThunk(
  "/events/delete",
  async (eventId) => {
    try {
      const res = await axios.delete(`${domain}/events/${eventId}`);
      return res.data;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
);


export const readEvents = createAsyncThunk("/events", async () => {
  try {
    const res = await axios.get(`${domain}/events`);
    return res.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
});


export const updateEvent = createAsyncThunk(
  "/events/update",
  async (data) => {
    try {
      const res = await axios.patch(
        `${domain}/events/${data[0]}`, data[1]
        );
      return res.data;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
);


export const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    error: "",
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = ""
    },
    clearEvents: (state) => {
      state.events = [];
    },
  },
  extraReducers: {
    [createEvent.pending]: (state) => {
      state.loading = true;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.loading = false;
      const { error } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.events = action.payload.events
      }
    },
    [createEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    [deleteEvent.pending]: (state) => {
      state.loading = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, events } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.events = events;
      }
    },
    [deleteEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [readEvents.pending]: (state) => {
      state.loading = true;
    },
    [readEvents.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, events } = action.payload;
      if (error) {
        state.error = error;
      } 
      else {
        state.events = events;
      }
    },
    [readEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
    [updateEvent.pending]: (state) => {
      state.loading = true;
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, events } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.events = events;
      }
    },
    [updateEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { clearEvents, clearError } = EventsSlice.actions;

export const eventsState = (state) => state.events;
export default EventsSlice.reducer;
