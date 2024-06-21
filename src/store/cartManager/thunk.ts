import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageCart } from "../../services/manageCart";
import { viewItemCart } from "../../types/cart";

export const getItemCartThunk = createAsyncThunk(
  "viewCart",
  async (payload: viewItemCart, { rejectWithValue }) => {
      try {
          const data = await manageCart.viewCart(payload);
          console.log(data)
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
