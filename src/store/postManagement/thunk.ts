import { createAsyncThunk } from "@reduxjs/toolkit";
import { managePost } from "../../services/managePost";
import { CreatePostType, PostFilter_API } from "../../types/post";

export const getPostThunk = createAsyncThunk(
  "post",
  async (payload: PostFilter_API, { rejectWithValue }) => {
    try {
      const data = await managePost.getPost(payload);
      console.log("API response data:", data); // Log dữ liệu trả về từ API
      return data.data;
    } catch (error) {
      console.log("API error:", error); // Log lỗi nếu có
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

export const createPostThunk = createAsyncThunk(
  "create-post",
  async (payload: CreatePostType, { rejectWithValue }) => {
    try {
      const data = await managePost.createPost(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);