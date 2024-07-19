import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageCart } from "../../services/manageCart";
import { addCartItem } from "../../types/cart";

export const addToCartThunk = createAsyncThunk(
  "addToCart",
  async (payload: addCartItem, { rejectWithValue }) => {
    try {
      const data = await manageCart.addToCart(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewCartThunk = createAsyncThunk(
  "view-cart",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await manageCart.viewCart(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItemCartThunk = createAsyncThunk(
  "deleteToCart",
  async (payload: addCartItem, { rejectWithValue }) => {
    try {
      const data = await manageCart.deleteItemCart(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);