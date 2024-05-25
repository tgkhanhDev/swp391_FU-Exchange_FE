import { createAsyncThunk } from "@reduxjs/toolkit";
import { managePost } from "../../services/managePost";

export const getPostThunk = createAsyncThunk(
  "product",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await managePost.getPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);