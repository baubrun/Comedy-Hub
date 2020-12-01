import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"
import eventsReducer from "./eventsSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    events: eventsReducer,

  },
});
