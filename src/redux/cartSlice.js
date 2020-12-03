import axios from "axios";
import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import {
  domain
} from "../Utils";
import orderId from "order-id";


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



export const createPurchase = createAsyncThunk(
  "/purchase",
  async (data) => {
    try {
      const res = await axios.post(domain + "/purchase", data);
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
    items: [
      {
        allDay: "false",
        facebook: "Blue",
        instagram: "",
        twitter: "",
        _id: "5e9500f414179e43481c6d86",
        title: "Blue Balls",
        startDate: "2020-11-11",
        startTime: "14:00",
        endDate: "2020-11-11",
        endTime: "15:15",
        venue: "RIRE NOW",
        performer: "Blue Ivy",
        image: "BlueIvy.jpg",
        price: 21,
        amount: 1,
        hostId: "host b",
        dateAdded: "2020-04-14T00:16:52.580Z",
    }
    ],
    amount: 1,
    total: 21,
    loading: false,
    payErrorMsg: "",
    paySuccess: false,
    purchaseCreated: false,
    orderNumber: "",
  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.findIndex(i => i._id === action.payload._id)
      if (found === -1) {
        state.items = [...state.items, action.payload]
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.amount = 0;
      state.total = 0;
      state.loading = false;
      state.payErrorMsg = "";
      state.paySuccess = false;
      state.purchaseCreated = false;
      state.orderNumber = ""
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
    getTotal: (state) => {
      let {
        total,
        amount
      } = state.items.reduce(
        (cartTotal, cartItem) => {
          const {
            price,
            amount
          } = cartItem;
          const itemsTotal = price * amount;

          cartTotal.amount += amount;
          cartTotal.total += itemsTotal;
          return cartTotal;
        }, {
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
    setOrderNumber: (state) => {
      state.orderNumber = orderId("MY-SECRET").generate();
    },
  },
  extraReducers: {

    [createPurchase.pending]: (state) => {
      state.loading = true;
    },
    [createPurchase.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        error
      } = action.payload;
      if (error) {
        state.payErrorMsg = error;
      } else {
        state.purchaseCreated = true
      }
    },
    [createPurchase.rejected]: (state, action) => {
      state.loading = false;
      state.payErrorMsg = action.error;
    },


    [processPayment.pending]: (state) => {
      state.loading = true;
    },
    [processPayment.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        error
      } = action.payload;
      if (error) {
        state.payErrorMsg = error;
      } else {
        state.paySuccess = true
      }
    },
    [processPayment.rejected]: (state, action) => {
      state.loading = false;
      state.payErrorMsg = action.error;
    },
  }
});

export const {
  addToCart,
  clearCart,
  removeItem,
  getTotal,
  toggleAmount,
  setOrderNumber,
} = cartSlice.actions;

export const cartState = (state) => state.cart
export default cartSlice.reducer;