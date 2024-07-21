import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostFilter_API } from "../../types/post";
import { manageOrder } from "../../services/manageOrder";
import { PaymentType, orderDetailSellerId, updateStatusOrder, PostProductInOrders} from "../../types/order";

export const postPayCodThunk = createAsyncThunk(
  "pay_cod",
  async (payload: PaymentType, { rejectWithValue }) => {
    try {
      console.log(payload)
      const data = await manageOrder.pay_cod(payload);
      // console.log("dataTest:::", data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postPayVnPayThunk = createAsyncThunk(
  "pay_vnPay",
  async (payload: PaymentType, { rejectWithValue }) => {
    try {
      const data = await manageOrder.pay_vnpay(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getOrderThunk = createAsyncThunk(
  "orderBuy",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageOrder.orderBuy(payload);
      return data.data.data; // Truy cập vào mảng bên trong đối tượng data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderBySellerIdThunk = createAsyncThunk(
  "orderBuySeller",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageOrder.orderBuySeller(payload);
      return data.data.data; // Truy cập vào mảng bên trong đối tượng data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderDetailBySellerIdThunk = createAsyncThunk(
  "orderBuyDetailSeller",
  async (payload: orderDetailSellerId, { rejectWithValue }) => {
    try {
      const data = await manageOrder.orderBuyDetailSeller(payload);
      return data.data.data; // Truy cập vào mảng bên trong đối tượng data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStatusOrderThunk = createAsyncThunk(
  "updateStatusOrder",
  async (payload: updateStatusOrder, { rejectWithValue }) => {
    try {
      const data = await manageOrder.updateStatusOrder(payload);
      return data.data; // Truy cập vào mảng bên trong đối tượng data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

