import { createSlice } from "@reduxjs/toolkit";
import { getItemCartThunk } from "./thunk";
import { viewItemCart } from "../../types/cart"

type stateType = {
  viewCart: viewItemCart[];
};

const initialState: stateType = {
  viewCart: [],
};

export const manageCartSlice = createSlice({
  name: "manageCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getPayVnPay.fulfilled, (state, { payload }) => {});
    builder.addCase(getItemCartThunk.fulfilled, (state, { payload }) => {
      state.viewCart = payload.data;
    });
  },
});

export const { reducer: manageCartReducer, actions: manageCartActions } =
  manageCartSlice;
