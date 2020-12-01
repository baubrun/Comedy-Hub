import axios from "axios"
import { createSlice,   createAsyncThunk,
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



export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    hostId: ""
},
  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true
      state.hostId = action.payload
    },
    logOut: (state) => {
        state.loggedIn = false
        state.hostId = ""
      },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const userState = (state) => state.user
export default userSlice.reducer;

