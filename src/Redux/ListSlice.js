import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "list",
  initialState: { list: [] },
  reducers: {
    add(state, action) {
      state.list.push(action.payload);
    },
    delete(state, action) {
      state.list = state.list.filter(
        (item) => item.nameP !== action.payload.nameP
      );
    },
    get(state, action) {
      state.list = action.payload;
    },
    update(state, action) {
      let index = state.list.findIndex(
        (items) => items.nameP === action.payload.item.nameP
      );
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.obj };
      }
    },
  },
});

export const listAction = ListSlice.actions;
export default ListSlice.reducer;
