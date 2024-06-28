import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageWishlist } from "../../services/manageWishlist";
import { createWishlist, updateStatusWishlist, updateQuantityWishlist } from "../../types/wishlist"

export const viewWishlistThunk = createAsyncThunk(
  "viewWishlist",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageWishlist.viewWishlist(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createWishlistThunk = createAsyncThunk(
  "createWishlist",
  async (payload: createWishlist, { rejectWithValue }) => {
    try {
      const data = await manageWishlist.createWishlist(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStatusWishlistThunk = createAsyncThunk(
  "updateStatusWishlist",
  async (payload: updateQuantityWishlist, { rejectWithValue }) => {
    try {
      const data = await manageWishlist.updateQuantityWishlist(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateQuantityWishlistThunk = createAsyncThunk(
  "updateQuantityWishlist",
  async (payload: updateQuantityWishlist, { rejectWithValue }) => {
    try {
      const data = await manageWishlist.updateQuantityWishlist(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteWishlistThunk = createAsyncThunk(
  "deleteWishlist",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageWishlist.deleteWishlist(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);