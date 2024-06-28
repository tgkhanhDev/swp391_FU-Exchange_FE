import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageProduct } from "../../services/manageProduct";
import { createProductType, filterGetProductById } from "../../types/product";

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

export const createProductThunk = createAsyncThunk(
  "/create-product",
  async (payload: createProductType, { rejectWithValue }) => {
    try {
      const data = await manageProduct.createProduct(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductByStudentIdThunk = createAsyncThunk(
  "/get-products-by-id",
  async (payload: filterGetProductById, { rejectWithValue }) => {
    try {
      const data = await manageProduct.getProductByStudentId(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProductWarehouseByIdThunk = createAsyncThunk(
  "/delete-products-by-id",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageProduct.deleteProductId(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);