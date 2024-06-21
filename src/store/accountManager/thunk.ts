import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAccount } from "../../services/manageAccount";
import { filterGetStaffAccount } from "../../types/account"

export const getAllStaffAccountThunk = createAsyncThunk(
  "getAllStaff",
  async (payload: filterGetStaffAccount, { rejectWithValue }) => {
    try {
      const data = await manageAccount.getAllStaff(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);