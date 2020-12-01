import axios from "axios"
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  domain
} from "../Utils"



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


export const logIn = createAsyncThunk(
  async (path, data) => {
    try {
      const res = await axios.post(domain + path, data)
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })


export const logOutUser = createAsyncThunk(
  async (path, data) => {
    try {
      const res = await axios.post(domain + path, data)
      return await res.data
    } catch (error) {
      return {
        error: error.message
      }
    }
  })


export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    hostId: "",
    error: false
  },
  reducers: {
    logOut: (state) => {
      state.loggedIn = false
      state.hostId = ""
    }
  },
  extraReducers: {

    [logIn.fulfilled]: (state, action) => {
      state.loggedIn = true
      state.hostId = action.payload
    },
    [logIn.rejected]: (state) => {
      state.error = true
    },

  }
});

export const {
  logOut
} = userSlice.actions;

export const userState = (state) => state.user
export default userSlice.reducer;