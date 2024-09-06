import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "./ListSlice";
import CartSlice from "./CartSlice";

const Store = configureStore({
  reducer: { list: ListSlice, cart: CartSlice },
});

export default Store;
