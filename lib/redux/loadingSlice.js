import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialAuthState: {
    loading: false,
},
  reducers: {
    loading: (state) => {
      state.loading = true
    },
    loaded: (state) => {
        state.loading = false
      },
  },
});

export const { loading, loaded } = loadingSlice.actions;

export const loadingState = (state) => state.loading
export default loadingSlice.reducer;

