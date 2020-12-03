import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { domain } from "../Utils";


export const processPayment = createAsyncThunk(
  "/charge", 
  async (data) => {
  try {
    const res = await axios.post(domain + "/charge", data);
 
    return res.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
});



export const checkout = createAsyncThunk(
  "/charge", 
  async (data) => {
  try {
    const res = await axios.post(domain + "/checkout", data);
 
    return res.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
});




export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    amount: 0,
    total: 0,
    loading: false,
    error: "",
    paySuccess: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.findIndex(i => i._id === action.payload._id)
      if (found === -1){
        state.items = [...state.items, action.payload]
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
    getTotal: (state) => {
      let { total, amount } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemsTotal = price * amount;

          cartTotal.amount += amount;
          cartTotal.total += itemsTotal;
          console.log('cartTotal :>>', cartTotal)
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      state.total = total;
      state.amount = amount;
    },
    toggleAmount: (state, action) => {
        state.items = state.items.map((item) => {
        if (item._id === action.payload._id) {
          if (action.payload.toggle === "inc") {
            return {
              ...item,
              amount: item.amount + 1,
            }
          } else {
            return {
              ...item,
              amount: item.amount - 1,
            }
          }
        }
        return item;
      }); 
    },
  },
  extraReducers: {
    [processPayment.pending]: (state) => {
      state.loading = true;
    },
    [processPayment.fulfilled]: (state, action) => {
      state.loading = false;
      const { error } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.paySuccess = true
      }
    },
    [processPayment.rejected]: (state, action) => {
      state.loading = false;
      state.paySuccess = false
    },
  }
});

export const {addToCart, clearCart, removeItem, getTotal, toggleAmount } = cartSlice.actions;

export const cartState = (state) => state.cart
export default cartSlice.reducer;
