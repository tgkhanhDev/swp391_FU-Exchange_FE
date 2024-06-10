import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostFilter_API } from "../../types/post";
import { manageOrder } from "../../services/manageOrder";
import { CodPayment } from "../../types/order";

export const postPayCod = createAsyncThunk(
  "pay_cod",
  async (payload: CodPayment, { rejectWithValue }) => {
    try {
      const data = await manageOrder.pay_cod(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const getPayVnPay = createAsyncThunk(
//   "pay_vnPay",
//   async (payload: string, { rejectWithValue }) => {
//     try {
//       const data = await manageOrder.pay_vnpay(payload);
//       return data.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
