import { createAsyncThunk } from "@reduxjs/toolkit";
import { managePost } from "../../services/managePost";

export const getPostThunk = createAsyncThunk(
  "post",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await managePost.getPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);