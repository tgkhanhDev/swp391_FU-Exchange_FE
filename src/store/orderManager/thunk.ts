import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostFilter_API } from "../../types/post";
import { manageOrder } from "../../services/manageOrder";
import { PaymentType, Orders, orderDetailSellerId, updateStatusOrder} from "../../types/order";

export const postPayCodThunk = createAsyncThunk(
  "pay_cod",
  async (payload: PaymentType, { rejectWithValue }) => {
    try {
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

export const getTotalOrderPostThunk = createAsyncThunk(
  "getTotalOrderPost",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageOrder.getPriceOrderPost(payload);
      return data.data; // Truy cập vào mảng bên trong đối tượng data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

