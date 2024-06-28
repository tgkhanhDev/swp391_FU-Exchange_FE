import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { getOrderThunk, getOrderDetailThunk, getOrderPostProductThunk, postPayCodThunk, postPayVnPayThunk } from "./thunk";
import { Orders, PostProductInOrder, orderPostProduct } from "../../types/order"
import { toast } from "react-toastify";

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
    // builder.addCase(getPayVnPay.fulfilled, (state, { payload }) => {});
    builder.addCase(postPayCodThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
        window.location.href = "/authorize/order";
      } else {
        toast.error(`${payload.content}`);
      }
    });
    builder.addCase(postPayVnPayThunk.fulfilled, (state, { payload }) => {
    });
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
