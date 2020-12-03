import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../Utils";


export const processPayment = createAsyncThunk(
  "/processPmt", 
  async (data) => {
  try {
    const res = await axios.post(domain + "/processPmt", data);
 
    return res.data;
  } catch (error) {
    return {
      error: error.message
    };
  }
});



export const savePayment = createAsyncThunk(
  "/savePurchase", 
  async (data) => {
  try {
    const res = await axios.post(domain + "/savePurchase", data);
 
    return res.data;
  } catch (error) {
    return {
      error: error.message
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
    payError: "",
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
        state.payError = error;
      } else {
        state.paySuccess = true
      }
    },
    [processPayment.rejected]: (state, action) => {
      state.loading = false;
      state.paySuccess = false
      state.payError = action.error;

    },
  }
});

export const {addToCart, clearCart, removeItem, getTotal, toggleAmount } = cartSlice.actions;

export const cartState = (state) => state.cart
export default cartSlice.reducer;
