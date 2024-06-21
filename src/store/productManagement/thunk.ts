import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageProduct } from "../../services/manageProduct";
import { ProductView } from "../../types/product";

export const getProductByVariationDetailThunk = createAsyncThunk(
  "/productByVariationDetail",
  async (payload: number[], { rejectWithValue }) => {
    try {
      const data = await manageProduct.getProductByVariationDetail(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductByIdThunk = createAsyncThunk(
  "/productById",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageProduct.getProductById(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductBySellerIdThunk = createAsyncThunk(
  "productBySellerId",
  async (payload: ProductView, { rejectWithValue }) => {
    try {
      const data = await manageProduct.getProductBySellerId(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);