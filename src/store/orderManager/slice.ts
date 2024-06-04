import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { getPayVnPay, postPayCod } from "./thunk";

type stateType = {};

const initialState: stateType = {};

export const manageOrderSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postPayCod.fulfilled, (state, { payload }) => {
      console.log("payloadCOD:::",payload);
      
    }),
      builder.addCase(getPayVnPay.fulfilled, (state, { payload }) => {});
  },
});

export const { reducer: manageOrderReducer, actions: manageOrderActions } =
  manageOrderSlice;
