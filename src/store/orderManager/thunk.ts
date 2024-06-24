import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostFilter_API } from "../../types/post";
import { manageOrder } from "../../services/manageOrder";
import { PaymentType, Orders } from "../../types/order";

export const postPayCodThunk = createAsyncThunk(
  "pay_cod",
  async (payload: PaymentType, { rejectWithValue }) => {
    try {
      const data = await manageOrder.pay_cod(payload);
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
  async (payload: Orders, { rejectWithValue }) => {
    try {
      const data = await manageOrder.orderBuy(payload);
      return data.data.data; // Truy cập vào mảng bên trong đối tượng data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderDetailThunk = createAsyncThunk(
  "orderBuyDetail",
  async (payload: Orders, { rejectWithValue }) => {
    try {
      const data = await manageOrder.orderBuyDetail(payload);
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderPostProductThunk = createAsyncThunk(
  "getOrderPostProduct",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageOrder.getOrderPostProduct(payload);
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

