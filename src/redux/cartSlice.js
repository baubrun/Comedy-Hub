import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    amount: 0,
    total: 0,
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
      // total = parseFloat(total.toFixed(2));
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
});

export const {addToCart, clearCart, removeItem, getTotal, toggleAmount } = cartSlice.actions;

export const cartState = (state) => state.cart
export default cartSlice.reducer;
