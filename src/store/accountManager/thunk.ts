import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAccount } from "../../services/manageAccount";
import { filterGetStaffAccount, setStatus, UpdateProfile, UpdatePassword, setStatusAcc } from "../../types/account"

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

export const updateAProfileThunk = createAsyncThunk(
  "updateAProfile",
  async (payload: UpdateProfile, { rejectWithValue }) => {
    try {
      const data = await manageAccount.updateProfile(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMProfileThunk = createAsyncThunk(
  "updateMProfile",
  async (payload: UpdateProfile, { rejectWithValue }) => {
    try {
      const data = await manageAccount.updateProfile(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePasswordStaffThunk = createAsyncThunk(
  "updateStaffPassword",
  async (payload: UpdatePassword, { rejectWithValue }) => {
    try {
      const data = await manageAccount.updateStaffPassword(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setStatusAccountThunk = createAsyncThunk(
  "setStatusAcc",
  async (payload: setStatusAcc, { rejectWithValue }) => {
    try {
      const data = await manageAccount.setStatusAcc(payload);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);