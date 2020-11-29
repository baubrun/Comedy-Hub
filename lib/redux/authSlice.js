import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialAuthState: {
    loggedIn: true,
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

export const { logIn, logOut } = authSlice.actions;

export const authState = (state) => state.auth
export default authSlice.reducer;
