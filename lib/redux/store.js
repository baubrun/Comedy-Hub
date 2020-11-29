import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";
import authReducer from "./authReducer"

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
