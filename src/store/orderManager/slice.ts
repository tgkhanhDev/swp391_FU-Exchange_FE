import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { getPayVnPay, postPayCod, getOrderThunk } from "./thunk";
import { Orders } from "../../types/order"

type stateType = {
  order: Orders[];
};

const initialState: stateType = {
  order: [],
};

export const manageOrderSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postPayCod.fulfilled, (state, { payload }) => {
      console.log("payloadCOD:::",payload);
      
    }),
      builder.addCase(getPayVnPay.fulfilled, (state, { payload }) => {});
      builder.addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.order = payload.data;
      });
  },
});

export const { reducer: manageOrderReducer, actions: manageOrderActions } =
  manageOrderSlice;
