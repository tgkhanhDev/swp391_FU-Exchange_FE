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
