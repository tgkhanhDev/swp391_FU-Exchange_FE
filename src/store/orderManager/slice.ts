import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { postPayCodThunk, getOrderThunk, getOrderDetailThunk  } from "./thunk";
import { Orders, PostProductInOrder } from "../../types/order"

type stateType = {
  order: Orders[];
  orderDetail: PostProductInOrder[];
};

const initialState: stateType = {
  order: [],
  orderDetail: [],
};

export const manageOrderSlice = createSlice({
  name: "manageProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postPayCodThunk.fulfilled, (state, { payload }) => {
      console.log("payloadCOD:::",payload);
      
    })
      // builder.addCase(getPayVnPay.fulfilled, (state, { payload }) => {});
      builder.addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.order = payload;
      });
      builder.addCase(getOrderDetailThunk.fulfilled, (state, { payload }) => {
        state.orderDetail = payload;
      });
  },
});

export const { reducer: manageOrderReducer, actions: manageOrderActions } =
  manageOrderSlice;
