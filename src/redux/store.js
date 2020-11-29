import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"
import loadingReducer from "./loadingSlice"
import eventsReducer from "./eventsSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    loading: loadingReducer,
    events: eventsReducer,

  },
});
