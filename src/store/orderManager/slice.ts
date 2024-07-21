import { createSlice } from "@reduxjs/toolkit";
import { Post, PostLoadMore } from "../../types/post";
import { getOrderThunk, postPayCodThunk, postPayVnPayThunk, getOrderBySellerIdThunk, getOrderDetailBySellerIdThunk, updateStatusOrderThunk } from "./thunk";
import { Orders, PostProductInOrder, PostProductInOrders} from "../../types/order"
import { toast } from "react-toastify";

type stateType = {
  order: PostProductInOrders[];
  orderSeller: Orders[];
  orderDetailSeller: PostProductInOrder[];
};

const initialState: stateType = {
  order: [],
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
    // builder.addCase(postPayCodThunk.pending, (state, { payload }) => {
    //   toast.loading("Yêu cầu đang được thực hiện")
    // })
    builder.addCase(postPayVnPayThunk.fulfilled, (state, { payload }) => {
    });
    builder.addCase(getOrderThunk.fulfilled, (state, { payload }) => {
      state.order = payload;
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
