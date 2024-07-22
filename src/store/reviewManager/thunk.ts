import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageReview } from "../../services/manageReview";
import { Review } from "../../types/review"

export const createReviewThunk = createAsyncThunk(
  "createReview",
  async (payload: Review, { rejectWithValue }) => {
    try {
      const data = await manageReview.createReview(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewAllReviewThunk = createAsyncThunk(
  "viewAllReview",
  async (payload: number, { rejectWithValue }) => {
    try {
      const data = await manageReview.viewAllReview(payload);
      console.log(data.data.data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);