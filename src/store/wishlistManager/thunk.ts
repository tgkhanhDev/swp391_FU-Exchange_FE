import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageWishlist } from "../../services/manageWishlist";
import { createWishlist, updateStatusWishlist } from "../../types/wishlist"

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
  async (payload: updateStatusWishlist, { rejectWithValue }) => {
    try {
      const data = await manageWishlist.updateStatusWishlist(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);