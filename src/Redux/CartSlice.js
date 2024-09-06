import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addC(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameP === action.payload.nameP
      );

      if (index !== -1) {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount + 1,
        };
      } else {
        state.cart.push(action.payload);
      }
    },
    increase(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameP === action.payload.nameP
      );
      console.log(index);
      if (index !== -1) {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount + 1,
        };
      }
    },
    get(state, action) {
      state.cart = action.payload;
    },
    decrease(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameP === action.payload.nameP
      );
      let length = state.cart[index].amount;
      if (length > 1) {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount - 1,
        };
      } else {
        state.cart = state.cart.filter(
          (item) => item.nameP !== action.payload.nameP
        );
      }
    },
  },
});

export const cartAction = CartSlice.actions;
export default CartSlice.reducer;
