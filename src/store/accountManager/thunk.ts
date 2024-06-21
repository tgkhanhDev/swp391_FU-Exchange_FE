import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAccount } from "../../services/manageAccount";
import { filterGetStaffAccount, setStatus, UpdateProfile } from "../../types/account"

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

export const setStatusStaffThunk = createAsyncThunk(
  "setStatusStaff",
  async (payload: setStatus, { rejectWithValue }) => {
    try {
      const data = await manageAccount.setStatusStaff(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "updateProfile",
  async (payload: UpdateProfile, { rejectWithValue }) => {
    try {
      const data = await manageAccount.updateProfile(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);