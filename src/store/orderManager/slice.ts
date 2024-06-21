import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { postPayCodThunk, postPayVnPayThunk } from "./thunk";
import { toast } from "react-toastify";
import { getOrderThunk, getOrderDetailThunk  } from "./thunk";
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
      toast.success(payload.content);
    });
    builder.addCase(postPayVnPayThunk.fulfilled, (state, { payload }) => {
      // toast.success(payload.content);
      console.log("payload: ", payload.paymentUrl)
      // window.location.href(payload.paymentUrl)
    });
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
