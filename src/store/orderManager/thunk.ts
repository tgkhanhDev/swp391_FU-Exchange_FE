import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostFilter_API } from "../../types/post";
import { manageOrder } from "../../services/manageOrder";
import { PaymentType } from "../../types/order";

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
