import { createAsyncThunk } from "@reduxjs/toolkit";
import { managePost } from "../../services/managePost";
import { PostFilter_API } from "../../types/post";

export const getPostThunk = createAsyncThunk(
  "post",
  async (payload: PostFilter_API, { rejectWithValue }) => {
    try {
      const data = await managePost.getPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPostByIdThunk = createAsyncThunk(
  "postById",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await managePost.getPostById(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);