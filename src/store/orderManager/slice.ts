import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { getOrderThunk, getOrderDetailThunk, getOrderPostProductThunk, postPayCodThunk, postPayVnPayThunk, getOrderBySellerIdThunk, getOrderDetailBySellerIdThunk, updateStatusOrderThunk } from "./thunk";
import { Orders, PostProductInOrder, orderPostProduct } from "../../types/order"
import { toast } from "react-toastify";

type stateType = {
  order: Orders[];
  orderDetail: PostProductInOrder[];
  orderPostProduct: orderPostProduct[];
  orderSeller: Orders[];
  orderDetailSeller: PostProductInOrder[];
};

const initialState: stateType = {
  order: [],
  orderDetail: [],
  orderPostProduct: [],
  orderSeller: [],
  orderDetailSeller: [],
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
      state.orderPostProduct = payload;
    });
    builder.addCase(getOrderBySellerIdThunk.fulfilled, (state, { payload }) => {
      state.orderSeller = payload;
    });
    builder.addCase(getOrderDetailBySellerIdThunk.fulfilled, (state, { payload }) => {
      state.orderDetailSeller = payload;
    });
    builder.addCase(updateStatusOrderThunk.fulfilled, (state, { payload }) => {
      if (payload.status == 200) {
        toast.success(`${payload.content}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`${payload.content}`);
      }
    });
  },
});

export const { reducer: manageOrderReducer, actions: manageOrderActions } =
  manageOrderSlice;
