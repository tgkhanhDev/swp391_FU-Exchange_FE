import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { postPayCodThunk, getOrderThunk, getOrderDetailThunk, getOrderPostProductThunk  } from "./thunk";
import { Orders, PostProductInOrder, orderPostProduct } from "../../types/order"

type stateType = {
  order: Orders[];
  orderDetail: PostProductInOrder[];
  orderPostProduct: orderPostProduct[];
};

const initialState: stateType = {
  order: [],
  orderDetail: [],
  orderPostProduct: [],
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
      builder.addCase(getOrderPostProductThunk.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.orderPostProduct = payload;
      });
  },
});

export const { reducer: manageOrderReducer, actions: manageOrderActions } =
  manageOrderSlice;
