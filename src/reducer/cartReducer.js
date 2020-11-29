import {
  CLEARED_CART,
  REMOVED_ITEM,
  GOT_TOTAL,
  TOGGLED_AMOUNT,
  ADDED_TO_CART,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  amount: 0,
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADDED_TO_CART:
        const index = 
        state.items.findIndex(i => i._id === action.payload._id)
        if (index === -1) 
        state.items = [...state.items, action.payload]
        return state

    case CLEARED_CART:
      return (state.items = []);

    case REMOVED_ITEM:
      return (state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      ));

    case GOT_TOTAL:
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
      break;

    case TOGGLED_AMOUNT:
      return (state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.toggle === "inc") {
            return {
              ...item,
              amount: item.amount + 1,
            };
          } else {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
        }
        return item;
      }));

    default:
      return state;
  }
};

export default cartReducer;
