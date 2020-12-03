import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";

export const register = createAsyncThunk("/register", async (data) => {
  try {
    const res = await axios.post(domain + "/register", data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});

export const logIn = createAsyncThunk("/login", async (data) => {
  try {
    const res = await axios.post(domain + "/login", data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: true,
    hostId: "host a",
    error: "",
  },
  reducers: {
    logOut: (state) => {
      state.loggedIn = false;
      state.hostId = "";
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      const { error, hostId } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.hostId = hostId;
        state.error = "";
      }
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [logIn.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [logIn.fulfilled]: (state, action) => {
      const { error, hostId } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.hostId = hostId;
        state.error = "";
      }
    },
  },
});

export const { logOut } = userSlice.actions;

export const userState = (state) => state.user;
export default userSlice.reducer;
