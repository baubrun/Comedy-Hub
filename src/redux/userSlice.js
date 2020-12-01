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
  async (_, data) => {
    try {
      const res = await axios.post(
        domain + "/events", data
      )
      return res.data
    } catch (error) {
      return {
        error: error.data.message
      }
    }
  })



export const logIn = createAsyncThunk(
  "/login",
  async (data) => {
    try {
      const res = await axios.post(domain + "/login", data)
      return res.data
    } catch (error) {
      return {
        error: error.data.message
      }
    }
  })




export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    hostId: "",
    error: ""
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
      state.hostId = action.payload.hostId
      state.error = ""
    },
    [logIn.rejected]: (state, action) => {
      state.error = action.error.message
      
    },
  }
});

export const {
  logOut
} = userSlice.actions;

export const userState = (state) => state.user
export default userSlice.reducer;