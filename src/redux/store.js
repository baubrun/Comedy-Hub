import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"
import loadingReducer from "./loadingSlice"
import eventsReducer from "./eventsSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    loading: loadingReducer,
    events: eventsReducer,

  },
});
