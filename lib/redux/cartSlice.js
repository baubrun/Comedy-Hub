import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    amount: 0,
    total: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
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
      total = parseFloat(total.toFixed(2));
      state.total = total;
      state.amount = amount;
    },
    toggleAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
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
});

export const { clearCart, removeItem, getTotal, toggleAmount } = cartSlice.actions;

export const cartState = (state) => state.cart
export default cartSlice.reducer;
