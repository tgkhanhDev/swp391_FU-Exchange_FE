import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageView } from "../../services/manageView";

export const getCampusThunk = createAsyncThunk(
  "campus",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageView.getAllCampus();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPostTypeThunk = createAsyncThunk(
  "postType",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageView.getAllPostType();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategoryThunk = createAsyncThunk(
  "category",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageView.getAllCategory();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPostStatusThunk = createAsyncThunk(
  "post-status",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageView.getPostStatus();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
